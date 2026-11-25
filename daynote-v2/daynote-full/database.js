
const sqlite = require('node:sqlite');
const path = require('path');

const Database = sqlite.Database || sqlite.DatabaseSync;

// Khởi tạo cơ sở dữ liệu SQLite
const db = new Database(
    path.join(__dirname, 'daynote.db')
);

// Tạo bảng lưu trữ công việc
db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT DEFAULT '',
        date TEXT NOT NULL,
        time TEXT DEFAULT '',
        category TEXT NOT NULL,
        priority TEXT DEFAULT 'Trung bình',
        done INTEGER DEFAULT 0 CHECK(done IN (0, 1))
    )
`);

console.log('Ket noi SQLite thanh cong!');
console.log('Bang tasks da san sang!');

module.exports = db;
