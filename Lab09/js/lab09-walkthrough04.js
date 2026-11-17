
/* Exercise 9.4 – Simple Event Handling */

// Lấy nút điều khiển
var btn = document.getElementById("testButton");

// Xử lý sự kiện click
function simpleHandler(event) {
    var content = document.getElementById("content");

    if (btn.innerHTML == "Hide") {
        btn.innerHTML = "Show";
        content.className = "makeItDisappear";

        setTimeout(function() {
            content.style.display = "none";
        }, 1000);
    }
    else {
        btn.innerHTML = "Hide";
        content.style.display = "block";

        setTimeout(function() {
            content.className = "makeItNormal";
        }, 500);
    }
}

btn.addEventListener("click", simpleHandler);

// Lấy hình ảnh
var img = document.getElementById("mainImage");

// Khi di chuột vào ảnh
img.addEventListener("mouseover", function(event) {
    img.className = "makeItGray";
});

// Khi di chuột ra khỏi ảnh
img.addEventListener("mouseout", function(event) {
    img.className = "makeItNormal";
});
