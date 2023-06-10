window.onload = () => {
    navigator.geolocation.getCurrentPosition(userLocation);
};

function userLocation(position) {
    let userLat = position.coords.latitude;
    let userLng = position.coords.longitude;
    console.log(userLat + " " + userLng);
}