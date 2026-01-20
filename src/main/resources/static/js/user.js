document.addEventListener("DOMContentLoaded", function () {
    // Запрашиваем данные о пользователе через API
    fetch("/user/profile_user")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(user => {
            // Заполняем поля на странице
            document.getElementById("userId").textContent = user.id;
            document.getElementById("firstName").textContent = user.firstName;
            document.getElementById("lastName").textContent = user.lastName;
            document.getElementById("age").textContent = user.age;
            document.getElementById("emailValue").textContent = user.email;

            // Обработка ролей с бейджами
            const rolesHtml = user.roles.map(role =>
                `<span class="role-badge">${role.name.replace('ROLE_', '')}</span>`
            ).join(' ');
            document.getElementById("roles").innerHTML = rolesHtml;

            // Для отображения в навигации
            document.getElementById("navbarUserEmail").textContent = user.email;
            document.getElementById("navbarUserRoles").textContent = user.roles.map(r => r.name.replace('ROLE_', '')).join(', ');
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            // Перенаправление на страницу логина, если ошибка авторизации
            if (error.status === 401 || error.message.includes("401")) {
                window.location.href = "/login";
            }
        });
});