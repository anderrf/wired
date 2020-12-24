//create map

const map = L.map('mapid').setView([-24.093754, -46.618384], 16);

//create and add tilelayer

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
    /*{
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }*/)
    .addTo(map);

//create icon

const icon = L.icon({
        iconUrl: "../images/marker.svg",
        iconSize: [56, 68],
        iconAnchor: [29, 68],
        popupAnchor: [170, 2]
});

let marker;

//create and add marker
map.on('click', (event)=>{
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    document.getElementById('latLng').dataset.lat = lat;
    document.getElementById('latLng').dataset.lng = lng;
    //remove icon
    marker && map.removeLayer(marker);
    //add icon layer
    marker = L.marker([lat, lng], {icon})
        .addTo(map);
});