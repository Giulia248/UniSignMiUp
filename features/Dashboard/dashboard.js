// values

var dateSelected
// user info
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
};


//fetch("../services/contributors.JSON")
//.then(res => res.json())
//.then(data => console.log(data))

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


    uniLog("localstorage");
    uniLog(localStorage.getItem("name"));
    document.getElementById('name').innerText = localStorage.getItem("name");
    document.getElementById('email').innerText = localStorage.getItem("email");



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
fetch("http://localhost:3000/getReservations", options)

  .then(response => response.json())
  .then(responseJson => {

    const roomList = document.getElementById('roomList');

    // Clear existing content
    roomList.innerHTML = '';

    // Loop through each object in the JSON data array
    responseJson.forEach(item => {

      // Create list item element
      const listItem = document.createElement('li');

      const date = new Date(item.date);

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
  .catch(error => console.error('C`è stato un problema:', error));

};

// delete reservation call
function deleteReservation(data) {

  var confirmed = window.confirm("Sei sicuro di voler cancellare la prenotazione?");

  // Check if the user clicked "OK"
  if (confirmed) {

    fetch(`http://localhost:3000/deleteReservation?date=${data}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Include any other headers as needed
      },
    })
      .then(response => {
        if (response.status === 500) {
          alert("Qualcosa è andato storto...");
          throw new Error('Qualcosa è andato storto');
        }
        // Handle successful response
        alert("Prenotazione cancellata!");
        console.log('DELETE request successful');
        location.reload();
      })
      .catch(error => {
        console.error('C`è stato un problema :', error);
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


