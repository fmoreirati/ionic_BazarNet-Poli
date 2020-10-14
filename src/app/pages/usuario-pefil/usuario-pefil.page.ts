import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-pefil',
  templateUrl: './usuario-pefil.page.html',
  styleUrls: ['./usuario-pefil.page.scss'],
})
export class UsuarioPefilPage implements OnInit {

  public id: string = null;
  public usuario: Usuario = new Usuario;
  public nome: string = "Usuário";

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router:Router
  ) { }

  ngOnInit() {
    this.verfUser();
  }


  async verfUser() {
    //this.id = this.activatedRoute.snapshot.paramMap.get("id");
    // if (this.id) {
    //   this.usuarioService.get(this.id).subscribe(
    //     res => {
    //       //this.usuario = new Usuario;
    //       this.usuario = res
    //       this.nome = res.nome;
    //     }
    //   )
    // }
    await this.usuarioService.auth.user.subscribe(
      res => {
        this.id = res.uid
        this.usuarioService.get(this.id).subscribe(
          res => {
            //this.usuario = new Usuario;
            this.usuario = res
            this.nome = res.nome;
          }
        )
      }
    )
  }

 
  logout(){
    this.usuarioService.auth.signOut().then(
      ()=> this.router.navigate(["/"])
    )
  }

}
