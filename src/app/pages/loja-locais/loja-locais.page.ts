import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
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
  public clickable:boolean = true; 
  public radius = 300;
  public draggable = true;
  public location: Location;

  //Lojas
  public lojas:Loja[]=[];

  constructor(
    private geolocation: Geolocation,
    private lojaService:LojaService,
  ) { }

  ngOnInit() {
    this.getLocal();
    this.lojaService.getAll().subscribe(
      res=>{
        this.lojas = res
      }
    )
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

  onClick(event){
    console.log(event);
    
  }
}
