
/* Exercise 9.2 – DOM Family Relations */

var stories = document.getElementById("stories");

// Duyệt qua các nút con
for (var i = 0; i < stories.childNodes.length; i++) {
    var node = stories.childNodes[i];

    console.log(
        "child " + i + " = " + node +
        " nodeType=" + node.nodeType
    );

    // Chỉ thay đổi màu nền của nút phần tử HTML
    if (node.nodeType === 1) {
        node.style.backgroundColor = "green";
    }
}
