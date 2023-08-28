import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
 
  //atributos
  isAuthenticated: boolean = false;


  nomeUsuario: string = '';
  emailUsuario: string = '';


  //método executado antes do componente abrir
  ngOnInit(): void {
    //ler o conteudo da local storage
    const data = localStorage.getItem('auth_usuario');
    //verificando se existe um usuário autenticado
    if (data != null) {
      this.isAuthenticated = true;
      //ler os dados do usuário
      this.nomeUsuario = JSON.parse(data).nome;
      this.emailUsuario = JSON.parse(data).email;
    }
  }


  //função para fazer o logout do usuário
  logout(): void {
    if (window.confirm('Deseja realmente sair do sistema?')) {
      //apagar os dados da local storage
      localStorage.removeItem('auth_usuario');
      //redirecionar para a página de login do sistema
      window.location.href = '/login-usuarios';
    }
  }
}




