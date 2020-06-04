import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { ModalTabComponent } from './modal-tab.component';
import { CommonModule } from '@angular/common';

describe('ModalTabComponent', () => {
  let component: ModalTabComponent;
  let fixture: ComponentFixture<ModalTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTabComponent ],
      imports: [IonicModule.forRoot(), CommonModule, BrowserModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
