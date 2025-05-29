async function fetchLecturers() {
    const response = await fetch('http://localhost:3000/lecturers');
    const lecturers = await response.json();
    const container = document.getElementById('lecturerContainer');
    const select = document.getElementById('lecturerSelect');
    const scheduleBody = document.getElementById('scheduleBody');
    
    if (container) container.innerHTML = '';
    if (select) select.innerHTML = '<option value="">Select Lecturer</option>';
    if (scheduleBody) scheduleBody.innerHTML = '';

    lecturers.forEach(lecturer => {
        if (container) {
            const card = document.createElement('div');
            card.className = 'lecturer-card bg-blue-50 p-4 rounded-lg shadow-md';
            card.innerHTML = `
                <h3 class="text-lg font-semibold text-indigo-900">${lecturer.fullName}</h3>
                <p><strong>Department:</strong> ${lecturer.department}</p>
                <p><strong>Specialization:</strong> ${lecturer.specialization}</p>
                <p><strong>Email:</strong> ${lecturer.email}</p>
                <p><strong>Phone:</strong> ${lecturer.phone}</p>
                <p><strong>Available:</strong> ${lecturer.timeAvailable}</p>
            `;
            container.appendChild(card);
        }

        if (select) {
            const option = document.createElement('option');
            option.value = lecturer.id;
            option.textContent = lecturer.fullName;
            select.appendChild(option);
        }

        if (scheduleBody) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${lecturer.fullName}</td>
                <td>${lecturer.timeAvailable.includes('Mon') ? lecturer.timeAvailable : '-'}</td>
                <td>${lecturer.timeAvailable.includes('Tue') ? lecturer.timeAvailable : '-'}</td>
                <td>${lecturer.timeAvailable.includes('Wed') ? lecturer.timeAvailable : '-'}</td>
                <td>${lecturer.timeAvailable.includes('Thu') ? lecturer.timeAvailable : '-'}</td>
                <td>${lecturer.timeAvailable.includes('Fri') ? lecturer.timeAvailable : '-'}</td>
            `;
            scheduleBody.appendChild(row);
        }
    });
}

if (document.getElementById('lecturerForm')) {
    document.getElementById('lecturerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const lecturer = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            department: document.getElementById('department').value,
            specialization: document.getElementById('specialization').value,
            timeAvailable: document.getElementById('timeAvailable').value
        };

        await fetch('http://localhost:3000/lecturers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lecturer)
        });

        document.getElementById('lecturerForm').reset();
        alert('Lecturer added successfully!');
        window.location.href = 'view-lecturers.html';
    });
}

async function searchLecturers() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const department = document.getElementById('departmentFilter').value;
    const specialization = document.getElementById('specializationFilter').value;
    const response = await fetch('http://localhost:3000/lecturers');
    const lecturers = await response.json();
    const container = document.getElementById('searchResults');
    container.innerHTML = '';

    const filtered = lecturers.filter(lecturer =>
        (lecturer.fullName.toLowerCase().includes(query) || query === '') &&
        (department === '' || lecturer.department === department) &&
        (specialization === '' || lecturer.specialization === specialization)
    );

    filtered.forEach(lecturer => {
        const card = document.createElement('div');
        card.className = 'lecturer-card bg-blue-50 p-4 rounded-lg shadow-md';
        card.innerHTML = `
            <h3 class="text-lg font-semibold text-indigo-900">${lecturer.fullName}</h3>
            <p><strong>Department:</strong> ${lecturer.department}</p>
            <p><strong>Specialization:</strong> ${lecturer.specialization}</p>
            <p><strong>Email:</strong> ${lecturer.email}</p>
            <p><strong>Phone:</strong> ${lecturer.phone}</p>
            <p><strong>Available:</strong> ${lecturer.timeAvailable}</p>
        `;
        container.appendChild(card);
    });
}

if (document.getElementById('feedbackForm')) {
    document.getElementById('feedbackForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        alert('Feedback submitted successfully!');
        document.getElementById('feedbackForm').reset();
    });
}

if (document.getElementById('lecturerContainer') || document.getElementById('lecturerSelect') || document.getElementById('scheduleBody')) {
    fetchLecturers();
}