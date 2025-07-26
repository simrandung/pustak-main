import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { AdminService } from 'src/app/core/services/admin.service';
import { User } from 'src/app/core/models/user.model';
import { AdminCardsComponent } from "src/app/shared/components/admin-cards/admin-cards.component";

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NgChartsModule, AdminCardsComponent],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  isDarkMode = false;

  donutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
  };

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  donutChartType: ChartType = 'doughnut';
  barChartType: ChartType = 'bar';

  topBooks: any[] = [];

  // Hardcoded top selling table
  public topSellingBooks = [
    { title: 'Clean Code', quantitySold: 120 },
    { title: 'Atomic Habits', quantitySold: 95 },
    { title: 'Ikigai', quantitySold: 87 },
    { title: 'The Secrets', quantitySold: 60 },
    { title: 'The Alchemist', quantitySold: 57 }
  ];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadTopBooks(); // for charts
    this.checkTheme();
  }

  loadTopBooks() {
    this.adminService.getTopBooks().subscribe((books) => {
      this.topBooks = books;

      const labels = books.map((b: any) => b.title);
      const data = books.map((b: any) => b.quantity);

      this.donutChartData = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: ['#898AC4', '#A2AADB', '#FFCE56', '#4BC0C0', '#9966FF']
          }
        ]
      };

      this.barChartData = {
        labels: labels,
        datasets: [
          {
            label: 'Quantity Sold',
            data: data,
            backgroundColor: '#898AC4'
          }
        ]
      };
    });
  }

 

  checkTheme() {
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
}
