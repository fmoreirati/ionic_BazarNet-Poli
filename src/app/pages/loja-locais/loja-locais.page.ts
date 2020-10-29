import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MouseEvent } from '@agm/core';

import { Loja } from 'src/app/models/loja';
import { LojaService } from 'src/app/services/loja.service';

@Component({
  selector: 'app-loja-locais',
  templateUrl: './loja-locais.page.html',
  styleUrls: ['./loja-locais.page.scss'],
})
export class LojaLocaisPage implements OnInit {

  //Maps
  public lat: number = -22.500;
  public lng: number = -46.500;
  public mapType = 'satellite';
  public zoom: number = 15;
  public title: string = "Minha localização";
  public clickable: boolean = true;
  public radius = 300;
  public draggable = true;

  //Lojas
  public loja: Loja = new Loja;
  public lojas: Loja[] = [];

  constructor(
    private geolocation: Geolocation,
    private lojaService: LojaService,
  ) { }

  ngOnInit() {
    this.getLocal();
    this.loadLojas();
  }

  getLocal() {
    this.geolocation.getCurrentPosition().then(
      (resp) => {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
        this.loja.lat = this.lat;
        this.loja.lng = this.lng;
      }
    ).catch((error) => {
      console.log('Error getting location', error);
    }
    );
  }

  onClick($event: MouseEvent) {
    console.log($event);
    this.loja.lat = $event.coords.lat;
    this.loja.lng = $event.coords.lng;

  }

  loadLojas() {
    this.lojaService.getAll().subscribe(
      res => {
        this.lojas = res
      }
    )
  }

  escolherLoja(index) {
    this.loja = this.lojas[index];
    this.lat = this.loja.lat;
    this.lng = this.loja.lng;
  }

}