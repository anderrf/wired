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

//create popup overlay

function addMarker({id, title, lat, lng}){
    const popup = L.popup({
        closeButton: false,
        className: 'map-popup',
        minWidth: 240,
        minHeight: 240
    })
    .setContent(`<a href="./complaint.html?id=${id}"><h3>${title}</h3></a>`);
    //.setContent(`${name}<a href="/orphanage?id=${id}" class="choose-orphanage"><img src="/images/arrow-white.svg"></a>`);

    //create and add marker

    L.marker([lat, lng], {icon})
        .addTo(map)
        .bindPopup(popup);
}

const complaintsSpan = document.querySelectorAll('.complaints span');
complaintsSpan.forEach(span => {
    const complaint = {
        id: span.dataset.id,
        title: span.dataset.title,
        lat: span.dataset.lat,
        lng: span.dataset.lng
    };
    addMarker(complaint);
});