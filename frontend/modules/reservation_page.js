import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {

    let res = await fetch(`${config.backendEndpoint}/reservations/`);
    let reservationData = await res.json();
    return reservationData;
    
  } catch (error) {
    return null;
    
  }


  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 //console.log(reservations);
 
 let reservationTable = document.getElementById("reservation-table");
 
 if(reservations.length)
 {
  document.getElementById("reservation-table-parent").style.display = 'block';
  document.getElementById("no-reservation-banner").style.display ="none";
 }
 else{
  document.getElementById("no-reservation-banner").style.display ="block";
  document.getElementById("reservation-table-parent").style.display = 'none';
  
 }
 reservations.forEach(reservation => {
  let reservationDate = new Date(reservation.date);
  let yyyy = reservationDate.getFullYear();
  let mm = reservationDate.getMonth() + 1;
  let dd = reservationDate.getDate();
  let formatedDate = dd +"/" + mm +"/"+ yyyy;
  //time
  const event = new Date(reservation.time);
  let options = { year: 'numeric', month: 'long', day: 'numeric' };
  let reservationTime = event.toLocaleString().split(", ");
  //table
  let tableElement= document.createElement("tr");
  tableElement.innerHTML=`
  <td>${reservation.id}</td>
  <td>${reservation.name}</td>
  <td>${reservation.adventureName}</td>
  <td>${reservation.person}</td>
  <td>${formatedDate}</td>
  <td>${reservation.price}</td>
  <td>${event.toLocaleDateString('en-IN', options)}, ${reservationTime[1].toLocaleLowerCase()}</td>
  <td id=${reservation.id}><a href="../detail/?adventure=${reservation.adventure}"><button class="reservation-visit-button">Visit Adventure</button></a></td>`
  reservationTable.append(tableElement);



 });


}

export { fetchReservations, addReservationToTable };
