import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard {


    //método construtor
    constructor(
        private router: Router
    ) {
    }


    //método para verificar se a rota
    //pode ser acessada ou não
    canActivate() {
       
        //verificar se existe um usuário autenticado na local storage
        const auth = localStorage.getItem('auth_usuario');
        if(auth != null) {
            //capturar os dados e verificar se o token existe e não expirou
            const data = JSON.parse(auth);
            if(data.accessToken != null) { //verificando se o token existe
                const dataHoraAtual = new Date(); //data atual
                const dataHoraExpiracao = new Date(data.dataHoraExpiracao as Date);
                return dataHoraAtual <= dataHoraExpiracao; //verificando se o token não expirou
            }
            else{
                //apagar os dados da local storage
                localStorage.removeItem('auth_usuario');
                this.router.navigate(['/login-usuarios']);
                return false;
            }
        }
        else {
            this.router.navigate(['/login-usuarios']);
            return false;
        }
    }
}


