import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from './_guards/authentication.guard';


import { AppComponent } from './app.component';
import { CadastroProdutosComponent } from './cadastro-produtos/cadastro-produtos.component';
import { ConsultaProdutosComponent } from './consulta-produtos/consulta-produtos.component';
import { EdicaoProdutosComponent } from './edicao-produtos/edicao-produtos.component';
import { LoginUsuariosComponent } from './login-usuarios/login-usuarios.component';
import { CadastroUsuariosComponent } from './cadastro-usuarios/cadastro-usuarios.component';
import { EdicaoUsuariosComponent } from './edicao-usuarios/edicao-usuarios.component';
import { RecuperarsenhaUsuariosComponent } from './recuperarsenha-usuarios/recuperarsenha-usuarios.component';


//mapeamento das rotas de navegação do projeto
const routes: Routes = [
  { path : '', pathMatch : 'full', redirectTo : 'login-usuarios' }, /* página raiz */
  { path : 'login-usuarios', component: LoginUsuariosComponent },
  { path : 'cadastro-usuarios', component: CadastroUsuariosComponent },
  { path : 'edicao-usuarios', component: EdicaoUsuariosComponent, canActivate: [AuthenticationGuard] },
  { path : 'recuperarsenha-usuarios', component: RecuperarsenhaUsuariosComponent },
  { path : 'cadastro-produtos', component: CadastroProdutosComponent, canActivate: [AuthenticationGuard] },
  { path : 'consulta-produtos', component: ConsultaProdutosComponent, canActivate: [AuthenticationGuard] },
  { path : 'edicao-produtos/:id', component: EdicaoProdutosComponent, canActivate: [AuthenticationGuard] }
];


@NgModule({
  declarations: [
    AppComponent,
    CadastroProdutosComponent,
    ConsultaProdutosComponent,
    EdicaoProdutosComponent,
    LoginUsuariosComponent,
    CadastroUsuariosComponent,
    EdicaoUsuariosComponent,
    RecuperarsenhaUsuariosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), //registrando as rotas
    HttpClientModule, //registrando a bilbioteca HTTPCLIENT
    BrowserAnimationsModule, //biblioteca para animações
    NgxSpinnerModule, //biblioteca do componente spinner
    FormsModule, //formulários reativos
    ReactiveFormsModule //formulários reativos
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }




