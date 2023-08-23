import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarsenhaUsuariosComponent } from './recuperarsenha-usuarios.component';

describe('RecuperarsenhaUsuariosComponent', () => {
  let component: RecuperarsenhaUsuariosComponent;
  let fixture: ComponentFixture<RecuperarsenhaUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecuperarsenhaUsuariosComponent]
    });
    fixture = TestBed.createComponent(RecuperarsenhaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
