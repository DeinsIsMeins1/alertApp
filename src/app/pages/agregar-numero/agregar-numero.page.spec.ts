import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarNumeroPage } from './agregar-numero.page';

describe('AgregarNumeroPage', () => {
  let component: AgregarNumeroPage;
  let fixture: ComponentFixture<AgregarNumeroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarNumeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
