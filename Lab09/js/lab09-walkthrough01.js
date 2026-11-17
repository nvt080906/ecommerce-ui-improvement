
/* Exercise 9.1 – Basic DOM Selection */

// Chọn phần tử theo ID và thay đổi nội dung
var msg = document.getElementById("msgArea");
msg.value = "here is some text";

var title = document.getElementById("pageTitle");
title.innerHTML = "New Title";
document.getElementById("pageTitle").innerHTML = "Even newer title";

// Đọc nội dung HTML và văn bản
msg.value = document.getElementById("first").innerHTML;
msg.value = document.getElementById("first").innerText;

// Đọc thuộc tính class
msg.value = "My class is " + msg.getAttribute("class");

// Chọn phần tử theo tên thẻ
var elem = document.getElementsByTagName("textarea");
elem[0].value = "selected by tag name";

// Chọn tất cả thẻ span
elem = document.getElementsByTagName("span");
for (var i = 0; i < elem.length; i++) {
    msg.value += "\n" + elem[i].innerText;
}

// Chọn phần tử theo class
msg.value = "";
var counts = document.getElementsByClassName("count-number");

for (var i = 0; i < counts.length; i++) {
    msg.value += "\n" + counts[i].innerText;
}

// Sử dụng querySelector
var ps = document.querySelector("#first p");
msg.value = ps.innerHTML;

// Sử dụng querySelectorAll
ps = document.querySelectorAll("#first p");

for (var i = 0; i < ps.length; i++) {
    msg.value += ps[i].innerHTML + "\n";
}

// Thay đổi màu nền
document.getElementById("features").style.backgroundColor = "green";

// Bước 13: tạm thời chưa ẩn textarea
document.getElementById("msgArea").setAttribute("class", "hidden");
