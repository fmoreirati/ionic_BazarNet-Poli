import { Component, OnInit } from '@angular/core';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';


@Component({
  selector: 'app-lojas-locais',
  templateUrl: './lojas-locais.page.html',
  styleUrls: ['./lojas-locais.page.scss'],
})
export class LojasLocaisPage implements OnInit {

  map: GoogleMap;

  constructor() { }

  ngOnInit() {
    //this.loadMap();
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){
    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);
  }
}
