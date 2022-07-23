import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private router:Router) { }

  ngOnInit(): void 
  {
    this.service.formModel.reset();
  }

  errorMessage?:string;
  onSubmit(){
    this.service.register().subscribe({
      next: (res:any) => {
        if(res.succeeded){
          this.service.formModel.reset();
        }
        else{
          res.errors.forEach((element: { code: any; }) => {
            switch (element.code) {
              case 'DuplicateUserName':
                alert("Username already taken!")
                break;
            
              default:
                alert("Registration Failed!")
                break;
            }
            
          });
        }
      },
      error: err => this.errorMessage=err
    })
  }

   
}
