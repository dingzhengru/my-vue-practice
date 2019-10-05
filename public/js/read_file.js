function readFile(path){
    // $.get(path, function(data) {
    //     content = data;
    //     return data;
    // }, "text");
    var content = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': path,
        'dataType': "text",
        'success': function (data) {
            content = data;
        }
    })
    return content;
}