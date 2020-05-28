import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalTab1Component } from './modal-tab1.component';

describe('ModalTab1Component', () => {
  let component: ModalTab1Component;
  let fixture: ComponentFixture<ModalTab1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTab1Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalTab1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
