function get_results (result) {
    print(tojson(result));
}

db.structure.find().forEach(get_results);
