
const db = require('./database');

// Lấy ngày hiện tại
const now = new Date();

const today =
    now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' +
    String(now.getDate()).padStart(2, '0');

// Dữ liệu công việc mẫu
const tasks = [
    {
        title: 'Hoàn thành bài thực hành Node.js',
        description: 'Kiểm tra chương trình HelloWorld và ghi chú kiến thức.',
        date: today,
        time: '10:30',
        category: 'Học tập',
        priority: 'Cao',
        done: 0
    },
    {
        title: 'Chuẩn bị tài liệu cho bài thuyết trình',
        description: 'Xem lại slide và các nội dung cần trình bày.',
        date: today,
        time: '14:00',
        category: 'Học tập',
        priority: 'Cao',
        done: 0
    },
    {
        title: 'Đọc 20 trang sách',
        description: 'Dành một chút thời gian cho bản thân.',
        date: today,
        time: '18:00',
        category: 'Cá nhân',
        priority: 'Trung bình',
        done: 0
    },
    {
        title: 'Cập nhật kế hoạch tuần',
        description: 'Sắp xếp các công việc còn lại.',
        date: today,
        time: '19:30',
        category: 'Công việc',
        priority: 'Trung bình',
        done: 0
    },
    {
        title: 'Dọn dẹp bàn học',
        description: '',
        date: today,
        time: '21:00',
        category: 'Cá nhân',
        priority: 'Thấp',
        done: 0
    },
    {
        title: 'Kiểm tra email',
        description: '',
        date: today,
        time: '08:00',
        category: 'Công việc',
        priority: 'Thấp',
        done: 1
    },
    {
        title: 'Xem lại bài học hôm qua',
        description: '',
        date: today,
        time: '09:00',
        category: 'Học tập',
        priority: 'Trung bình',
        done: 1
    }
];

// Kiểm tra dữ liệu hiện tại
const count = db.prepare(
    'SELECT COUNT(*) AS total FROM tasks'
).get().total;

if (count === 0) {

    const insert = db.prepare(`
        INSERT INTO tasks
        (title, description, date, time, category, priority, done)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    db.exec('BEGIN');

    try {
        for (const task of tasks) {
            insert.run(
                task.title,
                task.description,
                task.date,
                task.time,
                task.category,
                task.priority,
                task.done
            );
        }

        db.exec('COMMIT');

        console.log('Da them 7 cong viec mau!');
    } catch (error) {
        db.exec('ROLLBACK');
        throw error;
    }

} else {
    console.log('Database da co du lieu. Bo qua!');
}

db.close();
