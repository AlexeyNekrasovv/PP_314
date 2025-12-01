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
                    document.getElementById("email").textContent = user.email;
                    // Обработка ролей
                    let roles = user.authorities.map(role => role.authority.substring(5)).join(", ");
                    document.getElementById("roles").textContent = roles;
                    // Для отображения роли в навигации
                    document.getElementById("navbarUserEmail").textContent = user.username;
                    document.getElementById("navbarUserRoles").textContent = roles;
            })
            .catch(error => {
                    console.error("Error fetching user data:", error);
                    // Перенаправление на страницу логина, если ошибка авторизации
                    if (error.status === 401 || error.message.includes("401")) {
                            window.location.href = "/login";
                    }
            });
});