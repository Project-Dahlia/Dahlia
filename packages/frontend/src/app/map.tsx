'use strict';

import * as L from 'leaflet';

class Map {
    private map: L.Map | undefined;
    private zoom: number =13;
    private mapEvent: L.Events | undefined;
    private marker: L.Marker[] = [];

    //get user position when run TODO -- and event?
    constructor() {
        this._getPosition();
    
        // collect data from storage api TODO

    }

    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),
                function () {
                    alert('Could not get your position');
                }
            );
        }
    }

    _loadMap(position: GeolocationPosition) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        //To test in Toronto:
        // console.log(`https://www.google.com/maps/@${latitude},${longitude}?entry=ttu`);
        
        const coords = [latitude, longitude];
        // Sets zoom level and map center
        this.map = L.map('map').setView(coords, this.zoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        //From Leaflet to click on map
        this.map.on('click', this._mapClick.bind(this));

        //render markers to map now map is loaded:
        // TODO
    }

    _renderEventData(){
        //TODO
    }

    _renderParkingData(){
        //TODO
    }

    _moveToPopup(e: L.LeafletMouseEvent){
        //TODO
        //move to the clicked popup
        // show form for change route / parking information here -- tbd
        
    }

    _mapClick(e: L.LeafletMouseEvent) {
        //TODO
    }
    
    _setMongoData(){
        //TODO
    }

    _getMongoData(){
        //TODO
    }


}