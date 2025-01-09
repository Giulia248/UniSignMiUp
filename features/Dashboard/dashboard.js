// values

var dateSelected
// user info
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
};


fetch("http://localhost:3000/getInfo", options)
  .then(response => response.json())
  .then(responseJson => {
    // Access the JSON data and update HTML content
    document.getElementById('nome').innerText = responseJson.name;
    document.getElementById('email').innerText = responseJson.email;
  })
  .catch(error => console.error('Error fetching data:', error));



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
            <strong>Aula:</strong> <span>${item.roomType}</span><br>
            <strong>Indirizzo sede:</strong> <span>${item.address}</span><br>
            <strong>Giorno:</strong> <span>${formattedDate}</span>
            <input type="button" id="roomListBtn" class="roomListBtn ${formattedDate}" value="Cancella prenotazione">
            
        `;

      // Append list item to the room list
      roomList.appendChild(listItem);

      document.querySelectorAll(".roomListBtn").forEach(button => {
        console.log(button.classList);

        if (button.classList[1] === `${formattedDate}`) {
          button.addEventListener("click", function (event) {
            event.preventDefault();
            deleteReservation(item.date);
            return;
          });
        }

      });

    });

  })
  .catch(error => console.error('C`è stato un problema:', error));



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


