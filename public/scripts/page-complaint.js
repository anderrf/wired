//create map

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function getPosition(){
    let location = [-24.093754, -46.618384];//default location
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            location = [position.coords.latitude, position.coords.longitude]
        },
        (error) => {
            console.log(error);
            location = [-24.093754, -46.618384];
        }, 
        options);
    }
    else{
        location = [-24.093754, -46.618384];
    }
    return location;
}

const map = L.map('mapid').setView(getPosition(), 20);

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

const complaintSpan = document.getElementById('complaintData');
const complaint = {
    lat: complaintSpan.dataset.lat, 
    lng: complaintSpan.dataset.lng
};
addMarker(complaint);