// Global array to store submissions
let submissions = [];

const formContainer = document.getElementById("formContainer");

formContainer.innerHTML = `
<form id="myForm">

    <label>Name</label>
    <input type="text" id="name" required>

    <label>Email</label>
    <input type="text" id="email" required>

    <label>USN</label>
    <input type="text" id="usn" required>

    <label>Gender</label><br>
    <input type="radio" name="gender" value="Male" class="inline"> Male
    <input type="radio" name="gender" value="Female" class="inline"> Female
    <br><br>

    <label>Languages</label><br>
    <input type="checkbox" value="HTML" class="skill inline"> HTML
    <input type="checkbox" value="CSS" class="skill inline"> CSS
    <input type="checkbox" value="JavaScript" class="skill inline"> JavaScript
    <input type="checkbox" value="Python" class="skill inline"> Python
    <br><br>

    <label>Date of Birth</label>
    <input type="date" id="dob" required>

    <label>Description</label>
    <textarea id="description" placeholder="Tell us about yourself...."></textarea>

    <button type="submit">Submit</button>

</form>
`;

const form = document.getElementById("myForm");
const email = document.getElementById("email");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!email.value.includes("@") || !email.value.includes(".")) {
        email.value = "";
        email.classList.add("error-bg", "error-border");
        email.placeholder = "Enter valid email";
        return;
    }

    const name = document.getElementById("name").value;
    const usn = document.getElementById("usn").value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value || "";
    const dob = document.getElementById("dob").value;
    const description = document.getElementById("description").value;

    const languages = [];
    document.querySelectorAll(".skill:checked").forEach(s => languages.push(s.value));

    // Add submission to array
    const submission = {
        name: name,
        email: email.value,
        usn: usn,
        gender: gender,
        languages: languages.join(", "),
        dob: dob,
        description: description
    };

    submissions.push(submission);

    // Render table
    renderTable();

    // Reset form
    form.reset();
    email.classList.remove("error-bg", "error-border");
});

email.addEventListener("input", () => {
    email.classList.remove("error-bg", "error-border");
});

// Function to render the table
function renderTable() {
    const tableContainer = document.getElementById("tableContainer");

    if (submissions.length === 0) {
        tableContainer.innerHTML = '<div class="no-data">No submissions yet.</div>';
        return;
    }

    let tableHTML = `
    <table class="data-table">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>USN</th>
                <th>Gender</th>
                <th>Languages</th>
                <th>Date of Birth</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
    `;

    submissions.forEach((submission, index) => {
        tableHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${submission.name}</td>
            <td>${submission.email}</td>
            <td>${submission.usn}</td>
            <td>${submission.gender}</td>
            <td>${submission.languages}</td>
            <td>${submission.dob}</td>
            <td>${submission.description}</td>
        </tr>
        `;
    });

    tableHTML += `
        </tbody>
    </table>
    `;

    tableContainer.innerHTML = tableHTML;
}

// Function to copy table to clipboard
function copyTableToClipboard() {
    const table = document.querySelector('.data-table');

    if (!table) {
        alert('No data to copy');
        return;
    }

    let tableText = "";
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('th, td');
        cells.forEach(cell => {
            tableText += cell.textContent + '\t';
        });
        tableText += '\n';
    });

    navigator.clipboard.writeText(tableText).then(() => {
        const copyBtn = document.getElementById('copyBtn');
        copyBtn.classList.add('copy-success');
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => {
            copyBtn.classList.remove('copy-success');
            copyBtn.textContent = '📋 Copy Table';
        }, 2000);
    });
}

// Function to export table to CSV
function exportTableToCSV() {
    const table = document.querySelector('.data-table');

    if (!table) {
        alert('No data to export');
        return;
    }

    let csv = [];
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('th, td');
        let rowData = [];
        cells.forEach(cell => {
            rowData.push('"' + cell.textContent.replace(/"/g, '""') + '"');
        });
        csv.push(rowData.join(','));
    });

    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Initial render
renderTable();
