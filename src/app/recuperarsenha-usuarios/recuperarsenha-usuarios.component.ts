import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-recuperarsenha-usuarios',
  templateUrl: './recuperarsenha-usuarios.component.html',
  styleUrls: ['./recuperarsenha-usuarios.component.css'],
})
export class RecuperarsenhaUsuariosComponent {
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';


  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {}


  //criando um formulário para capturar os campos
  formRecuperacaoDeSenha = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });


  //acessar as validações do formulário
  get form(): any {
    return this.formRecuperacaoDeSenha.controls;
  }


  //função para capturar o submit do formulário
  onSubmit(): void {
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';


    this.spinner.show();


    this.httpClient
      .post(
        environment.apiUsuarios + '/recuperar-senha',
        this.formRecuperacaoDeSenha.value
      )
      .subscribe({
        next: (data: any) => {
          this.mensagem_sucesso = `Parabéns ${data.nome}, sua recuperação de senha foi realizada com sucesso. Verifique seu email.`;
          this.formRecuperacaoDeSenha.reset();
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




