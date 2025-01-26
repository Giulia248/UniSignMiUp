$(function () {
    const examSchedule = {
        'matematica-continua': {
            '2025-01-10': '10:00',
            '2025-01-20': '09:30',
            '2025-03-15': '11:00'
        },
        'matematica-discreta': {
            '2025-02-05': '14:00',
            '2025-03-10': '09:00',
            '2025-04-15': '16:00'
        },
        'programmazione': {
            '2025-01-11': '09:00',
            '2025-02-25': '11:30',
            '2025-04-01': '13:00'
        },
        'architettura': {
            '2025-01-15': '09:30',
            '2025-03-20': '14:30',
            '2025-04-25': '10:00'
        },
        'diritto-penale': {
            '2025-02-20': '13:30',
            '2025-03-30': '09:00',
            '2025-05-10': '14:00'
        },
        'cybersecurity': {
            '2025-01-12': '15:00',
            '2025-03-01': '10:00',
            '2025-04-20': '11:30'
        },
        'web-mobile': {
            '2025-02-18': '09:00',
            '2025-03-25': '10:30',
            '2025-05-05': '14:30'
        },
        'algoritmi-strutture-dati': {
            '2025-01-20': '08:30',
            '2025-03-18': '10:00',
            '2025-04-30': '12:00'
        },
        'sistemi-operativi-i': {
            '2025-02-28': '13:00',
            '2025-04-07': '09:30',
            '2025-05-12': '15:00'
        },
        'sistemi-operativi-ii': {
            '2025-01-22': '10:30',
            '2025-03-22': '13:00',
            '2025-04-27': '16:30'
        },
        'basi-di-dati': {
            '2025-02-02': '09:30',
            '2025-03-12': '11:00',
            '2025-05-05': '13:30'
        },
        'reti-calcolatori': {
            '2025-01-18': '14:00',
            '2025-03-23': '09:30',
            '2025-05-08': '10:30'
        },
        'crittografia': {
            '2025-02-14': '09:00',
            '2025-04-05': '12:30',
            '2025-06-01': '14:00'
        },
        'statistica': {
            '2025-01-19': '13:00',
            '2025-03-17': '09:00',
            '2025-05-07': '11:00'
        },
        'computer-forensics': {
            '2025-01-19': '10:30',
            '2025-03-22': '12:00',
            '2025-05-12': '14:30'
        },
        'sicurezza-sistemi': {
            '2025-02-11': '14:30',
            '2025-04-04': '09:00',
            '2025-06-15': '11:30'
        },
        'architetture-software': {
            '2025-01-26': '09:30',
            '2025-03-24': '10:00',
            '2025-05-13': '15:00'
        },
        'etica-informatica': {
            '2025-02-06': '08:30',
            '2025-03-29': '12:00',
            '2025-05-02': '09:00'
        },
        'sicurezza-sistemi-informativi': {
            '2025-01-30': '11:30',
            '2025-03-16': '10:00',
            '2025-04-30': '14:00'
        },
        'software-sicuro': {
            '2025-02-10': '09:00',
            '2025-03-13': '10:30',
            '2025-05-01': '12:00'
        },
        'sistemi-biometrici': {
            '2025-01-17': '09:00',
            '2025-03-09': '13:30',
            '2025-05-14': '14:30'
        },
        'sicurezza-web-mobile': {
            '2025-02-12': '14:30',
            '2025-04-11': '09:00',
            '2025-06-18': '11:30'
        },
        'stage-finale': {
            '2025-02-20': '09:30',
            '2025-03-28': '10:00',
            '2025-05-24': '11:30'
        }
    };

    const userEmail = localStorage.getItem("email")
    $('#email').val(userEmail);

    $('#exam-name').on('change', function () {
        const selectedExam = $(this).val();
        const dateSelect = $('#date-select');
        const timeSelect = $('#time-select');

        dateSelect.empty().append('<option value="" disabled selected>Seleziona una data</option>');
        timeSelect.empty().append('<option value="" disabled selected>Seleziona un orario</option>');

        if (selectedExam && examSchedule[selectedExam]) {
            const availableDates = Object.keys(examSchedule[selectedExam]);
            availableDates.forEach(function (date) {
                dateSelect.append(`<option value="${date}">${date}</option>`);
            });
        }
    });

    $('#date-select').on('change', function () {
        const selectedExam = $('#exam-name').val();
        const selectedDate = $(this).val();
        const timeSelect = $('#time-select');

        timeSelect.empty().append('<option value="" disabled selected>Seleziona un orario</option>');

        if (selectedExam && selectedDate && examSchedule[selectedExam][selectedDate]) {
            const availableTime = examSchedule[selectedExam][selectedDate];
            timeSelect.append(`<option value="${availableTime}">${availableTime}</option>`);
        }
    });

    // Funzione per generare il PDF
    function generatePDF(exam, date, time, location, email) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.text("Dettagli Prenotazione Esame", 10, 10);
        doc.text(`Esame: ${exam}`, 10, 20);
        doc.text(`Data: ${date}`, 10, 30);
        doc.text(`Orario: ${time}`, 10, 40);
        doc.text(`Luogo: ${location}`, 10, 50);
        doc.text(`Email: ${email}`, 10, 60);

        doc.save(`Prenotazione_${exam}_${date}.pdf`);
    }

    $('#bookButton').on('click', function () {
        const selectedExam = $('#exam-name').val();
        const selectedDate = $('#date-select').val();
        const selectedTime = $('#time-select').val();
        const location = $('#location').val();  // Aggiungi il campo del luogo
        const userEmail = $('#email').val();

        if (selectedExam && selectedDate && selectedTime && location) {
            // Mostra la conferma
            const confirmMessage = `Vuoi confermare l'iscrizione all'esame ${selectedExam}?`;
            const confirmed = confirm(confirmMessage);

            if (confirmed) {

                const idExam = localStorage.getItem("studentId") + selectedExam.length;
                const dateTime =  selectedDate + " " + selectedTime;
                
                var formData = {
                    idexam: idExam,
                    studentId: localStorage.getItem("studentId"),
                    examName: selectedExam,
                    location: location,
                    dateTime: dateTime,
                    course: localStorage.getItem("course")
                };

                uniLog("form data")
                uniLog(formData)

                const options = {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                  };

                fetch("http://localhost:2024/UniSignMeUp/v1/createExam", options)
                    .then(response => {
                        if (response.status === 200) {
                            alert("Esame prenotato!");

                            // Genera il PDF con i dettagli dell'esame prenotato
                            generatePDF(selectedExam, selectedDate, selectedTime, location, userEmail);
            
                            // Reset campi
                            $('#exam-name').val('');
                            $('#location').val('Seleziona il luogo');
                            $('#date-select').empty().append('<option value="" disabled selected>Seleziona una data</option>');
                            $('#time-select').empty().append('<option value="" disabled selected>Seleziona un orario</option>');
                        };
                     });

            } else {
                uniLog("Not confirmed")
                // Mantiene i dati scelti se l'utente sceglie "No"
                alert("Puoi ancora modificare i dati.");
            }
        } else {
            alert('Per favore, compila tutti i campi richiesti.');
        }
    });

    $('#homeButton').on('click', function () {
        window.location.href = 'http://127.0.0.1:5501/features/homepage/homepage.html'; // Assicurati che il percorso sia corretto
    });
});



