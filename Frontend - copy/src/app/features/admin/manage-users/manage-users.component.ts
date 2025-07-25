import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  books: any[] = []
  users: any[] = []
  isDarkMode = false

  constructor(private bookservice: BookService) { }
  ngOnInit(): void {
    this.loadBooks();
    const theme = localStorage.getItem('hs_theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      this.isDarkMode = true;
    }

  }

  loadBooks() {
    this.bookservice.getAllBooks().subscribe((data) => {
      this.books = data;
    })
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
