

/* Exercise 8.7 – Arrays */

// Tạo mảng các ngày trong tuần
var daysOfWeek = new Array("Mon", "Tues", "Wed", "Thur", "Fri");

// Thêm thứ Bảy vào cuối mảng
daysOfWeek.push("Sat");

// Thêm Chủ nhật vào đầu mảng
daysOfWeek.unshift("Sun");

// Tạo bảng lịch
document.write("<table border='1'>");
document.write("<tr>");

// Hiển thị tiêu đề các ngày trong tuần
for (var i = 0; i < daysOfWeek.length; i++) {
    var day;

    if (daysOfWeek[i].length < 4) {
        day = daysOfWeek[i];
    } else {
        day = "<em>" + daysOfWeek[i] + "</em>";
    }

    document.write("<th>" + day + "</th>");
}

document.write("</tr>");

// Hiển thị các ngày từ 1 đến 30
for (var date = 1; date <= 30; date++) {

    if ((date - 1) % 7 === 0) {
        document.write("<tr>");
    }

    document.write("<td>" + date + "</td>");

    if (date % 7 === 0) {
        document.write("</tr>");
    }
}

// Bổ sung ô trống cho tuần cuối
if (30 % 7 !== 0) {
    for (var j = 0; j < 7 - (30 % 7); j++) {
        document.write("<td></td>");
    }
    document.write("</tr>");
}

document.write("</table>");
