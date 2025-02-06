
// global configurations 

const environment = "test"; // could be "test - 1" - "relase - 2" - "mock - 3"

const appVersion = "version: 1.3";

function uniLog(log, urgent) { // log: string - urgent: bool
    const icon = urgent ? "❗️" : "";
    switch (environment) {

        case "test":

            console.log("[LOG]", icon, log);
            break;

        case "relase":
            // code block
            break;

        case "mock":
            console.log("[Mock] [LOG]", icon, log);
            break;

        default:
            // code block
            break;
    }
}

function uniErrorType(errorType) {
    switch (errorType) {
        case "001":
            alert("Mail non valida o non registrata");
            break;
        case "002":
            alert("Password errata");
            break;

            case "003":
            alert("Non è stato possibile cancellare la prenotazione, riprovare più tardi");
            break;

            case "004":
            alert("Non è stato possibile iscriversi, riprovare più tardi");
            break;

            case "005":
            alert("C'è stato un problema con la registrazione, riprovare più tardi");
            break;

            case "006":
            alert("C'è stato un problema con la modifica della password, riprovare più tardi");
            break;

            case "007":
            alert("Errore nel recupero delle informazioni");
            break;

            case "008":
            alert("Errore server interno 🤖");
            break;

            default:
                alert("ERRORE generico 🙁");  
    }
}

function getEnvironment() {
    switch (environment) {
        case "test": return 1;
        case "relase": return 2;
        case "mock": return 3;

    }
}