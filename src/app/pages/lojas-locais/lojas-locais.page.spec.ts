import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LojasLocaisPage } from './lojas-locais.page';

describe('LojasLocaisPage', () => {
  let component: LojasLocaisPage;
  let fixture: ComponentFixture<LojasLocaisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LojasLocaisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LojasLocaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
