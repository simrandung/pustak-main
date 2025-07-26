import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/core/services/admin.service';
import { User } from 'src/app/core/models/user.model';
import { AdminCardsComponent } from "src/app/shared/components/admin-cards/admin-cards.component";

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, AdminCardsComponent],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  isDarkMode = false;
  users: User[] = [];
  refreshCounter = 0;


  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchUsers();
    const theme = localStorage.getItem('hs_theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      this.isDarkMode = true;
    }

    
  }

  toggleDarkMode() {
    const html = document.documentElement;
    this.isDarkMode = html.classList.contains('dark');

    if (this.isDarkMode) {
      html.classList.remove('dark');
      localStorage.setItem('hs_theme', 'light');
      this.isDarkMode = false;
    } else {
      html.classList.add('dark');
      localStorage.setItem('hs_theme', 'dark');
      this.isDarkMode = true;
    }
  }

  fetchUsers() {
    this.adminService.getAllUsers().subscribe((res: User[]) => {
      this.users = res.filter(user => user.role !== 'admin');
    });
  }

 deleteUser(email: string) {
  if (confirm(`Are you sure you want to delete user with email ${email}?`)) {
    this.adminService.deleteUserByEmail(email).subscribe(() => {
      this.users = this.users.filter(user => user.email !== email);
      this.refreshCounter++; // Trigger refresh in AdminCardsComponent
    });
  }
}



}
