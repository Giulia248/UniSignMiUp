// values

var dateSelected;
var responseStatus;
// user info
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
};


if (getEnvironment() === 3) { // MOCK


  uniLog("getInfo")
  setTimeout(() => {

    fetch("http://127.0.0.1:5501/core/service/models/mock/user.json")
      .then(res => res.json())
      .then(responseJson => {
        // Access the JSON data and update HTML content
        document.getElementById('nome').innerText = responseJson.name;
        document.getElementById('email').innerText = responseJson.email;
      })

  }, 2500);

} else {

  document.getElementById('name').innerText = localStorage.getItem("name");
  document.getElementById('email').innerText = localStorage.getItem("email");
  document.getElementById('course').innerText = localStorage.getItem("course");
};

if (getEnvironment() === 3) {
  setTimeout(() => {

    fetch("http://127.0.0.1:5501/core/service/models/mock/getReservations.json")
      .then(res => res.json())
      .then(responseJson => {

        const roomList = document.getElementById('roomList');

        // Clear existing content
        roomList.innerHTML = '';

        // Loop through each object in the JSON data array
        responseJson.forEach(item => {

          // Create list item element
          const listItem = document.createElement('li');

          const date = new Date(item.dateTime);

          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
          const year = date.getFullYear();

          const formattedDate = `${day}-${month}-${year}`;

          // Populate list item with JSON data
          listItem.innerHTML = `
              <strong>Esame:</strong> <span>${item.examName}</span><br>
              <strong>Corso di Studi:</strong> <span>${item.course}</span><br>
              <strong>Sede:</strong> <span>${item.location}</span><br>
              <strong>Giorno:</strong> <span>${formattedDate}</span>
              <input type="button" id="roomListBtn" class="roomListBtn ${item.idExam}" value="Cancella prenotazione">
              
          `;

          // Append list item to the room list
          roomList.appendChild(listItem);

          document.querySelectorAll(".roomListBtn").forEach(button => {
            console.log(button.classList);

            if (button.classList[1] === `${item.idExam}`) {
              button.addEventListener("click", function (event) {
                event.preventDefault();
                deleteReservation(item.idExam);
                return;
              });
            }

          });

        });

      })


  }, 2500);
}
else {
  // reservations
  fetch(`http://localhost:2024/UniSignMeUp/v3/getExams?studentId=${localStorage.getItem("studentId")}`, options)

    .then(response => {

      responseStatus = response.status;
      return response.json()
    })
    .then(responseJson => {


      if (responseStatus !== 200) {
        uniErrorType(responseJson.errorType);
        return;
      }
      else {

        const roomList = document.getElementById('roomList');

        // Clear existing content

        roomList.innerHTML = '';
        const data = responseJson.examData;

        // Loop through each object in the JSON data array
        data.forEach(item => {

          const listItem = document.createElement('li');
          const date = new Date(item.dateTime)
          const minutes = (date.getMinutes() === 0) ? "00" : date.getMinutes();

          const dateString = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " Ore: " + date.getHours() + ":" + minutes;
          // Populate list item with JSON data
          listItem.innerHTML = `
             <strong>Esame:</strong> <span>${item.examName}</span><br>
              <strong>Sede:</strong> <span>${item.location}</span><br>
              <strong>Giorno:</strong> <span>${dateString}</span>
              <input type="button" id="roomListBtn" class="roomListBtn ${item.idexam}" value="Cancella prenotazione">
            
        `;

          // Append list item to the room list
          roomList.appendChild(listItem);

          document.querySelectorAll(".roomListBtn").forEach(button => {

            if (button.classList[1] === `${item.idexam}`) {
              button.addEventListener("click", function (event) {
                event.preventDefault();
                deleteReservation(item.idexam);
                return;
              });
            }

          });

        });
      };
    })
    .catch(error => {
      uniLog("GENRICO" + error.message)
      uniErrorType(error.message);
    });

};

// delete reservation call
function deleteReservation(idexam) {

  var confirmed = window.confirm("Sei sicuro di voler cancellare la prenotazione?");

  // Check if the user clicked "OK"
  if (confirmed) {

    fetch(`http://localhost:2024/UniSignMeUp/v2/deleteExam?idexam=${idexam}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Include any other headers as needed
      },
    })
      .then(response => {

        responseStatus = response.status;
        return response.json()
      })
      .then(responseJson => {
        if (responseStatus !== 200) {
          uniErrorType(responseJson.errorType);
          return;
        }
        else {
          alert("Prenotazione completata con successo");
          location.reload();
        }
      })
      .catch(error => {
        uniLog("GENRICO" + error.message)
        uniErrorType(error.message);
      });
  }

}

// SIDEBAR TOGGLE

let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
}


