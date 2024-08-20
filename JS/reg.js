document.addEventListener('DOMContentLoaded', () => {
    const addStaffBtn = document.getElementById('addStaffBtn');
    const deleteStaffBtn = document.getElementById('deleteStaffBtn');
    const editStaffBtn = document.getElementById('editStaffBtn');
    const staffTableBody = document.querySelector('#staffTable tbody');

    // Add Staff Button Click Handler
    addStaffBtn.addEventListener('click', () => {
        const id = prompt('Enter staff ID:');
        const name = prompt('Enter staff name:');
        const position = prompt('Enter staff position:');
        
        if (id && name && position) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${id}</td>
                <td>${name}</td>
                <td>${position}</td>
                <td><button class="editBtn">Edit</button> <button class="deleteBtn">Delete</button></td>
            `;
            staffTableBody.appendChild(row);
        } else {
            alert('Please provide all details.');
        }
    });

    // Delegated event handler for delete buttons in the table
    staffTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('deleteBtn')) {
            const row = e.target.closest('tr');
            staffTableBody.removeChild(row);
        }
    });

    // Delegated event handler for edit buttons in the table
    staffTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('editBtn')) {
            const row = e.target.closest('tr');
            const cells = row.getElementsByTagName('td');
            const id = prompt('Edit staff ID:', cells[0].textContent);
            const name = prompt('Edit staff name:', cells[1].textContent);
            const position = prompt('Edit staff position:', cells[2].textContent);

            if (id && name && position) {
                cells[0].textContent = id;
                cells[1].textContent = name;
                cells[2].textContent = position;
            } else {
                alert('Please provide all details.');
            }
        }
    });
});
document.getElementById('signupForm').addEventListener('submit', function(event) {
    let isValid = true;

    // Clear previous errors
    document.getElementById('usernameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('cpasswordError').textContent = '';

    // Validate username
    const username = document.getElementById('username').value;
    if (username.trim() === '') {
        document.getElementById('usernameError').textContent = 'Username is required.';
        isValid = false;
    }

    // Validate email
    const email = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // Validate password
    const password = document.getElementById('password').value;
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long.';
        isValid = false;
    }

    // Validate confirm password
    const cpassword = document.getElementById('cpassword').value;
    if (password !== cpassword) {
        document.getElementById('cpasswordError').textContent = 'Passwords do not match.';
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault(); // Prevent form submission
    }
});