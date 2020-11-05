import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import { Loja } from '../models/loja';
import { HttpClient } from '@angular/common/http';
import { Endereco } from '../models/endereco';
import { EnderecoService } from './endereco.service';


@Injectable({
  providedIn: 'root'
})
export class LojaService {

  private colletion: string = "lojas";

  constructor(
    private fireDB: AngularFirestore,
    private enderecoService: EnderecoService,
    private http: HttpClient
  ) { }

  add(loja: Loja) {
    return this.fireDB.collection(this.colletion).add(
      {
        nome: loja.nome,
        complemento: loja.complemento,
        numero: loja.numero,
        tel: loja.tel,

        foto: loja.foto ? loja.foto : null,
        galeria: loja.galeria ? loja.galeria : null,

        ativo: loja.ativo,

        enderecoPrincipal: null,//Seleciona o endereco principal da colection Endereco na loja. Isso será selecionado posteriormente.
        endereco: <Endereco>loja.endereco, //Grava o objeto no item no formarto Json;

        lat: loja.lat,
        lng: loja.lng
      }
    ).then(
      res => {
        this.fireDB.collection(this.colletion).doc(res.id).collection("enderecos").add(<Endereco>loja.endereco).then(
          res => {
            loja.enderecoPrincipal = res.id;//Só atribui mas não atualizei o banco de dados;
          }
        );
      }
    )
  }

  getAll() {
    return this.fireDB.collection<Loja>(this.colletion).snapshotChanges()
      .pipe(
        map(
          dados => dados.map(d => ({ id: d.payload.doc.id, ...d.payload.doc.data() }))
        )
      );
  }

  getAllEnderecos(key:string) {
    return this.fireDB.collection(this.colletion).doc(key).collection<Endereco>("enderecos").snapshotChanges()
      .pipe(
        map(
          dados => dados.map(d => ({ id: d.payload.doc.id, ...d.payload.doc.data() }))
        )
      );
  }

  get(id: string) {
    return this.fireDB.collection(this.colletion).doc<Loja>(id).valueChanges();
  }

  getEndereco(lojaid: string, Enderecoid:string) {
    return this.fireDB.collection(this.colletion).doc(lojaid).collection("endereco").doc(Enderecoid).valueChanges();
  }

  update(loja: Loja, id: string) {
    return this.fireDB.collection(this.colletion).doc(id).update(loja);
  }

  remover(id: string) {
    return this.fireDB.collection(this.colletion).doc(id).delete();
  }

  updatePhoto(id: string, index: number, fotos: string[]) {
    return this.fireDB.collection(this.colletion).doc(id).update({
      galeria: fotos,
      foto: index
    })
  }

}
