import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule,RouterModule,FooterComponent],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  constructor(private router:Router){}

isCollapsed = false;

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.router.navigate(['landingPage']);
  }

}
