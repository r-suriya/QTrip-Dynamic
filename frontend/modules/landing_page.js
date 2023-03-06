import config from "../conf/index.js";

async function init() {
  console.log(config);
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let res = await fetch("http://13.126.248.132:8082/cities");
  let data = await res.json();
  console.log(data);
  return data;
    
  } catch (error) {
    return null;
  }
  

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let row = document.getElementById("data");
  let rowElement = document.createElement("div");
  rowElement.className="col-12 col-lg-3 col-sm-6 mb-4";
  console.log(image);
  rowElement.innerHTML= `<a href="pages/adventures/?city=${id}">
  <div class="tile">
  <img id=${id} src=${image}>
  <div class="tile-text text-center">
          <h5>${city}</h5>
          <p>${description}</p>
        </div>
        </div></a>`;
  row.append(rowElement);

  

}

export { init, fetchCities, addCityToDOM };
