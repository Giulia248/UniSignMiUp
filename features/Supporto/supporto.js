


fetch('http://localhost:2024/UniSignMeUp/v1/debugService', {
    method: 'OPTIONS'
})
.catch(error => console.error('Error:', error));

uniLog("debugService called", true)