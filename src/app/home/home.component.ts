import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userDetails:any={};
  constructor(private service: UserService,private router:Router) { }

  ngOnInit(): void {
    this.onShowdetails();
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(["/user/login"]);
  }

  onShowdetails(){
    this.service.getuserprofile().subscribe({
      next: (res:any) => 
      {
        this.userDetails = res;
      },
        error: err => 
        {
          alert(err);
        },
      }   
    );
      
    
  }


}
