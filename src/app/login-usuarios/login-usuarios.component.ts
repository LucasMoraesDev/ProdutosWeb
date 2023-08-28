import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login-usuarios',
  templateUrl: './login-usuarios.component.html',
  styleUrls: ['./login-usuarios.component.css'],
})
export class LoginUsuariosComponent {
  mensagem_erro: string = '';


  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {}


  //criando um formulário para capturar os campos
  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      ),
    ]),
  });


  //acessar as validações do formulário
  get form(): any {
    return this.formLogin.controls;
  }


  //função para capturar o submit do formulário
  onSubmit(): void {
    this.mensagem_erro = '';
    this.spinner.show();


    this.httpClient
      .post(environment.apiUsuarios + '/autenticar', this.formLogin.value)
      .subscribe({
        next: (data: any) => {
          //salvar os dados obtidos na local storage do navegador
          localStorage.setItem('auth_usuario', JSON.stringify(data));
          //redirecionar para a página de consulta de produtos
          window.location.href = '/consulta-produtos';
        },
        error: (e) => {
          this.mensagem_erro = e.error.message;
        },
      })
      .add(() => {
        this.spinner.hide();
      });
  }
}




