
/* Exercise 9.8 – Form Validation */

// Thiết lập sự kiện khi trang tải xong
function init() {
    document.getElementById("sampleForm")
        .addEventListener("submit", checkForEmptyFields);
}

window.addEventListener("load", init);

// Kiểm tra các trường nhập liệu
function checkForEmptyFields(e) {

    // Ẩn thông báo lỗi cũ
    var errorArea = document.getElementById("errors");
    errorArea.className = "hidden";

    // Lấy các ô nhập liệu
    var cssSelector = "input[type=text],input[type=password]";
    var fields = document.querySelectorAll(cssSelector);

    var fieldList = [];

    // Kiểm tra các trường bị bỏ trống
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].value == null || fields[i].value == "") {
            e.preventDefault();
            fieldList.push(fields[i]);
        }
    }

    // Hiển thị thông báo lỗi
    var msg = "The following fields can't be empty: ";

    if (fieldList.length > 0) {
        for (var i = 0; i < fieldList.length; i++) {
            msg += fieldList[i].id + ",";
        }

        errorArea.innerHTML = "<p>" + msg + "</p>";
        errorArea.className = "visible";
    }
}
