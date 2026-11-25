
# Daynote. – Personal Task Manager

## 1. Giới thiệu

Daynote là ứng dụng quản lý công việc cá nhân, hỗ trợ người dùng lập kế hoạch, theo dõi tiến độ và quản lý các công việc hằng ngày.

Giao diện lấy cảm hứng từ Todoist, được thiết kế theo phong cách tối giản với hai màu chủ đạo là đỏ đô và kem be, hướng đến trải nghiệm trực quan, dễ sử dụng.

Ứng dụng được phát triển bằng phương pháp Vibe Coding với sự hỗ trợ của ChatGPT trong quá trình thiết kế giao diện, xây dựng chức năng, kết nối cơ sở dữ liệu và kiểm thử hệ thống.

## 2. Chức năng của hệ thống

- Hiển thị danh sách công việc trong ngày hôm nay.
- Hiển thị tất cả công việc.
- Thêm, chỉnh sửa và xóa công việc.
- Tìm kiếm theo tên và mô tả công việc.
- Lọc theo trạng thái và mức độ ưu tiên.
- Phân loại công việc theo danh mục: Học tập, Cá nhân và Công việc.
- Đánh dấu công việc đã hoàn thành hoặc chưa hoàn thành.
- Theo dõi tiến độ hoàn thành công việc.
- Thống kê số lượng công việc và tỷ lệ hoàn thành.
- Nhập thời gian linh hoạt theo định dạng 24 giờ.
- Giữ nguyên trang đang xem khi tải lại trình duyệt.
- Lưu trữ dữ liệu lâu dài bằng cơ sở dữ liệu SQLite.

## 3. Công nghệ sử dụng

| Thành phần | Công nghệ |
|---|---|
| Front-end | HTML, CSS, JavaScript |
| Back-end | Node.js, Express.js |
| Database | SQLite |
| Giao tiếp dữ liệu | REST API, Fetch API, JSON |
| Công cụ lập trình | Visual Studio Code |
| Công cụ hỗ trợ AI | ChatGPT |
| Quản lý mã nguồn | GitHub |

## 4. Quá trình phát triển

- Giai đoạn 1: Xây dựng prompt và thiết kế giao diện lấy cảm hứng từ Todoist.
- Giai đoạn 2: Phát triển các chức năng quản lý công việc bằng JavaScript, sử dụng dữ liệu tạm thời và chưa kết nối cơ sở dữ liệu.
- Giai đoạn 3: Khởi tạo Back-end bằng Node.js và Express.js, xây dựng cơ sở dữ liệu SQLite.
- Giai đoạn 4: Xây dựng REST API và kết nối Front-end với Back-end và Database.
- Giai đoạn 5: Kiểm thử, sửa lỗi, cải thiện trải nghiệm người dùng và hoàn thiện sản phẩm.

Repository lưu trữ phiên bản hoàn chỉnh của ứng dụng.

## 5. Cơ sở dữ liệu

Hệ thống sử dụng SQLite để lưu trữ thông tin công việc trong bảng tasks.

| Trường dữ liệu | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | INTEGER | Mã công việc, khóa chính, tự tăng |
| title | TEXT | Tên công việc |
| description | TEXT | Mô tả công việc |
| date | TEXT | Ngày thực hiện |
| time | TEXT | Giờ thực hiện |
| category | TEXT | Danh mục công việc |
| priority | TEXT | Mức độ ưu tiên |
| done | INTEGER | Trạng thái hoàn thành (0 hoặc 1) |

Dữ liệu được lưu trữ trong file daynote.db và không bị mất khi tải lại trang hoặc khởi động lại ứng dụng.

## 6. REST API

| Method | Endpoint | Chức năng |
|---|---|---|
| GET | /api/health | Kiểm tra hoạt động của server |
| GET | /api/tasks | Lấy danh sách công việc |
| POST | /api/tasks | Thêm công việc |
| PUT | /api/tasks/:id | Cập nhật công việc |
| DELETE | /api/tasks/:id | Xóa công việc |

## 7. Trang thống kê

Trang thống kê cung cấp các thông tin:

- Tổng số công việc.
- Số công việc đã hoàn thành.
- Số công việc chưa hoàn thành.
- Tỷ lệ hoàn thành công việc.
- Biểu đồ hoạt động trong tuần.
- Biểu đồ tiến độ tổng thể.

Các chỉ số tổng quan và biểu đồ tiến độ tổng thể được cập nhật từ dữ liệu thực tế trong SQLite. Riêng biểu đồ hoạt động trong tuần sử dụng dữ liệu mẫu (mock data) để minh họa.

## 8. Cấu trúc thư mục

    daynote-full/
    ├── index.html
    ├── style.css
    ├── app.js
    ├── server.js
    ├── database.js
    ├── seed.js
    ├── package.json
    ├── package-lock.json
    ├── .gitignore
    ├── PROMPT.md
    └── README.md

- index.html: Cấu trúc giao diện ứng dụng.
- style.css: Thiết kế giao diện và bố cục.
- app.js: Xử lý chức năng Front-end và giao tiếp với API.
- server.js: Khởi tạo server và xử lý REST API.
- database.js: Khởi tạo và kết nối cơ sở dữ liệu SQLite.
- seed.js: Khởi tạo dữ liệu công việc mẫu.
- package.json: Quản lý thông tin, thư viện và lệnh chạy dự án.
- package-lock.json: Quản lý phiên bản các thư viện.
- .gitignore: Loại trừ các file và thư mục không cần đưa lên GitHub.
- PROMPT.md: Tổng hợp các prompt sử dụng trong quá trình Vibe Coding.
- README.md: Mô tả hệ thống và hướng dẫn sử dụng.

## 9. Hướng dẫn cài đặt và sử dụng

Yêu cầu: Node.js phiên bản 24 trở lên có hỗ trợ module node:sqlite và npm.

Bước 1: Tải source code từ GitHub và mở thư mục dự án bằng Visual Studio Code.

Bước 2: Cài đặt các thư viện cần thiết.

    npm install

Bước 3: Khởi tạo cơ sở dữ liệu và dữ liệu mẫu.

    npm run seed

Bước 4: Khởi động ứng dụng.

    npm start

Bước 5: Mở trình duyệt và truy cập:

http://127.0.0.1:3000

Để kiểm tra dữ liệu được truy xuất từ cơ sở dữ liệu, truy cập:

http://127.0.0.1:3000/api/tasks

Nếu sử dụng PowerShell và gặp lỗi quyền thực thi npm, có thể thay npm bằng npm.cmd trong các câu lệnh trên.

File daynote.db được tự động tạo khi khởi tạo cơ sở dữ liệu. Thư mục node_modules và file cơ sở dữ liệu cục bộ không được đưa lên GitHub.

## 10. Tham khảo

- Todoist: https://www.todoist.com/fr
- Node.js: https://nodejs.org/
- Express.js: https://expressjs.com/
- SQLite: https://www.sqlite.org/
- ChatGPT: https://chatgpt.com/
