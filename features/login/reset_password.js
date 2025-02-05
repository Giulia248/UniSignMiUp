document.addEventListener('DOMContentLoaded', function () {
    const resetButton = document.getElementById('resetButton');

    resetButton.addEventListener('click', function (event) {
        event.preventDefault();

        const resetEmailInput = document.getElementById('resetEmail');
        const newPasswordInput = document.getElementById('newPassword');
        const confirmNewPasswordInput = document.getElementById('confirmNewPassword');

        const resetEmail = resetEmailInput.value.trim();
        const newPassword = newPasswordInput.value.trim();
        const confirmNewPassword = confirmNewPasswordInput.value.trim();

        if (!resetEmail || !newPassword || !confirmNewPassword) {
            alert("Compilare tutti i campi.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            alert("Le password non corrispondono.");
            return;
        }

        if (!validatePassword(newPassword)) {
            alert("La password non rispetta i criteri di sicurezza.");
            return;
        }

        const requestBody = {
            email: resetEmail,
            password: newPassword
        };

        fetch('http://localhost:2024/UniSignMeUp/v1/changePassword', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        })
        .then(response => {
            if (!response.ok) {
                alert("Errore nel cambio password");
                throw new Error(response.status);
            }
            document.getElementById('confirmationMessage').style.display = "block";

            setTimeout(() => {
                window.location.href = 'http://127.0.0.1:5501/features/login/login.html';
            }, 3000);
        });
    });

    function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&@()*+,.\/:;=?[\]_{}|\\]).{8,256}$/;
        return passwordRegex.test(password);
    }

    function togglePasswordVisibility(inputId, iconId) {
        const passwordInput = document.getElementById(inputId);
        const icon = document.getElementById(iconId);

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            icon.classList.replace("fa-eye-slash", "fa-eye");
        } else {
            passwordInput.type = "password";
            icon.classList.replace("fa-eye", "fa-eye-slash");
        }
    }

    document.getElementById('resetpassword').addEventListener('click', () => {
        togglePasswordVisibility('newPassword', 'resetpassword');
    });

    document.getElementById('resetpassword2').addEventListener('click', () => {
        togglePasswordVisibility('confirmNewPassword', 'resetpassword2');
    });
});
