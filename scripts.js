const ctx = document.getElementById('probabilityChart').getContext('2d');
const probabilityChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Array.from({length: 16}, (_, i) => `Día ${i + 1}`),
        datasets: [{
            label: 'Probabilidad',
            data: [10, 10, 30, 40, 50, 80, 90, 80, 90, 90, 90, 80, 70, 60, 50, 40, 30],
            borderColor: '#4CAF50',
            fill: false,
            tension: 0.4
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const value = context.raw;
                        const recommendation = value > 50 ? 'Sembrar' : 'No sembrar';
                        document.getElementById('temperature').textContent = `${value}°C`;
                        document.getElementById('recommendation').textContent = recommendation;
                        return `Probabilidad: ${value}%`;
                    }
                }
            }
        }
    }
});
const today = new Date();
const getFecha = document.getElementsByClassName('form__fecha');
const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}` 
getFecha[0].textContent = date;
getFecha[0].classList.add('form__fecha');

const zona = document.getElementsByClassName('form__zona');
const region = document.getElementsByClassName('form__region');

const chartContainer = document.querySelector('.chart-container');
const info = document.querySelector('.info')
const ButtomForm = document.querySelector('.form__buttom');

const setData = (event) => {
    event.preventDefault();
    chartContainer.classList.remove('invisible');
    info.classList.remove('invisible');
}
ButtomForm.addEventListener('click', setData);


/**
* @license
* Copyright 2019 Google LLC. All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
// Initialize and add the map
let map;
let marker;
let latitude;
let longitude;
let geocoder;
async function initMap() {
  // The location of Uluru
  //const position = { lat: -17.789340, lng: -63.170793 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const { Geocoder } = await google.maps.importLibrary("geocoding");

  // Initialize the geocoder
  geocoder = new Geocoder();

  // The map, centered at an initial potition
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: -17.783892,lng: -63.180595 },
    mapId: "DEMO_MAP_ID",
  });
  // The marker, positioned at Uluru
map.addListener("click", (event) => {
    // Get the latitude and longitude from the click event
    latitude = event.latLng.lat();
    longitude = event.latLng.lng();

    // If the marker already exists, set its position
    if (marker) {
      marker.position = event.latLng;
    } else {
      // Otherwise, create a new marker
      marker = new AdvancedMarkerElement({
        map: map,
        position: event.latLng,
        title: "Selected Location",
      });
    }
    zona[0].value = `${latitude}, ${longitude}`;

    // Get the city name from the latitude and longitude
    getCityName(latitude, longitude);
    });
}

function getCityName(lat, lng) {
    const latlng = { lat: lat, lng: lng };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") {
        if (results && results.length > 0) {
          console.log("Geocode results: ", results); // Debugging line
          // Iterate through the results to find the appropriate address components
          for (let i = 0; i < results.length; i++) {
            const addressComponents = results[i].address_components;
            console.log("Address Components: ", addressComponents); // Debugging line
            const cityComponent = addressComponents.find(component => 
              component.types.includes("locality")
            );
  
            if (cityComponent) {
              const city = cityComponent.long_name;
              console.log("City: " + city);
              region[0].value = city;
              return; // Exit the loop once the city is found
            }
          }
          console.log("City not found in any address components");
          region[0].value = '';
        } else {
          console.log("No results found");
        }
      } else {
        console.log("Geocoder failed due to: " + status);
      }
    });
  }
initMap();
