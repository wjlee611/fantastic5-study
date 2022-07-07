function GeoOk(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    
}
function GeoNo() {
    alert("Can't find you. No weather for you");
}
navigator.geolocation.getCurrentPosition(GeoOk,GeoNo);