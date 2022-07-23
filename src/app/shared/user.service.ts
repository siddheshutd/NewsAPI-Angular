import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{HttpClient, HttpHeaders} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }

  readonly BaseUrl = 'http://localhost:25159/api';
  formModel = this.fb.group({
    UserName:['',Validators.required],
    Email:['',Validators.email],
    FullName:[''],
    Password:['',Validators.required],
    Passwords: this.fb.group({
      Password:['',[Validators.required,Validators.minLength(4)]],
      ConfirmPassword:['',[Validators.required,Validators.minLength(4)]]
    },{validator : this.comparePasswords})
    


  })

  comparePasswords(fb:FormGroup){
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if(confirmPswrdCtrl?.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors){
      if(fb.get('Password')?.value != confirmPswrdCtrl?.value){
        confirmPswrdCtrl?.setErrors({passwordMismatch: true});
      }
      else
      confirmPswrdCtrl?.setErrors(null) 
    }
  }

  register(){
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    }
    return this.http.post(this.BaseUrl+'/ApplicationUser/Register', body)
  }

  login(formData: any){
    return this.http.post(this.BaseUrl+'/ApplicationUser/Login', formData)
  }

  getuserprofile(){
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.BaseUrl+'/ApplicationUser/UserProfile', {headers:tokenHeader});
  }
}
