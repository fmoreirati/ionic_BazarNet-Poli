import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Endereco } from '../models/endereco';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private colletion: string = "enderecos";

  constructor(
    private fireDB: AngularFirestore,
    private http: HttpClient
  ) { }

  getEndereco(cep: string) {
    return this.http.get<Endereco>("https://viacep.com.br/ws/" + cep + "/json/");
  }

  add(endereco: Endereco) {
    return this.fireDB.collection<Endereco>(this.colletion).add(
      {
        id: null,
        cep: endereco.cep,
        logradouro: endereco.logradouro,
        bairro: endereco.bairro,
        localidade: endereco.localidade,
        uf: endereco.uf,
        erro:endereco.erro
      }
    )
  }

  getAll() {
    return this.fireDB.collection<Endereco>(this.colletion).snapshotChanges()
      .pipe(
        map(
          dados => dados.map(d => ({ id: d.payload.doc.id, ...d.payload.doc.data() }))
        )
      )
  }

  get(id: string) {
    return this.fireDB.collection(this.colletion).doc<Endereco>(id).valueChanges();
  }

  update(loja: Endereco, id: string) {
    return this.fireDB.collection(this.colletion).doc(id).update(loja);
  }

  remover(id: string) {
    return this.fireDB.collection(this.colletion).doc(id).delete();
  }

  buscaCEP(cep: string) {
    return this.fireDB.collection<Endereco>(this.colletion, query => query.orderBy('cep').startAt(cep).startAt(cep)).snapshotChanges()
      .pipe(
        map(
          dados => dados.map(d => ({ id: d.payload.doc.id, ...d.payload.doc.data() }))
        )
      )
  }
}
