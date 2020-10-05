import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.page.html',
  styleUrls: ['./usuario-form.page.scss'],
})
export class UsuarioFormPage implements OnInit {

public usuario:Usuario = new Usuario;
public conf:string = "";

  constructor(
    private usuarioService: UsuarioService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  onSubmit(form){
    //console.log(this.usuario);
    console.log(form);
    if (form.valid){
      this.usuarioService.add(this.usuario).then(
        res=>{
          console.log("Cadastrado!", res);
          this.presentAlert("Aviso", "Usuario cadastrado!");
        },
        err=>{
          console.error("Erro:", err);
          this.presentAlert("Erro:", "Usuario não cadastrado!");
        }
      )
    }
  }

  async presentAlert(tipo:string, texto:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: tipo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });

    await alert.present();
  }
}
