import * as THREE from 'three';
import * as THREEx from './node_modules/@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';

window.onload = () => {
    navigator.geolocation.getCurrentPosition(userLocation);
};

function userLocation(position) {
    let userLat = position.coords.latitude;
    let userLng = position.coords.longitude;
    console.log(userLat + " " + userLng);
}