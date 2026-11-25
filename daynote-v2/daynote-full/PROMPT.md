
# PROMPT VIBE CODING – DAYNOTE

## 1. Thông tin chung

- Tên ứng dụng: Daynote – Personal Task Manager.
- Công cụ AI sử dụng: ChatGPT.
- Phương pháp phát triển: Vibe Coding.
- Mục tiêu: Xây dựng ứng dụng quản lý công việc cá nhân có giao diện trực quan, đầy đủ chức năng và kết nối cơ sở dữ liệu.

## 2. Prompt 01 – Thiết kế giao diện GUI

Thiết kế ứng dụng TODO App quản lý công việc cá nhân, tham khảo giao diện của Todoist tại https://www.todoist.com/fr.

Yêu cầu thiết kế:

- Sử dụng HTML, CSS và JavaScript.
- Phong cách tối giản, hiện đại, dễ sử dụng.
- Sử dụng màu đỏ đô (#782C3D) và kem be (#F4EDE3) làm màu chủ đạo.
- Thiết kế sidebar bên trái để điều hướng giữa các trang.
- Hiển thị danh sách công việc và tiến độ hoàn thành.
- Phân biệt công việc đã hoàn thành và chưa hoàn thành.
- Có ô tìm kiếm và bộ lọc công việc.
- Thiết kế popup thêm và chỉnh sửa công việc.
- Có trang thống kê với các chỉ số và biểu đồ.
- Giao diện hỗ trợ tiếng Việt và thích ứng với nhiều kích thước màn hình.

## 3. Prompt 02 – Xây dựng chức năng chưa có cơ sở dữ liệu

Phát triển các chức năng của ứng dụng Daynote trên giao diện đã thiết kế bằng JavaScript.

Yêu cầu:

- Hiển thị các công việc trong ngày hôm nay.
- Hiển thị tất cả công việc.
- Thêm, chỉnh sửa và xóa công việc.
- Tìm kiếm theo tên và mô tả.
- Lọc theo trạng thái và mức độ ưu tiên.
- Phân loại theo danh mục Học tập, Cá nhân và Công việc.
- Đánh dấu trạng thái hoàn thành.
- Tự động cập nhật tiến độ và các chỉ số thống kê.
- Sử dụng mảng JavaScript để lưu trữ dữ liệu tạm thời.
- Chưa kết nối Back-end và cơ sở dữ liệu.

## 4. Prompt 03 – Chỉnh sửa giao diện

Kiểm tra và cải thiện giao diện Daynote hiện tại.

Yêu cầu:

- Khắc phục lỗi hiển thị dấu tiếng Việt.
- Sử dụng font chữ dễ đọc và hỗ trợ tiếng Việt.
- Thay các dấu chấm màu tại danh mục bằng icon phù hợp.
- Loại bỏ dấu chấm ở cuối tiêu đề các trang.
- Giữ nguyên dấu chấm trong logo daynote.
- Giữ nguyên bảng màu đỏ đô và kem be.
- Không làm ảnh hưởng đến các chức năng đã xây dựng.

## 5. Prompt 04 – Xây dựng Back-end

Xây dựng Back-end cho ứng dụng Daynote bằng Node.js và Express.js, tiếp tục sử dụng source code Front-end hiện tại.

Yêu cầu:

- Khởi tạo dự án Node.js bằng npm.
- Sử dụng Express.js để xây dựng HTTP Server.
- Tạo file server.js.
- Cung cấp các file HTML, CSS và JavaScript thông qua server.
- Chạy ứng dụng trên cổng 3000.
- Xây dựng API kiểm tra trạng thái hoạt động của server.
- Giữ nguyên thiết kế giao diện hiện tại.

## 6. Prompt 05 – Xây dựng cơ sở dữ liệu

Thiết kế cơ sở dữ liệu SQLite cho ứng dụng Daynote.

Yêu cầu:

- Sử dụng module node:sqlite tích hợp trong Node.js.
- Tạo file database.js để khởi tạo và kết nối cơ sở dữ liệu.
- Tự động tạo file daynote.db.
- Tạo bảng tasks với các trường id, title, description, date, time, category, priority và done.
- Sử dụng id làm khóa chính và tự động tăng.
- Lưu trạng thái hoàn thành dưới dạng 0 hoặc 1.
- Tạo file seed.js để khởi tạo 7 công việc mẫu.
- Tránh tạo dữ liệu mẫu trùng lặp khi bảng đã có dữ liệu.

## 7. Prompt 06 – Xây dựng REST API

Xây dựng REST API để thực hiện các thao tác CRUD với cơ sở dữ liệu SQLite.

Yêu cầu:

- GET /api/tasks: Lấy danh sách công việc.
- POST /api/tasks: Thêm công việc mới.
- PUT /api/tasks/:id: Chỉnh sửa thông tin và trạng thái công việc.
- DELETE /api/tasks/:id: Xóa công việc.
- Kiểm tra tính hợp lệ của dữ liệu trước khi lưu.
- Sử dụng prepared statements để hạn chế SQL Injection.
- Trả về kết quả dưới định dạng JSON.
- Xử lý trường hợp dữ liệu không hợp lệ hoặc không tìm thấy công việc.

## 8. Prompt 07 – Kết nối chương trình hoàn chỉnh

Cập nhật file app.js để kết nối giao diện Daynote với Back-end thông qua REST API.

Yêu cầu:

- Thay thế dữ liệu tạm thời trong JavaScript bằng dữ liệu lấy từ SQLite.
- Sử dụng Fetch API để gửi và nhận dữ liệu.
- Thực hiện thêm, sửa, xóa và cập nhật trạng thái thông qua API.
- Đảm bảo dữ liệu không bị mất khi tải lại trang hoặc khởi động lại server.
- Tự động cập nhật danh sách công việc sau mỗi thao tác.
- Giữ nguyên chức năng tìm kiếm, bộ lọc và điều hướng.
- Sử dụng dữ liệu thực tế cho các chỉ số thống kê và biểu đồ tiến độ tổng thể.
- Giữ dữ liệu mẫu cho biểu đồ hoạt động trong tuần.
- Không thay đổi giao diện đã thống nhất.

## 9. Prompt 08 – Khắc phục lỗi điều hướng

Ứng dụng hiện tại tự động quay về trang Hôm nay mỗi khi người dùng tải lại trình duyệt, kể cả khi đang ở trang Thống kê hoặc các trang danh mục.

Yêu cầu:

- Giữ nguyên trang đang xem khi tải lại trình duyệt.
- Áp dụng cho tất cả các trang và danh mục.
- Sử dụng URL Hash để quản lý trạng thái điều hướng.
- Hỗ trợ nút Back và Forward của trình duyệt.
- Không ảnh hưởng đến chức năng CRUD và kết nối cơ sở dữ liệu.
- Cung cấp toàn bộ code app.js sau khi chỉnh sửa để thay thế file hiện tại.

## 10. Prompt 09 – Cải thiện chức năng nhập thời gian

Chỉnh sửa ô nhập thời gian trong form thêm và chỉnh sửa công việc.

Yêu cầu:

- Sử dụng định dạng 24 giờ thay cho định dạng 12 giờ.
- Giờ có giá trị từ 00 đến 23.
- Phút có giá trị từ 00 đến 59.
- Tự động thêm dấu hai chấm khi nhập đủ chữ số.
- Không bắt buộc nhập số 0 trước giờ có một chữ số.
- Cho phép nhập linh hoạt, ví dụ 6 thành 06:00, 630 thành 06:30 và 1730 thành 17:30.
- Tự động chuẩn hóa về định dạng HH:mm trước khi lưu vào cơ sở dữ liệu.
- Không cho phép lưu thời gian không hợp lệ.
- Cho phép để trống thời gian.
- Cung cấp toàn bộ code index.html sau khi chỉnh sửa.
- Giữ nguyên các thành phần giao diện và chức năng khác.

## 11. Prompt 10 – Hoàn thiện dự án

Hướng dẫn hoàn thiện ứng dụng Daynote để đưa mã nguồn lên GitHub.

Yêu cầu:

- Kiểm tra các chức năng chính của hệ thống.
- Kiểm tra khả năng lưu trữ dữ liệu sau khi tải lại trang và khởi động lại server.
- Cấu hình package.json với các lệnh khởi động và tạo dữ liệu mẫu.
- Tạo file .gitignore để loại trừ node_modules và cơ sở dữ liệu cục bộ.
- Viết README.md mô tả chức năng, công nghệ, cơ sở dữ liệu, REST API và hướng dẫn chạy chương trình.
- Tổng hợp các prompt đã sử dụng trong quá trình Vibe Coding.
- Chỉ đưa phiên bản hoàn chỉnh của ứng dụng lên GitHub.

## 12. Vai trò của AI và người thực hiện

AI hỗ trợ:

- Đề xuất ý tưởng và thiết kế giao diện.
- Tạo mã nguồn HTML, CSS và JavaScript.
- Hỗ trợ xây dựng Back-end, REST API và cơ sở dữ liệu.
- Phân tích lỗi và đề xuất phương án chỉnh sửa.
- Hỗ trợ viết tài liệu hướng dẫn sử dụng.

Người thực hiện:

- Xác định yêu cầu và lựa chọn phong cách thiết kế.
- Đưa ra các prompt và phản hồi về sản phẩm.
- Tạo, chỉnh sửa và quản lý các file mã nguồn trên Visual Studio Code.
- Cài đặt Node.js, Express.js và thực hiện các lệnh trên Terminal.
- Chạy chương trình, kiểm tra kết quả và phát hiện lỗi.
- Yêu cầu AI điều chỉnh dựa trên kết quả thực tế.
- Kiểm tra các chức năng và hoàn thiện sản phẩm.
- Chuẩn bị tài liệu và đưa mã nguồn lên GitHub.
