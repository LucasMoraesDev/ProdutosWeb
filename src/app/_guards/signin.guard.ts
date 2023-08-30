import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class SigninGuard {


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
            this.router.navigate(['/consulta-produtos']);
            return false;
        }
        else {
            return true;
        }
    }
}


