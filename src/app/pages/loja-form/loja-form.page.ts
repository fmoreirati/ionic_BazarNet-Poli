import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Loja } from 'src/app/models/loja';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MessageService } from 'src/app/services/message.service';
import { LojaService } from 'src/app/services/loja.service';
import { Router } from '@angular/router';
import { EnderecoService } from 'src/app/services/endereco.service';
import { Endereco } from 'src/app/models/endereco';

@Component({
  selector: 'app-loja-form',
  templateUrl: './loja-form.page.html',
  styleUrls: ['./loja-form.page.scss'],
})
export class LojaFormPage implements OnInit {

  public loja: Loja = new Loja;
  public lat: number = 0;
  public lng: number = 0;
  public id: string;
  public cep: string;

  constructor(
    private geolocation: Geolocation,
    private msg: MessageService,
    private lojaService: LojaService,
    private enderecoService: EnderecoService,
    private router: Router
  ) {
  //  this.loja.endereco = new Endereco;
  }


  ngOnInit() {
    this.getLocal();
  }

  onSubmit(form) {
    this.loja.lat = this.lat;
    this.loja.lng = this.lng;

    if (form.valid) {
      this.msg.presentLoading()
      if (!this.id) {
        this.lojaService.add(this.loja).then(
          res => {
            console.log("Cadastrado!", res);
            form.reset();
            this.loja = new Loja; // this.lojas = []
            this.msg.presentAlert("Aviso", "Loja cadastrada!");
            this.msg.dismissLoading();
            this.router.navigate([""]);
          },
          err => {
            console.error("Erro:", err);
            this.msg.dismissLoading();
            this.msg.presentAlert("Erro:", "Loja não cadastrada!");
          }
        ).finally(
          () => this.msg.dismissLoading()
        )
      } else {
        this.lojaService.update(this.loja, this.id).then(
          res => {
            console.log("Atualizado!", res);
            form.reset();
            this.loja = new Loja;
            this.msg.presentAlert("Aviso", "loja atualizado!");
            this.msg.dismissLoading();
            this.router.navigate(["/tabs/lojaPerfil/", this.id]);
          },
          err => {
            console.error("Erro:", err);
            this.msg.dismissLoading();
            this.msg.presentAlert("Erro:", "loja não atualizado!");
          }
        )
      }
    }
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

  getCEP() {
    this.enderecoService.getEndereco(this.cep).subscribe(
      res => {
        if (res.erro) {
          this.msg.presentAlert("Erro", "CEP não localizado");
        } else {
          this.loja.endereco = res
        }
      },
        err => {
          this.msg.presentAlert("Erro", "Não foi possivel localizar o endereço!");
        }
    )
  }

  // buscaCEP() {
  //   this.enderecoService.buscaCEP(this.cep).subscribe(
  //     res => {
  //       this.loja.endereco = res[0]
  //     }
  //   )
  // }

}
