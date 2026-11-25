
// ========================================
// KẾT NỐI API VÀ KHỞI TẠO
// ========================================

const API = '/api/tasks';
const $ = id => document.getElementById(id);

function dateKey(d = new Date()) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const today = dateKey();

let tasks = [];
let view = 'today';
let category = null;
let editing = null;
let toastTimer;
let busy = false;
let ready = false;

const rank = {
    'Cao': 0,
    'Trung bình': 1,
    'Thấp': 2
};

const tone = {
    'Cao': 'high',
    'Trung bình': 'medium',
    'Thấp': 'low'
};

// Danh sách đường dẫn của từng trang
const routes = {
    today: { view: 'today', category: null },
    all: { view: 'all', category: null },
    stats: { view: 'stats', category: null },
    study: { view: 'all', category: 'Học tập' },
    personal: { view: 'all', category: 'Cá nhân' },
    work: { view: 'all', category: 'Công việc' }
};

const categoryRoutes = {
    'Học tập': 'study',
    'Cá nhân': 'personal',
    'Công việc': 'work'
};

// ========================================
// XỬ LÝ API
// ========================================

async function request(url, method = 'GET', data) {
    const options = {
        method,
        cache: 'no-store'
    };

    if (data !== undefined) {
        options.headers = {
            'Content-Type': 'application/json'
        };

        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error('Yêu cầu thất bại: ' + response.status);
    }

    return await response.json();
}

// Lấy dữ liệu từ SQLite thông qua API
async function loadTasks() {
    tasks = await request(API);
    ready = true;
    render();
}

// Thêm công việc
async function createTask(data) {
    await request(API, 'POST', {
        ...data,
        done: false
    });
}

// Cập nhật công việc
async function updateTask(id, data) {
    await request(`${API}/${id}`, 'PUT', data);
}

// Xóa công việc
async function deleteTask(id) {
    await request(`${API}/${id}`, 'DELETE');
}

// ========================================
// CÁC HÀM HỖ TRỢ GIAO DIỆN
// ========================================

const formatDate = date =>
    new Date(date + 'T00:00:00').toLocaleDateString('vi-VN');

$('topDate').textContent =
    new Date().toLocaleDateString('vi-VN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

function make(tag, cls, text) {
    const el = document.createElement(tag);

    if (cls) {
        el.className = cls;
    }

    if (text !== undefined) {
        el.textContent = text;
    }

    return el;
}

function notify(text) {
    $('toast').textContent = text;
    $('toast').classList.add('show');

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        $('toast').classList.remove('show');
    }, 2500);
}

function showError(error) {
    console.error(error);
    notify('Có lỗi xảy ra. Vui lòng kiểm tra server.');
}

// ========================================
// HIỂN THỊ TỪNG CÔNG VIỆC
// ========================================

function taskRow(t) {

    const row = make(
        'article',
        'task' + (t.done ? ' done' : '')
    );

    const check = make(
        'button',
        'check ' + tone[t.priority],
        t.done ? '✓' : ''
    );

    check.type = 'button';

    check.setAttribute(
        'aria-label',
        t.done
            ? 'Đánh dấu chưa hoàn thành'
            : 'Đánh dấu hoàn thành'
    );

    // Cập nhật trạng thái hoàn thành
    check.onclick = async () => {

        if (busy) return;

        busy = true;

        try {

            await updateTask(t.id, {
                ...t,
                done: !t.done
            });

            await loadTasks();

            notify(
                t.done
                    ? 'Đã chuyển sang chưa hoàn thành'
                    : 'Đã hoàn thành công việc'
            );

        } catch (error) {
            showError(error);

        } finally {
            busy = false;
        }
    };

    // Thông tin công việc
    const info = make('div', 'task-info');

    info.append(
        make('div', 'task-name', t.title)
    );

    if (t.description) {
        info.append(
            make('div', 'description', t.description)
        );
    }

    const meta = make('div', 'meta');

    meta.append(
        make(
            'span',
            '',
            `◷ ${t.date === today ? 'Hôm nay' : formatDate(t.date)}${t.time ? ' · ' + t.time : ''}`
        )
    );

    // Hiển thị icon danh mục
    const cat = make('span');

    const icon = document.querySelector(
        '[data-category="' +
        t.category +
        '"] .category-icon'
    );

    if (icon) {
        cat.append(icon.cloneNode(true));
    }

    cat.append(
        document.createTextNode(t.category)
    );

    meta.append(cat);
    info.append(meta);

    // Các nút thao tác
    const actions = make('div', 'task-actions');

    // Nút chỉnh sửa
    const edit = make('button', 'icon-btn', '✎');

    edit.type = 'button';
    edit.title = 'Sửa';

    edit.setAttribute(
        'aria-label',
        'Sửa ' + t.title
    );

    edit.onclick = () => openForm(t);

    // Nút xóa
    const del = make('button', 'icon-btn', '×');

    del.type = 'button';
    del.title = 'Xóa';

    del.setAttribute(
        'aria-label',
        'Xóa ' + t.title
    );

    del.onclick = async () => {

        if (busy) return;

        if (!confirm('Xóa công việc này?')) {
            return;
        }

        busy = true;

        try {

            await deleteTask(t.id);
            await loadTasks();

            notify('Đã xóa công việc');

        } catch (error) {
            showError(error);

        } finally {
            busy = false;
        }
    };

    actions.append(edit, del);

    row.append(
        check,
        info,
        make(
            'span',
            'priority ' + tone[t.priority],
            t.priority
        ),
        actions
    );

    return row;
}

// ========================================
// HIỂN THỊ DANH SÁCH VÀ TIẾN ĐỘ
// ========================================

function render() {

    const dayTasks = tasks.filter(
        t => t.date === today
    );

    $('navCount').textContent =
        dayTasks.filter(t => !t.done).length;

    const base = tasks.filter(t =>
        (view !== 'today' || t.date === today) &&
        (!category || t.category === category)
    );

    const done = base.filter(t => t.done).length;

    const pct = base.length
        ? Math.round(done / base.length * 100)
        : 0;

    // Thanh tiến độ
    $('progressTitle').textContent =
        `${done} / ${base.length} công việc`;

    $('progressText').textContent =
        view === 'today'
            ? 'Đã hoàn thành hôm nay'
            : 'Đã hoàn thành';

    $('progressPercent').textContent = pct + '%';

    $('progressBar').style.width = pct + '%';

    // Tìm kiếm công việc
    const q = $('search').value
        .trim()
        .toLocaleLowerCase('vi');

    // Lọc và sắp xếp công việc
    const list = base.filter(t =>

        (
            !q ||
            (t.title + ' ' + t.description)
                .toLocaleLowerCase('vi')
                .includes(q)
        ) &&

        (
            $('statusFilter').value === 'all' ||
            t.done === ($('statusFilter').value === 'done')
        ) &&

        (
            $('priorityFilter').value === 'all' ||
            t.priority === $('priorityFilter').value
        )

    ).sort((a, b) =>

        rank[a.priority] - rank[b.priority] ||
        a.time.localeCompare(b.time)

    );

    // Hiển thị công việc theo trạng thái
    for (const [isDone, id, count] of [

        [false, 'pendingList', 'pendingCount'],
        [true, 'doneList', 'doneCount']

    ]) {

        const group = list.filter(
            t => t.done === isDone
        );

        $(count).textContent = group.length;

        $(id).replaceChildren(

            ...(group.length

                ? group.map(taskRow)

                : [
                    make(
                        'p',
                        'empty',
                        'Không có công việc phù hợp.'
                    )
                ]
            )
        );
    }

    // ========================================
    // THỐNG KÊ TỪ DATABASE
    // ========================================

    const total = tasks.length;

    const completed =
        tasks.filter(t => t.done).length;

    const rate = total
        ? Math.round(completed / total * 100)
        : 0;

    $('statTotal').textContent = total;

    $('statDone').textContent = completed;

    $('statPending').textContent =
        total - completed;

    $('statRate').textContent = rate + '%';

    $('donutRate').textContent = rate + '%';

    $('donut').style.background =
        `conic-gradient(var(--wine) ${rate}%, #eaded3 0)`;
}

// ========================================
// CHUYỂN TRANG VÀ DANH MỤC
// ========================================

function navigate(v, c = null) {

    view = v;
    category = c;

    $('taskView').hidden = v === 'stats';

    $('statsView').hidden = v !== 'stats';

    const title = c || {
        today: 'Hôm nay',
        all: 'Tất cả công việc',
        stats: 'Thống kê'
    }[v];

    $('crumb').textContent = title;

    // Không có dấu chấm cuối tiêu đề
    $('pageTitle').textContent = title;

    $('subtitle').textContent =
        v === 'today'
            ? 'Một ngày mới, một chút tiến bộ.'
            : 'Sắp xếp công việc theo cách của bạn.';

    // Cập nhật menu đang được chọn
    document.querySelectorAll('.nav').forEach(b => {

        b.classList.toggle(
            'active',

            c
                ? b.dataset.category === c
                : b.dataset.view === v
        );
    });

    $('search').value = '';

    $('statusFilter').value = 'all';

    $('priorityFilter').value = 'all';

    render();
}

// ========================================
// LƯU TRANG HIỆN TẠI BẰNG URL HASH
// ========================================

// Chuyển sang đường dẫn tương ứng
function goToRoute(route) {

    if (!Object.hasOwn(routes, route)) {
        route = 'today';
    }

    const hash = '#' + route;

    if (window.location.hash === hash) {

        restorePage();

    } else {

        window.location.hash = route;
    }
}

// Khôi phục trang dựa trên URL
function restorePage() {

    let route = window.location.hash.substring(1);

    // Nếu chưa có đường dẫn hoặc đường dẫn sai
    if (!Object.hasOwn(routes, route)) {

        route = 'today';

        window.history.replaceState(
            null,
            '',
            '#today'
        );
    }

    const currentRoute = routes[route];

    navigate(
        currentRoute.view,
        currentRoute.category
    );
}

// Xử lý khi đổi URL hoặc dùng Back / Forward
window.addEventListener(
    'hashchange',
    restorePage
);

// ========================================
// FORM THÊM VÀ CHỈNH SỬA
// ========================================

function openForm(t = null) {

    if (busy) return;

    if (!ready) {

        notify(
            'Chưa kết nối được dữ liệu. Hãy tải lại trang.'
        );

        return;
    }

    editing = t;

    const f = $('taskForm');

    f.reset();

    $('dialogTitle').textContent =
        t ? 'Sửa công việc' : 'Thêm công việc';

    for (const key of [

        'title',
        'description',
        'date',
        'time',
        'category',
        'priority'

    ]) {

        if (t) {

            f.elements[key].value = t[key];

        } else if (key === 'date') {

            f.elements[key].value = today;

        } else if (key === 'category' && category) {

            f.elements[key].value = category;
        }
    }

    $('taskDialog').showModal();
}

// ========================================
// XỬ LÝ SỰ KIỆN
// ========================================

// Nút thêm công việc
document.querySelectorAll('[data-add]').forEach(b => {

    b.onclick = () => openForm();
});

// Chuyển trang chính
document.querySelectorAll('[data-view]').forEach(b => {

    b.onclick = () => {

        goToRoute(b.dataset.view);
    };
});

// Chuyển trang danh mục
document.querySelectorAll('[data-category]').forEach(b => {

    b.onclick = () => {

        goToRoute(
            categoryRoutes[b.dataset.category]
        );
    };
});

// Nhấn logo để trở về Hôm nay
document.querySelector('.brand').onclick = e => {

    e.preventDefault();

    goToRoute('today');
};

// Đóng form
$('closeDialog').onclick =
$('cancelDialog').onclick = () => {

    if (!busy) {
        $('taskDialog').close();
    }
};

// Không đóng form khi đang lưu dữ liệu
$('taskDialog').addEventListener('cancel', e => {

    if (busy) {
        e.preventDefault();
    }
});

// ========================================
// LƯU CÔNG VIỆC VÀO DATABASE
// ========================================

$('taskForm').onsubmit = async e => {

    e.preventDefault();

    if (busy) return;

    const form = e.currentTarget;

    const data = Object.fromEntries(
        new FormData(form)
    );

    data.title = data.title.trim();

    if (!data.title) {

        form.elements.title.focus();

        return;
    }

    const submitButton =
        form.querySelector('[type="submit"]');

    submitButton.disabled = true;

    busy = true;

    try {

        if (editing) {

            await updateTask(editing.id, {
                ...data,
                done: editing.done
            });

            notify('Đã cập nhật công việc');

        } else {

            await createTask(data);

            notify('Đã thêm công việc');
        }

        $('taskDialog').close();

        await loadTasks();

    } catch (error) {

        showError(error);

    } finally {

        submitButton.disabled = false;

        busy = false;
    }
};

// ========================================
// TÌM KIẾM VÀ BỘ LỌC
// ========================================

['search', 'statusFilter', 'priorityFilter']
    .forEach(id => {

        $(id).addEventListener(

            id === 'search' ? 'input' : 'change',

            render
        );
    });

// ========================================
// BIỂU ĐỒ TUẦN - MOCK DATA
// ========================================

[3, 5, 2, 6, 4, 7, 3].forEach((n, i) => {

    const col = make('div', 'bar-col');

    const bar = make('i');

    bar.style.height = `${n / 7 * 78}%`;

    col.append(

        make('small', '', n),

        bar,

        make(
            'small',
            '',
            ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'][i]
        )
    );

    $('weekChart').append(col);
});

// ========================================
// KHỞI ĐỘNG ỨNG DỤNG
// ========================================

// Khôi phục đúng trang trước khi tải dữ liệu
restorePage();

// Đọc dữ liệu từ Database
loadTasks().catch(showError);
