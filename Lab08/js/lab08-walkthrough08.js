
/* Exercise 8.8 – JavaScript Functions */

// Global variable
var boxClass = "movingDiv";

function outputBox(num) {
    box = "<div class='" + boxClass + "' id='div" + num + "'>";
    box += "This is div " + num;
    box += "</div>";
    return box;
}
