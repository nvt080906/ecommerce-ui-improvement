
const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(express.json());

// ==============================
// KẾT NỐI FRONT-END
// ==============================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'style.css'));
});

app.get('/app.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'app.js'));
});

// Kiểm tra hoạt động của server
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Daynote API is running'
    });
});

// ==============================
// KIỂM TRA DỮ LIỆU
// ==============================

function validateTask(task) {
    return (
        task &&
        typeof task.title === 'string' &&
        task.title.trim().length > 0 &&
        task.title.length <= 120 &&
        typeof task.description === 'string' &&
        typeof task.date === 'string' &&
        /^\d{4}-\d{2}-\d{2}$/.test(task.date) &&
        typeof task.time === 'string' &&
        (task.time === '' ||
            /^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(task.time)) &&
        ['Học tập', 'Cá nhân', 'Công việc'].includes(task.category) &&
        ['Cao', 'Trung bình', 'Thấp'].includes(task.priority) &&
        typeof task.done === 'boolean'
    );
}

// Chuyển trạng thái SQLite thành Boolean
function formatTask(task) {
    return {
        ...task,
        done: Boolean(task.done)
    };
}

// ==============================
// READ - LẤY DANH SÁCH CÔNG VIỆC
// ==============================

app.get('/api/tasks', (req, res) => {
    const tasks = db.prepare(
        'SELECT * FROM tasks ORDER BY id'
    ).all();

    res.json(tasks.map(formatTask));
});

// ==============================
// CREATE - THÊM CÔNG VIỆC
// ==============================

app.post('/api/tasks', (req, res) => {
    const task = req.body;

    if (!validateTask(task)) {
        return res.status(400).json({
            message: 'Dữ liệu công việc không hợp lệ'
        });
    }

    const result = db.prepare(`
        INSERT INTO tasks
        (title, description, date, time, category, priority, done)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
        task.title.trim(),
        task.description,
        task.date,
        task.time,
        task.category,
        task.priority,
        task.done ? 1 : 0
    );

    const newTask = db.prepare(
        'SELECT * FROM tasks WHERE id = ?'
    ).get(Number(result.lastInsertRowid));

    res.status(201).json(formatTask(newTask));
});

// ==============================
// UPDATE - SỬA CÔNG VIỆC
// ==============================

app.put('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = req.body;

    if (!Number.isSafeInteger(id) || !validateTask(task)) {
        return res.status(400).json({
            message: 'Dữ liệu không hợp lệ'
        });
    }

    const result = db.prepare(`
        UPDATE tasks
        SET title = ?,
            description = ?,
            date = ?,
            time = ?,
            category = ?,
            priority = ?,
            done = ?
        WHERE id = ?
    `).run(
        task.title.trim(),
        task.description,
        task.date,
        task.time,
        task.category,
        task.priority,
        task.done ? 1 : 0,
        id
    );

    if (result.changes === 0) {
        return res.status(404).json({
            message: 'Không tìm thấy công việc'
        });
    }

    const updatedTask = db.prepare(
        'SELECT * FROM tasks WHERE id = ?'
    ).get(id);

    res.json(formatTask(updatedTask));
});

// ==============================
// DELETE - XÓA CÔNG VIỆC
// ==============================

app.delete('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id)) {
        return res.status(400).json({
            message: 'ID không hợp lệ'
        });
    }

    const result = db.prepare(
        'DELETE FROM tasks WHERE id = ?'
    ).run(id);

    if (result.changes === 0) {
        return res.status(404).json({
            message: 'Không tìm thấy công việc'
        });
    }

    res.json({
        success: true,
        message: 'Đã xóa công việc'
    });
});

// ==============================
// KHỞI ĐỘNG SERVER
// ==============================

app.listen(PORT, '127.0.0.1', () => {
    console.log('Daynote Server is running!');
    console.log(`http://127.0.0.1:${PORT}`);
});
