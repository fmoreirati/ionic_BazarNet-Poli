import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-loja-locais',
  templateUrl: './loja-locais.page.html',
  styleUrls: ['./loja-locais.page.scss'],
})
export class LojaLocaisPage implements OnInit {

  public lat: number = -22.500;
  public lng: number = -46.500;
  public mapType = 'satellite';
  public zoom: number = 15;
  public title: string = "Minha localização";
  public clickable:boolean = true; 
  public radius = 300;
  public draggable = true;

  constructor(
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
    this.getLocal();
  }

  getLocal() {
    this.geolocation.getCurrentPosition().then(
      (resp) => {
        this.lat = resp.coords.latitude
        this.lng = resp.coords.longitude
      }
    ).catch((error) => {
      console.log('Error getting location', error);
    }
    );
  }

}
