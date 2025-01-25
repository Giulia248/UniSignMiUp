var checkActiveState = true;
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    // REGISTER
    registerBtn.addEventListener('click', () => {
        if (checkActiveState) {
            container.classList.add("active");
            checkActiveState = false;
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById("signUp").addEventListener("click", function (event) {
            event.preventDefault();
    
            // Validazione campi di input
            const nomeInput = document.getElementById('nomeRegistration');
            const cognomeInput = document.getElementById('cognomeRegistration');
            const emailInput = document.getElementById('emailRegistration');
            const passwordInput = document.getElementById('passwordRegistration');
            const facoltaInput = document.getElementById('facoltaRegistration');
            const matricolaInput = document.getElementById('matricolaRegistration');
    
            if (nomeInput.value.trim() === '' || cognomeInput.value.trim() === '' || emailInput.value.trim() === '' || passwordInput.value.trim() === '' || matricolaInput.value.trim() === '') {
                alert("Compilare tutti i campi.");
                return;
            }
    
            if (passwordInput.value.trim().length < 6) {
                alert("La password deve contenere almeno 6 caratteri.");
                return;
            }
    
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                alert("Inserire un indirizzo email valido.");
                return;
            }
    
            if (!(emailInput.value.trim().includes("unimi.it"))) {
                alert("Inserire un indirizzo email unimi (unimi.it).");
                return;
            }
    
            if (facoltaInput.value === '') {
                alert("Selezionare una facoltà.");
                return;
            }
    
            var formData = {
                nome: nomeInput.value,
                cognome: cognomeInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                facolta: facoltaInput.value,
                matricola: matricolaInput.value
            };
    
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            };
    
            fetch('http://localhost:3000/addUser', options)
                .then(data => {
                    if (!data.ok) {
                        alert("Errore nella registrazione");
                        throw Error(data.status);
                    }
                    window.location.href = 'http://127.0.0.1:5501/features/homepage/homepage.html';
                    return data.json();
                });
        });
    });
    

    // LOG IN --------------------------------------------------------------------

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
        checkActiveState = true;
    });

    document.getElementById("signIn").addEventListener("click", function (event) {
        event.preventDefault();

        // Validazione campi di input
        const emailInput = document.querySelector('.sign-in input[placeholder="Email"]');
        const passwordInput = document.querySelector('.sign-in input[placeholder="Password"]');

        if (emailInput.value.trim() === '' || passwordInput.value.trim() === '') {
            alert("Compilare tutti i campi.");
            return;
        }

        // Controllo validità dell'indirizzo email solo durante l'accesso
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            alert("Inserire un indirizzo email valido.");
            return;
        }

        const emailValue = emailInput.value.trim();
        if (!(emailValue.includes("unimi.it"))) {
            alert("Inserire un indirizzo email unimi (unimi.it).");
            return;
        }

        const email = document.getElementById("emailLogin").value;
        const password = document.getElementById("passwordLogin").value;

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const encodedPassword = encodeURIComponent(password);

        fetch(`http://localhost:3000/getUser?email=${email}&password=${encodedPassword}`, options)
        .then(response => {
            if (!response.ok) {
                if (response.status == 401) {
                    alert("password errata");
                    return;
                } else if (response.status == 500) {
                    alert("Email non valida o non registrata");
                    return;
                }
            } else {
                // Reindirizzamento alla homepage
                window.location.href = 'http://127.0.0.1:5501/features/homepage/homepage.html';
            }
        })
        .catch(error => {
            console.error('C`è stato un problema:', error);
        });
    });
    // Funzione per mostrare/nascondere la password
    function togglePasswordVisibility(inputId, iconId) {
        const passwordInput = document.getElementById(inputId);
        const icon = document.getElementById(iconId);
    
        if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
        } else {
        passwordInput.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
        }
    }
    
    // Eventi per gli icone degli occhi
    document.getElementById('eyeRegistration').addEventListener('click', () => {
        togglePasswordVisibility('passwordRegistration', 'eyeRegistration');
    });
    
    document.getElementById('eyeLogin').addEventListener('click', () => {
        togglePasswordVisibility('passwordLogin', 'eyeLogin');
    });
    
});


