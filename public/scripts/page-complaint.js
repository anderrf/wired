//create map

const complaintSpan = document.getElementById('complaintData');

const complaint = {
    lat: complaintSpan.dataset.lat, 
    lng: complaintSpan.dataset.lng
};

const map = L.map('mapid').setView([complaint.lat, complaint.lng], 20);

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
    //create and add marker

    L.marker([lat, lng], {icon})
        .addTo(map);
}

addMarker(complaint);