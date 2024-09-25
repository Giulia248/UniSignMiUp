
// global configurations 

const environment = "test" // could be "test" - "relase" - "mock"

function uniLog(log, urgent) { // log: string - urgent: bool

    switch (environment) {
        case "test":
            const icon = urgent ? "❗️" : "";
            console.log("[LOG]", icon, log);
            break;

        case "relase":
            // code block
            break;

        case "mock":
            console.log("[LOG]", icon, log);
            break;

        default:
        // code block
        break;
    }
}
