import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-edicao-produtos',
  templateUrl: './edicao-produtos.component.html',
  styleUrls: ['./edicao-produtos.component.css'],
})
export class EdicaoProdutosComponent implements OnInit {
  //atributos
  mensagem: string = '';


  //método construtor
  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) {}


  //função executada quando o componente é aberto
  ngOnInit(): void {
    //capturar o ID enviado na URL
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    //exibindo o ngx-spinner
    this.spinner.show();
    //consultando os dados do produto na API
    this.httpClient
      .get(environment.apiProdutos + '/' + id)
      .subscribe({
        //capturando a resposta obtida da API
        next: (data: any) => {
          //preenchendo o formulário com os dados do produto
          this.formEdicao.patchValue(data);
        },
      })
      .add(() => {
        this.spinner.hide();
      });
  }


  //objeto para capturar o formulário de edição de produtos
  formEdicao = new FormGroup({
    /* campo 'id'  */
    id: new FormControl(''), //campo oculto
    /* campo 'nome' */
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    /* campo 'preco' */
    preco: new FormControl('', [Validators.required, Validators.min(1)]),
    /* campo: 'quantidade' */
    quantidade: new FormControl('', [Validators.required, Validators.min(1)]),
  });


  //função para exibir as mensagens de erro
  //de validação para cada campo do formulário
  get form(): any {
    return this.formEdicao.controls;
  }


  //função para capturar o submit do formulário
  onSubmit(): void {
    //exibir o componente do ngx-spinner
    this.spinner.show();
    //acessando o endpoint de cadastro de produto da API
    this.httpClient
      .put(environment.apiProdutos, this.formEdicao.value)
      .subscribe({
        //capturado o retorno da API
        next: (data: any) => {
          //exibindo mensagem de sucesso
          this.mensagem = `Produto ${data.nome}, atualizado com sucesso.`;
        },
      })
      .add(() => {
        //fechando o componente ngx-spinner
        this.spinner.hide();
      });
  }
}





