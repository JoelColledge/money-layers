function get_results (result) {
    print(tojson(result));
}

db.accounts.find().forEach(get_results);
db.rules.find().forEach(get_results);
