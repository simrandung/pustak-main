import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/core/services/admin.service';
import { AdminCardsComponent } from 'src/app/shared/components/admin-cards/admin-cards.component';
import { Cart, UserOrder } from 'src/app/core/models/cart.model'; // Use your path

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [CommonModule, AdminCardsComponent],
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  isDarkMode = false;
  refreshCounter = 0;

  userOrders: UserOrder[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchOrders();

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

  fetchOrders() {
    this.adminService.getAllUserOrders().subscribe((res: UserOrder[]) => {
      this.userOrders = res;
    });
  }

  onOrderChange() {
    this.refreshCounter++;
    this.fetchOrders();
  }
}
