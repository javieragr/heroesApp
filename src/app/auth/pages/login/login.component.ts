import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  
})
export class LoginComponent {

  private _auth:Auth| undefined;
  constructor( private router:Router, private authService:AuthService) { }

  login(){

    this.authService.login().subscribe(resp=> {
      console.log(resp);
      if (resp.id) {
        this.router.navigate(['./heroes']);
      }else{
        this.router.navigate(['./auth']);
      }
      
    })
    

  }
  

}
