window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = 'X';
    navigator.geolocation.getCurrentPosition(userLocation);
};

function loadPlaces(latitude, longitude) {
    return [{
        name: 'Pokémon',
        location: {
            lat: latitude,
            lng: longitude,
        },
    }, ];
};

function userLocation(position) {
    let userLat = position.coords.latitude;
    let userLng = position.coords.longitude;
    main(userLat, userLng);
}

function main(userLat, userLng) {
    let places = loadPlaces(userLat, userLng);
    console.log(places)
    renderPlaces(places);
};

var models = [{
        url: 'https://martascorreia.github.io/ARjs_LocationBased/assets/magnemite/scene.gltf',
        scale: '0.4 0.4 0.4',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 0 0',
        position: "0 0 -40"
    },
    {
        url: 'https://martascorreia.github.io/ARjs_LocationBased/assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 0 0',
        info: 'Articuno, Lv. 80, HP 100/100',
        position: "0 -15 -50"
    },
    {
        url: 'https://martascorreia.github.io/ARjs_LocationBased/assets/dragonite/scene.gltf',
        scale: '0.04 0.04 0.04',
        rotation: '0 0 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
        position: "0 -3 -20"
    },
];

var modelIndex = 0;
var setModel = function(model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;
        console.log(latitude + " " + longitude)

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        setModel(models[modelIndex], model);

        document.querySelector('button[data-action="change"]').addEventListener('click', function() {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}