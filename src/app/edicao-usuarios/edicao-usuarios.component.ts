import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edicao-usuarios',
  templateUrl: './edicao-usuarios.component.html',
  styleUrls: ['./edicao-usuarios.component.css'],
})
export class EdicaoUsuariosComponent implements OnInit {
  //atributos
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  //construtor
  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  //função executada no momento em que a página abre
  ngOnInit(): void {
    const auth = localStorage.getItem('auth_usuario');
    const data = JSON.parse(auth as string);
    this.formEdicao.controls.nome.setValue(data.nome);
  }

  //formulário para edição do usuário
  formEdicao = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    senha: new FormControl('', [
      Validators.pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      ),
    ]),
    senhaConfirmacao: new FormControl('', []),
  });

  //acessar as validações do formulário
  get form(): any {
    return this.formEdicao.controls;
  }

  //função para realizar a edição dos dados
  onSubmit(): void {
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

    if (this.formEdicao.value.senha == this.formEdicao.value.senhaConfirmacao) {
      this.spinner.show();

      //capturando o token do usuário autenticado
      const auth = localStorage.getItem('auth_usuario');
      const data = JSON.parse(auth as string);

      const httpHeaders: HttpHeaders = new HttpHeaders({
        Authorization: 'Bearer ' + data.accessToken,
      });

      this.httpClient
        .put(
          environment.apiUsuarios + '/atualizar-dados',
          this.formEdicao.value,
          { headers: httpHeaders }
        )
        .subscribe({
          next: (data: any) => {
            this.mensagem_sucesso = `Parabéns ${data.nome}, dados atualizados com sucesso.`;
            this.formEdicao.controls.senha.setValue('');
            this.formEdicao.controls.senhaConfirmacao.setValue('');
          },
          error: (e) => {
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



