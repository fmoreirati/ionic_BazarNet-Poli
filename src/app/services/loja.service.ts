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
    return this.enderecoService.add(loja.endereco).then(
      res => {
        return this.fireDB.collection(this.colletion).add(
          {
            nome: loja.nome,
            endereco:res.id,
            complemento: loja.complemento,
            numero: loja.numero,
            tel: loja.tel,
            ativo: loja.ativo,

            lat: loja.lat,
            lng: loja.lng
          }
        )
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


}
