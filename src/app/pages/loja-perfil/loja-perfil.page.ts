import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { mapTo } from 'rxjs/operators';
import { Endereco } from 'src/app/models/endereco';
import { Loja } from 'src/app/models/loja';
import { LojaService } from 'src/app/services/loja.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-loja-perfil',
  templateUrl: './loja-perfil.page.html',
  styleUrls: ['./loja-perfil.page.scss'],
})
export class LojaPerfilPage implements OnInit {

  slideOpts = {
    slidesPerView: 3,
    slidesPerColumn: 1,
    slidesPerGroup: 3,
    watchSlidesProgress: true,
  }

  public id: string = null;
  public loja: Loja = new Loja;
  public preview: string = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private lojaService: LojaService,
    private router: Router,
    private camera: Camera,
    public msg: MessageService,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.verfLoja();
  }


  async verfLoja() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.lojaService.get(this.id).subscribe(
        res => {
          console.log(res);
          this.loja = res;
          this.preview = this.loja.galeria[this.loja.foto];
        }
      )
    }
  }

  tirarFoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.preview = 'data:image/jpeg;base64,' + imageData;

        console.log(this.loja);

        this.loja.galeria.push(this.preview);
        this.loja.foto = this.loja.galeria.length - 1;
        this.msg.presentLoading();
        this.lojaService.updatePhoto(this.id, this.loja.foto, this.loja.galeria).then(
          res => {
            console.log(res);
            this.msg.dismissLoading();
          }
        )
      }, (err) => {
        // Handle error
        console.log("Camera issue: " + err);
      }
    );
  }

  escolherFoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.preview = 'data:image/jpeg;base64,' + imageData;
        this.loja.galeria.push(this.preview);
        this.loja.foto = this.loja.galeria.length - 1;
        this.msg.presentLoading();
        this.lojaService.updatePhoto(this.id, this.loja.foto, this.loja.galeria).then(
          res => {
            console.log(res);
            this.msg.dismissLoading()
          }
        )
      }, (err) => {
        // Handle error
        console.log("Camera issue: " + err);
      }
    );
  }

  async alterarFoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Onde esta a foto?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.tirarFoto()
        }
      }, {
        text: 'Galeria',
        icon: 'image',
        handler: () => {
          this.escolherFoto()
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async opcaoFoto(index) {
    const actionSheet2 = await this.actionSheetController.create({
      header: 'O que fazer com a foto?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Definir como padrão',
        icon: 'image',
        handler: () => {

          this.msg.presentLoading();
          this.lojaService.updatePhoto(this.id, index, this.loja.galeria).then(
            res => {
              console.log(res);
              this.msg.dismissLoading()
            }
          )
        }
      }, {
        text: 'Apagar da Galeria',
        icon: 'trash',
        handler: () => {
          this.loja.foto = index <= this.loja.foto ? this.loja.foto - 1 : this.loja.foto;
          this.preview = this.loja.galeria[this.loja.foto];

          this.loja.galeria.splice(index, 1)

          this.msg.presentLoading();
          this.lojaService.updatePhoto(this.id, this.loja.foto, this.loja.galeria).then(
            res => {
              console.log(res);
              this.msg.dismissLoading()
            }
          )
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet2.present();
  }

}