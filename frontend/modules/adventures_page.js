
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  let params = new URLSearchParams(search);
  let city = params.get("city");
  //console.log(city);
  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {

    let res = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    let data = await res.json();
    //console.log(data);
    return data;
    
  } catch (error) {
    return null;
    
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  console.log(adventures);
  let bodyElement = document.getElementById("data");
  adventures.forEach(adventure => {
    let divElement = document.createElement("div");
    divElement.className ="col-12 col-lg-3 col-sm-6 mb-4";
    divElement.innerHTML = `<a id=${adventure.id} href="detail/?adventure=${adventure.id}"> 
    <div class="card activity-card">
    <div class="category-banner">${adventure.category}</div>
    <img id=${adventure.id} src=${adventure.image}>
    <div class="d-flex justify-content-between p-2 w-100 flex-column flex-lg-row align-items-center">
            <div><h5>${adventure.name}</h5></div>
            <div>${adventure.currency} ${adventure.costPerHead}</div>
    </div>
    <div class="d-flex justify-content-between p-2 w-100 flex-column flex-lg-row align-items-center">
            <div><h5>Duration</h5></div>
            <div>${adventure.duration}Hours</div>
    </div>
    </div>
    </a>`;
    bodyElement.append(divElement);
    //console.log(adventures[0].image);
    
  });


}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList =[];
  for(let i=0;i< list.length; i++)
  {
    if(list[i].duration >= low && list[i].duration <= high) {
      filteredList.push(list[i]);
      console.log(list[i]);
    }
    
  }
  console.log(filteredList);

  return filteredList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList=[];
  categoryList.forEach(categoryIn => {
    for(let i=0; i< list.length; i++)
    {
      if(list[i].category === categoryIn)
      filteredList.push(list[i]);
    }
  });
  console.log(filteredList);
  return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  //console.log(filters.category,filters.duration);


  
  if(filters.category.length)
  list=filterByCategory(list,filters.category);

  if(filters.duration.length)
  {
    let [low, high] = filters.duration.split("-");
    //console.log(low);
    console.log(list);
    list = filterByDuration(list,low,high);
  }
  
  




  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem('filters', JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filterData = JSON.parse(window.localStorage.getItem('filters'));



  // Place holder for functionality to work in the Stubs
  return filterData;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  let parentDiv = document.getElementById("category-list");
  filters.category.forEach(element => {
    let childDiv = document.createElement("div");
    childDiv.innerHTML=`<div class="category-filter">${element}</div>`;
    parentDiv.append(childDiv);
  });

  let durationFilter = document.getElementById("duration-select");
  durationFilter.value = filters.duration;

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
