import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel={
    UserName: '',
    Password:''
  }

  constructor(private service:UserService, private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')!=null){
      alert("You are Already Logged In!")
      this.router.navigate(['/home'])
    }
  }

  onSubmit(form:NgForm){
    this.service.login(form.value).subscribe({
      next: (res:any) => {
        localStorage.setItem('token',res.token);
        this.router.navigateByUrl('/home');
      },
      error: err => {
        if(err.status == 400){
          alert("Incorrect Username or Password");
        }
        else
        console.log(err);
      }
    }
    )
  }

}
