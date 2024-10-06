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
async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });
  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });
}
initMap();