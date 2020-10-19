import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  public quantUsers: number = 0;

  constructor(
    public usuarioService: UsuarioService
  ) {

  }

  ngOnInit(): void {
    this.usuarioService.getAll().subscribe(
      res => this.quantUsers = res.length
    )
  }

}
