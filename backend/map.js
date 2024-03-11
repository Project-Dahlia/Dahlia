'use strict';
import React, {userState, useEffect} from 'react';
import L from 'leaflet';


class Map {
    #map;
    #zoom =13;
    #mapEvent;
    #marker = [];

    //get position on run
    constructor() {
        //get user position
        this._getPosition();

        //collects data from storage api TODO

    }

    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
                alert('Could not get your position');
            });
        }
    }

    _loadMap(position) {
        const {latitude} = position.coords;
        const {longitude} = position.coords;

        const coords = [latitude, longitude];

        // Sets zoom level and map center
        this.#map = L.map('map').setView(coords, this.#zoom);

        L.TileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.#map);

        //From Leaflet to click on map
        this.#map.on('click', this._mapClick.bind(this));

        
    }
    _renderEvent() {
        //TODO -- get info from service api
    }

    _renderParking() {
        //TODO -- Toronto 2016 data
    }

    _moveToPopUp(e) {
        //take the closest html class related to the event -- may need to revamp with react instead of html
        //TODO
    }

    _setMongoData() {
        //TODO
    }

    _getMongoData() {
        //TODO
    }

    reset(){
        //TODO
    }


}