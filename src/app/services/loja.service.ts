import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import { Loja } from '../models/loja';
import { HttpClient } from '@angular/common/http';
import { Endereco } from '../models/endereco';


@Injectable({
  providedIn: 'root'
})
export class LojaService {

  private colletion: string = "lojas";

  constructor(
    private fireDB: AngularFirestore,
    private http: HttpClient
  ) { }

  add(loja: Loja) {
    return this.fireDB.collection(this.colletion).add(
      {
        nome: loja.nome,
        endereco: {
          cep:loja.endereco.cep,
          logradouro: loja.endereco.logradouro,
          bairro: loja.endereco.bairro,
          localidade: loja.endereco.localidade,
          uf: loja.endereco.uf
        },
        complemento: loja.complemento,
        numero: loja.numero,
        tel: loja.tel,
        ativo: loja.ativo,

        lat: loja.lat,
        lng: loja.lng
      }
    )
  }

  getAll() {
    return this.fireDB.collection<Loja>(this.colletion).snapshotChanges()
      .pipe(
        map(
          dados => dados.map(d => ({ id: d.payload.doc.id, ...d.payload.doc.data() }))
        )
      )
  }

  get(id: string) {
    return this.fireDB.collection(this.colletion).doc<Loja>(id).valueChanges();
  }

  update(loja: Loja, id: string) {
    return this.fireDB.collection(this.colletion).doc(id).update(loja);
  }

  remover(id: string) {
    return this.fireDB.collection(this.colletion).doc(id).delete();
  }

  getEndereco(cep: string) {
    return this.http.get<Endereco>("https://viacep.com.br/ws/" + cep + "/json/");
  }
}
