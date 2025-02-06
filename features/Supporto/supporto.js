


fetch('http://localhost:2024/UniSignMeUp/v1/debugService', {
    method: 'OPTIONS'
})
.catch(error => {
    uniLog ("GENRICO" + error.message)
    uniErrorType(error.message) ;
 });

uniLog("debugService called", true)