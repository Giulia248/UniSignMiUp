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

        // Verifica che i campi siano compilati
        if (!resetEmail || !newPassword || !confirmNewPassword) {
            alert("Compilare tutti i campi.");
            return;
        }

        // Verifica che le password siano uguali
        if (newPassword !== confirmNewPassword) {
            alert("Le password non corrispondono.");
            return;
        }

        // Verifica la sicurezza della password
        if (!validatePassword(newPassword)) {
            alert("La password non rispetta i criteri di sicurezza.");
            return;
        }


        const requestBody = {
            email: resetEmail,
            password: newPassword
        }

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),

        };

        fetch('http://localhost:2024/UniSignMeUp/v1/changePassword', options)
            .then(data => {
                if (!data.ok) {
                    alert("Errore nel cambio password");
                    throw Error(data.status);
                };
                // Mostra un messaggio di conferma
                const confirmationMessage = document.getElementById('confirmationMessage');
                confirmationMessage.innerHTML = "La password è stata modificata con successo!";
                confirmationMessage.style.display = "block";

                // Ritorna alla pagina di login dopo un certo periodo di tempo
                setTimeout(function () {
                    window.location.href = 'http://127.0.0.1:5501/features/login/login.html';
                }, 3000); // Ritorna alla pagina di login dopo 3 secondi
            });
    });



    // Funzione per validare la sicurezza della password
    function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&@()*+,.\/:;=?[\]_{}|\\]).{8,256}$/;
        return passwordRegex.test(password);
    }
});
