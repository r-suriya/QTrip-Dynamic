import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  //console.log(search);
  let params = new URLSearchParams(search);
  let adventureId = params.get('adventure');


  // Place holder for functionality to work in the Stubs
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {

    let res = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    let data = await res.json();
    //console.log(data);
    return data;
    
  } catch (error) {
    return null;
    
  }


  // Place holder for functionality to work in the Stubs
  //return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let parentDiv = document.getElementById("photo-gallery");
  //Title
  let titleDiv = document.getElementById("adventure-name");
  titleDiv.innerHTML = adventure.name;

  //Subtitle
  let subtitleDiv = document.getElementById("adventure-subtitle");
  subtitleDiv.innerHTML = adventure.subtitle;


  //Images
  adventure.images.forEach(image => {
    let childDiv = document.createElement("div");
    //childDiv.className("");
    childDiv.innerHTML=`
    <div>
    <img class="activity-card-image" src=${image}>
    </div>`
    parentDiv.append(childDiv);

  });

  //content
  let contentDiv = document.getElementById("adventure-content");
  contentDiv.innerHTML= adventure.content;


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let carousel = document.getElementById("photo-gallery");

  carousel.innerHTML=`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
  </div>
  <div class="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;

let carouselImageParent = document.getElementsByClassName("carousel-inner")[0];
let carouselButtonParent = document.getElementsByClassName("carousel-indicators")[0];
let count =0;
 images.forEach(image => {
  let carouselImageChild = document.createElement("div");
  carouselImageChild.className ="carousel-item";
  carouselImageChild.innerHTML=`
  <img src=${image} class="d-block w-100 activity-card-image">
`;

//console.log(carouselImageChild, carouselImageParent);

//button

//let carouselButtonChild = document.createElement("button");
carouselButtonParent.innerHTML+=`<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${count}" aria-label="Slide ${count + 1}"></button>`;
if(count == 0){
  carouselButtonParent.getElementsByTagName("button")[0].className ="active";
  carouselImageChild.setAttribute('class','carousel-item active');
  

}
console.log(carouselButtonParent);

carouselImageParent.append(carouselImageChild);


count++;


  
 });


}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let soldOutPanel = document.getElementById("reservation-panel-sold-out");
  let reservationPanel = document.getElementById("reservation-panel-available");
  if(adventure.available)
  {
    soldOutPanel.style.display ="none";
    reservationPanel.style.display ="block";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  }
  else{
    soldOutPanel.style.display ="block";
    reservationPanel.style.display ="none";
  }
  
  


}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalCost = document.getElementById("reservation-cost");
  totalCost.innerHTML = adventure.costPerHead * persons;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let formElement = document.getElementById("myForm");
  formElement.addEventListener("submit", (event) =>{
    event.preventDefault();
    let formData = new FormData(formElement);
    //let data = Object.fromEntries(formData);
    let reservationData ={
      name: formData.get('name'),
      date: formData.get('date'),
      person: formData.get('person'),
      adventure: adventure.id
    }
    //data.adventure= adventure.id;
    console.log(reservationData);

    fetch(`${config.backendEndpoint}/reservations/new`, {
      method: 'POST' ,
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reservationData)

    }).then(res => {
      if(res.ok) {
        alert("Success!");
        location.reload();
      }
      else {
        alert("Failed!");
      }
      return res.json();
    })

  });
  
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved)
  {
    document.getElementById("reserved-banner").style.display='block';
  }
  else{
    document.getElementById("reserved-banner").style.display='none';
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
