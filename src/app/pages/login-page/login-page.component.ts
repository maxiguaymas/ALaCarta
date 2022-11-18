import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm! : FormGroup;
  constructor(private formBuilder: FormBuilder,private router:Router,private loginService: LoginService) { }

  ngOnInit(): void {

    let token = sessionStorage.getItem('token');
    if(token){
      this.router.navigate(['home']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['',Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

  // submit del FormLogin
  submitLogin(){
    if(this.loginForm.valid){
      let {email,password} = this.loginForm.value;
      this.loginService.login(email,password).subscribe(
        {
          next: (response) => {
            if(response.token){
              sessionStorage.setItem('token',response.token);
              
              // location.reload();
              this.router.navigate(['home']);
            }
          },
          error: (error) => {
            Swal.fire({
              title:"Cuenta incorrecta. Ingresa los datos nuevamente",
              confirmButtonText: 'Aceptar',
            });
            this.loginForm.reset();
          }
        }
      )
    }
  }

}
