import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LojaPerfilPage } from './loja-perfil.page';

describe('LojaPerfilPage', () => {
  let component: LojaPerfilPage;
  let fixture: ComponentFixture<LojaPerfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LojaPerfilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LojaPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
