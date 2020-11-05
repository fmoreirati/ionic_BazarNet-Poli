import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';

import { Usuario } from 'src/app/models/usuario';
import { MessageService } from 'src/app/services/message.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { finalize } from 'rxjs/operators';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.page.html',
  styleUrls: ['./usuario-form.page.scss'],
})
export class UsuarioFormPage implements OnInit {

  public id: string = null;
  public usuario: Usuario = new Usuario;
  public conf: string = "";

  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private msg: MessageService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.usuarioService.get(this.id).subscribe(
        res => {
          this.usuario = res
        }
      )
    }
  }

  onSubmit(form) {
    //console.log(this.usuario);
    console.log(form);
    if (form.valid) {
      this.msg.presentLoading()
      if (!this.id) {
        this.usuarioService.add(this.usuario).then(
          res => {
            console.log("Cadastrado!", res);
            form.reset();
            this.usuario = new Usuario; // this.usuarios = []
            this.msg.presentAlert("Aviso", "Usuario cadastrado!");
            this.msg.dismissLoading();
            this.router.navigate([""]);
          },
          err => {
            console.error("Erro:", err);
            this.msg.dismissLoading();
            this.msg.presentAlert("Erro:", "Usuario não cadastrado!");
          }
        ).finally(
          () => this.msg.dismissLoading()
        )
      } else {
        this.usuarioService.update(this.usuario, this.id).then(
          res => {
            console.log("Atualizado!", res);
            form.reset();
            this.usuario = new Usuario;
            this.msg.presentAlert("Aviso", "Usuario atualizado!");
            this.msg.dismissLoading();
            this.router.navigate(["/tabs/usuarioPerfil/", this.id]);
          },
          err => {
            console.error("Erro:", err);
            this.msg.dismissLoading();
            this.msg.presentAlert("Erro:", "Usuario não atualizado!");
          }
        )
      }
    }

  }

  public uploadPercent: any;
  public downloadURL: any;

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = "img/" + "foto" + new Date(); //crypto.AES.encrypt("foto", "nada").toString();
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL())
    )
      .subscribe()
  }
}
