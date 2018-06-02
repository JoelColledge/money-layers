function get_results (result) {
    print(tojson(result));
}

db.transactions.aggregate([
    {
        $unwind: "$entries"
    },
    {
        $match: { "entries.account": { $in: [ObjectId("58398150a3255d1e75d6e734"), ObjectId("58398148a3255d1e75d6e732")] } }
    },
    {
        $group: {_id: "$month", total: {$sum: "$entries.change"}}
    },
    {
        $sort: {_id: 1}
    }
]).forEach(get_results);
