document.addEventListener('DOMContentLoaded', function () {
    fetchCurrentUser();
    fetchUsers();
    loadRoles();
    setupCloseButtons();
});

// Toast notification utility
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icons = {
        success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
        error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
        warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'
    };

    toast.innerHTML = `
        ${icons[type] || icons.success}
        <div class="toast-content">
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Loading state for buttons
function setButtonLoading(button, loading) {
    if (loading) {
        button.disabled = true;
        button.classList.add('btn-loading');
        button.dataset.originalText = button.innerHTML;
    } else {
        button.disabled = false;
        button.classList.remove('btn-loading');
        if (button.dataset.originalText) {
            button.innerHTML = button.dataset.originalText;
        }
    }
}

// Update user count
function updateUserCount(count) {
    const countElement = document.getElementById('user-count');
    if (countElement) {
        countElement.textContent = `${count} user${count !== 1 ? 's' : ''}`;
    }
}

// Функция для получения и отображения текущего пользователя
function fetchCurrentUser() {
    console.log('Fetching current user info...');
    fetch('/admin/currentUser') // Этот URL должен совпадать с тем, что в контроллере
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch current user info');
            }
            return response.json();
        })
        .then(user => {
            console.log('Current user fetched:', user);
            const emailSpan = document.getElementById('currentUserEmail');
            const roleSpan = document.getElementById('currentUserRole');
            emailSpan.textContent = user.email;
            roleSpan.textContent = user.roles.map(role => role.name).join(', '); // Преобразуем массив ролей в строку
        })
        .catch(error => {
            console.error('Error fetching current user info:', error);
        });
}

// Функция для получения и отображения всех пользователей
function fetchUsers() {
    console.log('Fetching users...');
    fetch('/admin/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return response.json();
        })
        .then(response => {
            console.log('Users fetched:', response);
            const tableBody = document.getElementById('users-table-body');
            const emptyState = document.getElementById('empty-state');
            tableBody.innerHTML = '';

            // Update user count
            updateUserCount(response.length);

            // Show/hide empty state
            if (response.length === 0) {
                emptyState.style.display = 'block';
            } else {
                emptyState.style.display = 'none';
                response.forEach(user => {
                    const row = document.createElement('tr');
                    const rolesHtml = user.roles.map(role =>
                        `<span class="role-badge">${role.name.replace('ROLE_', '')}</span>`
                    ).join(' ');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>
                        <td>${rolesHtml}</td>
                        <td style="text-align: right;">
                            <button class="btn btn-sm btn-info" onclick="openEditUserPopup(${user.id})" aria-label="Edit user">
                                <svg style="width: 14px; height: 14px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="openDeleteUserPopup(${user.id})" aria-label="Delete user">
                                <svg style="width: 14px; height: 14px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                            </button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            showToast('Failed to load users', 'error');
        });
}

// Функция для загрузки всех ролей и отображения их в селектах
function loadRoles() {
    console.log('Loading roles...');
    fetch('/admin/users/roles')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch roles');
            }
            return response.json();
        })
        .then(roles => {
            console.log('Roles fetched:', roles);
            const roleSelect = document.getElementById('roles');
            const editRoleSelect = document.getElementById('editRoles');
            roleSelect.innerHTML = ''; // Очищаем существующие опции
            editRoleSelect.innerHTML = '';
            roles.forEach(role => {
                const option = document.createElement('option');
                option.value = role.id;
                option.text = role.name;
                roleSelect.appendChild(option);
                const editOption = document.createElement('option');
                editOption.value = role.id;
                editOption.text = role.name;
                editRoleSelect.appendChild(editOption);
            });
        })
        .catch(error => {
            console.error('Error loading roles:', error);
            alert('Ошибка при загрузке ролей');
        });
}

// Обработчик отправки формы создания нового пользователя
document.getElementById('new-user-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    setButtonLoading(submitBtn, true);

    const formData = new FormData(this);
    const roleIds = Array.from(document.getElementById('roles').selectedOptions).map(option =>
        parseInt(option.value, 10)
    );
    const user = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        age: parseInt(formData.get('age'), 10),
        email: formData.get('email'),
        password: formData.get('password'),
        roleIds: roleIds
    };
    console.log('Creating user:', user);
    fetch('/admin/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.ok) {
                fetchUsers();
                showToast('User created successfully', 'success');
                this.reset();
                closeModal('newUserPopup');
            } else {
                return response.json().then(data => {
                    throw new Error(data.message || 'Failed to create user');
                });
            }
        })
        .catch(error => {
            console.error('Error creating user:', error);
            showToast(error.message, 'error');
        })
        .finally(() => {
            setButtonLoading(submitBtn, false);
        });
});

// Функция для открытия модального окна редактирования пользователя и заполнения формы
function openEditUserPopup(userId) {
    console.log('Opening edit modal for user ID:', userId);
    fetch(`/admin/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }
            return response.json();
        })
        .then(user => {
            console.log('User fetched for edit:', user);
            document.getElementById('editUserId').value = user.id;
            document.getElementById('editFirstName').value = user.firstName;
            document.getElementById('editLastName').value = user.lastName;
            document.getElementById('editAge').value = user.age;
            document.getElementById('editEmail').value = user.email;
            const editRolesSelect = document.getElementById('editRoles');
            Array.from(editRolesSelect.options).forEach(option => {
                option.selected = user.roles.some(role => role.id === parseInt(option.value, 10));
            });
            openModal('editUserModal');
        })
        .catch(error => {
            console.error('Error fetching user:', error);
            alert('Ошибка при загрузке данных пользователя');
        });
}

// Обработчик отправки формы редактирования пользователя
document.getElementById('editUserForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    setButtonLoading(submitBtn, true);

    const formData = new FormData(this);
    const userId = parseInt(formData.get('id'), 10);
    const roleIds = Array.from(document.getElementById('editRoles').selectedOptions).map(option =>
        parseInt(option.value, 10)
    );
    const user = {
        id: userId,
        firstName: formData.get('editFirstName'),
        lastName: formData.get('editLastName'),
        age: parseInt(formData.get('editAge'), 10),
        email: formData.get('editEmail'),
        roleIds: roleIds
    };
    console.log('Updating user:', user);
    fetch(`/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.ok) {
                fetchUsers();
                showToast('User updated successfully', 'success');
                closeModal('editUserModal');
            } else {
                return response.json().then(data => {
                    throw new Error(data.message || 'Failed to update user');
                });
            }
        })
        .catch(error => {
            console.error('Error updating user:', error);
            showToast(error.message, 'error');
        })
        .finally(() => {
            setButtonLoading(submitBtn, false);
        });
});

// Функция для удаления пользователя
function openDeleteUserPopup(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        console.log('Deleting user ID:', userId);
        fetch(`/admin/users/${userId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    fetchUsers();
                    showToast('User deleted successfully', 'success');
                } else {
                    return response.json().then(data => {
                        throw new Error(data.message || 'Failed to delete user');
                    });
                }
            })
            .catch(error => {
                console.error('Error deleting user:', error);
                showToast(error.message, 'error');
            });
    }
}

// Функция для открытия модального окна
function openModal(modalId) {
    console.log('Opening modal:', modalId);
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('overlay');
    if (modal && overlay) {
        modal.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Функция для закрытия модального окна
function closeModal(modalId) {
    console.log('Closing modal:', modalId);
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('overlay');
    if (modal && overlay) {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Функция для установки обработчиков закрытия модальных окон
function setupCloseButtons() {
    const closeButtons = document.querySelectorAll('.close-popup');
    closeButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const modalId = this.getAttribute('data-modal');
            if (modalId) {
                closeModal(modalId);
            }
        });
    });

    // Закрытие модальных окон при клике на оверлей
    const overlay = document.getElementById('overlay');
    overlay.addEventListener('click', function () {
        const modals = document.querySelectorAll('.popup');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        this.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}