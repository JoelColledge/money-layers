function show_result (result) {
    print(tojson(result));
}

show_result(db.transactions.remove({ }));
show_result(db.structure.remove({ }));
