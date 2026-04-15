const dayBoxes = document.querySelectorAll('.day-box');
const modalOverlay = document.getElementById('modalOverlay');
const modalDayNumber = document.getElementById('modalDayNumber');
const modalThoughtText = document.getElementById('modalThoughtText');
const editBtn = document.getElementById('editBtn');
const deleteForm = document.getElementById('deleteForm');

dayBoxes.forEach(box => {
    box.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        modalDayNumber.textContent = `${this.getAttribute('data-day')} • ${this.getAttribute('data-date')}`;
        modalThoughtText.textContent = this.getAttribute('data-text');

        editBtn.href = `/${id}/edit`;
        deleteForm.action = `/${id}?_method=DELETE`;

        modalOverlay.classList.add('active');
        markAsRead(id);
        this.classList.add('read');
    });
});

function markAsRead(id) {
    let readDays = JSON.parse(localStorage.getItem('readDays')) || [];
    if (!readDays.includes(id)) { readDays.push(id); localStorage.setItem('readDays', JSON.stringify(readDays)); }
}

function applyReadStyles() {
    const readDays = JSON.parse(localStorage.getItem('readDays')) || [];
    dayBoxes.forEach(box => { if (readDays.includes(box.getAttribute('data-id'))) box.classList.add('read'); });
}

applyReadStyles();
document.getElementById('closeBtn').addEventListener('click', () => modalOverlay.classList.remove('active'));