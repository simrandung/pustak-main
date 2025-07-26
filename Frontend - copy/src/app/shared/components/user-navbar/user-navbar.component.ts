import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit{
  dropdownOpen = false;
userEmail = '';
  constructor(private router:Router){}

  ngOnInit() {
  this.userEmail = localStorage.getItem('email') || 'user@example.com'; 
}

  toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}

logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  this.router.navigate(['/landingPage']);
}

}
