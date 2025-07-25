import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent {
  constructor(private router:Router){}

  logout(){
    this.router.navigate(['landingPage'])

  }

}
