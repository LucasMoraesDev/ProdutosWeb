import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoUsuariosComponent } from './edicao-usuarios.component';

describe('EdicaoUsuariosComponent', () => {
  let component: EdicaoUsuariosComponent;
  let fixture: ComponentFixture<EdicaoUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdicaoUsuariosComponent]
    });
    fixture = TestBed.createComponent(EdicaoUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
