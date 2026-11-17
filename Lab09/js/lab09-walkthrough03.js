
/* Exercise 9.3 – Modifying the DOM */

// Tạo và thêm phần tử mới
var first = document.getElementById("first");

var text = document.createTextNode("this is programmatically created");
var p = document.createElement("p");

p.appendChild(text);
first.appendChild(p);

// Xóa một phần tử HTML
var icons = document.getElementById("iconList");
icons.removeChild(document.getElementById("deleteThisOne"));
