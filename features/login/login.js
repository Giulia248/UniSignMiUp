

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

 //   document.addEventListener('DOMContentLoaded', function () { ?????? che ci faceva quii?
        document.getElementById("signUp").addEventListener("click", function (event) {
            event.preventDefault();
            

            if (getEnvironment() === 3) { // MOCK
                // mock password safe 36IZe7pHb<p-
                
                uniLog("registration")
                setTimeout(() => {  window.location.href = 'http://127.0.0.1:5501/features/homepage/homepage.html'; }, 2000);
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

             
                fetch('http://localhost:2024/UniSignMeUp/v1/createUser', options)
                    .then(data => {
                        if (!data.ok) {
                            alert("Errore nella registrazione");
                            throw Error(data.status);
                        }


                        window.location.href = 'http://127.0.0.1:5501/features/homepage/homepage.html';
                        return data.json();
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
            setTimeout(() => {  window.location.href = 'http://127.0.0.1:5501/features/homepage/homepage.html'; }, 2000);

            
        } else {

            fetch(`http://localhost:2024/UniSignMeUp/v1/getUser?email=${email}&password=${password}`, options)
            .then(response => response.json())
            .then(responseJson => {
                    if (!responseJson.name === "" || responseJson.name === null ) {
                        alert(responseJson.status);
                        if (responseJson.status == 401) {
                            alert("password errata");
                            return;
                        } else if (responseJson.status == 500) {
                            alert("Email non valida o non registrata");
                            return;
                        }
                    } else {
                        
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
                    uniLog("Login js Error", true);
                    uniLog(error.message, true);
                });
        };

    });
});
