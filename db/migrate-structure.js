function show_result (result) {
    print(tojson(result));
}

var accounts = db.accounts.find().toArray();
var rules = db.rules.find().toArray();

show_result(accounts);
show_result(rules);

accounts.forEach(a => {delete a.__v; delete a.createdAt; delete a.layer;});
rules.forEach(a => delete a.__v);

show_result(db.structure.remove({}));
show_result(db.structure.insert({
    accounts: accounts,
    rules: rules
}));

show_result(db.accounts.remove({}));
show_result(db.rules.remove({}));
