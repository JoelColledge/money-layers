function get_results (result) {
    print(tojson(result));
}

db.transactions.aggregate([
    {
        $project: {
            "month": true,
            "transactionChange": {
                $sum: {
                    $map: {
                        input: {
                            $filter: {
                                input: "$entries",
                                as: "entry",
                                cond: {
                                    $in: [
                                        "$$entry.account",
                                        [ObjectId("58398148a3255d1e75d6e732"), ObjectId("58398150a3255d1e75d6e734")]
                                    ]
                                }
                            }
                        },
                        as: "entry",
                        in: "$$entry.change"
                    }
                }
            },
            "entries": "$entries"
        }
    },
    {
        $group: {
            _id: {
                month: "$month",
                positive: { $gt: ["$transactionChange", 0] }
            },
            totalChange: { $sum: "$transactionChange" }
        }
    },
    {
        $group: {
            _id: "$_id.month",
            changes: {
                $push: {positive: "$_id.positive", totalChange: "$totalChange"}
            }
        }
    },
    {
        $sort: { "_id": 1 }
    }
]).forEach(get_results);
