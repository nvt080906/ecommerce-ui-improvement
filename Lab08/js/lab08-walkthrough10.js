
/* Exercise 8.10 – Creating JavaScript Objects */

// Tạo constructor để khởi tạo đối tượng đơn hàng
function order(product, price, quantity) {
    this.product = product;
    this.price = price;
    this.quantity = quantity;

    // Phương thức tính tổng tiền
    this.total = function() {
        return this.price * this.quantity;
    };

    // Phương thức hiển thị thông tin
    this.output = function() {
        document.write("<p>Product=" + this.product);
        document.write("<br>Price=" + this.price);
        document.write("<br>Quantity=" + this.quantity);
        document.write("<br>Total=" + this.total());
    };
}

// Tạo hai đối tượng từ constructor
var example1 = new order("Self Portrait in a Straw Hat", 15, 2);
var example2 = new order("Untitled #23", 10, 4);

// Hiển thị kết quả
example1.output();
example2.output();
