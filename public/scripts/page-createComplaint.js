//create map

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

var locationLock = false;

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

let marker;

//create and add marker
map.on('click', (event) => {
    setMapMarker(event.latlng.lat, event.latlng.lng)
});

function setMapMarker(lat, lng){
    if(!locationLock){
        setCoords(lat, lng);
        //remove icon
        marker && map.removeLayer(marker);
        //add icon layer
        marker = L.marker([lat, lng], {icon})
            .addTo(map);
    }
}

//Set lat and lng on form inputs

function setCoords(lat, lng){
    document.getElementById('lat').value = lat;
    document.getElementById('lng').value = lng;
}

document.getElementById('btnGetMapLocation').addEventListener('click', () => {
    if(!locationLock){
        locationLock = true;
    }
});

document.getElementById('btnGetDeviceLocation').addEventListener('click', () => {
    if(!locationLock){
        const latLng = getPosition();
        setCoords(latLng[0], latLng[1]);
        setMapMarker(latLng[0], latLng[1]);
        locationLock = true;
    }
});

document.getElementById('createComplaintForm').addEventListener('submit', (ev) => {
    ev.preventDefault()
});

document.getElementById('btnCreateComplaint').addEventListener('click', () => {
    if(locationLock){
        document.getElementById('createComplaintForm').submit();
    }
});