

var checkActiveState = true;
var responseStatus;
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

    //   document.addEventListener('DOMContentLoaded', function () { ?????? che ci faceva quii?
    document.getElementById("signUp").addEventListener("click", function (event) {
        event.preventDefault();


        if (getEnvironment() === 3) { // MOCK
            // mock password safe 36IZe7pHb<p-

            uniLog("registration")
            setTimeout(() => { window.location.href = 'http://127.0.0.1:5501/features/homepage/homepage.html'; }, 2000);
        } else {
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
                name: nomeInput.value,
                surname: cognomeInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                course: facoltaInput.value,
                studentId: matricolaInput.value
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            };


            fetch('http://localhost:2024/UniSignMeUp/v2/createUser', options)
                .then(response => {
                    responseStatus = response.status;
                    return response.json()
                })
                .then(responseJson => {
                    if (responseStatus !== 200) {
                        uniErrorType(responseJson.errorType);
                        return;
                    } else {
                        localStorage.setItem('studentId', formData.studentId);
                        localStorage.setItem('email', formData.email);
                        localStorage.setItem('name', formData.name);
                        localStorage.setItem('surname', formData.surname);
                        localStorage.setItem('course', formData.course);

                        window.location.href = 'http://127.0.0.1:5501/features/homepage/homepage.html';
                    }
                })
                .catch(error => {
                    uniLog("GENRICO" + error.message)
                    uniErrorType(error.message);
                });


        };
    });

    //   });


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
        if (getEnvironment() === 3) { // MOCK
            // mock password safe 36IZe7pHb<p-
            uniLog("login")
            setTimeout(() => { window.location.href = 'http://127.0.0.1:5501/features/homepage/homepage.html'; }, 2000);


        } else {

            fetch(`http://localhost:2024/UniSignMeUp/v2/getUser?email=${email}&password=${password}`, options)
                .then(response => {
                    responseStatus = response.status;
                    return response.json()
                })

                .then(responseJson => {
                    uniLog("responseJson")
                    uniLog(responseJson)
                    if (responseStatus !== 200) {

                        uniErrorType(responseJson.errorType);
                        return;
                    } else {
                        uniLog("Memorizzazione utenza ...")
                        uniLog(responseJson.email)
                        localStorage.setItem('studentId', responseJson.studentId);
                        localStorage.setItem('email', responseJson.email);
                        localStorage.setItem('name', responseJson.name);
                        localStorage.setItem('surname', responseJson.surname);
                        localStorage.setItem('course', responseJson.course);
                        // Reindirizzamento alla homepage
                        window.location.href = 'http://127.0.0.1:5501/features/homepage/homepage.html';
                    }
                })
                .catch(error => {
                    uniLog("GENRICO" + error.message)
                    uniErrorType(error.message);
                });
        };

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

var appVersionString = document.createElement("p");
appVersionString.innerHTML = appVersion;
appVersionString.style = "bottom: 0 ;right:0;position:absolute;z-index: 9999; padding: 10px"
document.body.appendChild(appVersionString);
