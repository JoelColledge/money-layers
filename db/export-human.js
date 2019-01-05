// Want flat [{}] with following fields:
// (from transaction) description, notes, date
// (from entries) account (name), change

print(tojson(db.transactions.aggregate([
    {
        $unwind: "$entries"
    },
    {
        $lookup: {
            from: "structure",
            let: { accountId: "$entries.account" },
            pipeline: [
                {
                    $unwind: "$accounts"
                },
                {
                    $replaceRoot: { newRoot: "$accounts" }
                },
                {
                    $match: { $expr: { $eq: ["$_id", "$$accountId"] } }
                }
            ],
            as: "accountDetail"
        }
    },
    {
        $project: {
            _id: false,
            description: true,
            notes: true,
            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            change: { $divide: [ "$entries.change", 100 ] },
            accountName: "$accountDetail.name"
        }
    },
    {
        $unwind: "$accountName"
    }
]).toArray()));
