import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.component.html',
  styleUrls: ['./cadastro-usuarios.component.css'],
})
export class CadastroUsuariosComponent {
  //atributos
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';


  //método construtor
  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {}


  //criando um formulário para capturar os campos
  formCadastro = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      ),
    ]),
    senhaConfirmacao: new FormControl('', [Validators.required]),
  });


  //acessar as validações do formulário
  get form(): any {
    return this.formCadastro.controls;
  }


  //função para executar o cadastro
  onSubmit(): void {
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';


    if (
      this.formCadastro.value.senha == this.formCadastro.value.senhaConfirmacao
    ) {
      this.spinner.show();
      this.httpClient
        .post(environment.apiUsuarios + '/criar-conta', this.formCadastro.value)
        .subscribe({
          next: (data: any) => {
            //captura o retorno de sucesso
            this.mensagem_sucesso = `Parabéns, ${data.nome}, sua conta foi criada com sucesso!`;
            this.formCadastro.reset();
          },
          error: (e) => {
            //captura o retorno de erro
            this.mensagem_erro = e.error.message;
          },
        })
        .add(() => {
          this.spinner.hide();
        });
    } else {
      this.mensagem_erro = 'Senhas não conferem, por favor verifique.';
    }
  }
}




