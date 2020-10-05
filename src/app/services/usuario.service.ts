import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private colletionUser: string = "usuarios";

  constructor(
    private fireDB: AngularFirestore
  ) { }

  add(usuario: Usuario) {
    return this.fireDB.collection<Usuario>(this.colletionUser).add(
      {
        nome: usuario.nome,
        email: usuario.email,
        tel: usuario.tel,
        ativo: usuario.ativo,
        senha: usuario.senha
      }
    );
  }

}
