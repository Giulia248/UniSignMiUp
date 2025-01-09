
// global configurations 

const environment = "mock" // could be "test - 1" - "relase - 2" - "mock - 3"

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

function getEnvironment() {
    switch (environment) {
        case "test": return 1;
        case "relase": return 2;
        case "mock": return 3;

    }
}