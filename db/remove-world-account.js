function show_result (result) {
    print(tojson(result));
}

var accounts = db.accounts.find({ name: { $in: ["a-World", "a-GBP-World", "a-Trading", "a-GBP-Trading"] }});

var accountIds = accounts.map(account => account._id);

show_result(accountIds);

show_result(db.transactions.updateMany(
    { },
    { $pull: { entries: { account: { $in: accountIds } } } }
));

show_result(db.accounts.remove(
    { _id: { $in: accountIds } }
));

show_result(db.accounts.updateMany(
    { },
    { $pull: { groups: { $in: ["a", "a-GBP"]  } } }
));

show_result(db.rules.remove(
    { groupLeft: { $in: ["a", "a-GBP"] } }
));
