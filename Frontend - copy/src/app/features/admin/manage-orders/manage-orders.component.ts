import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  books: any[] = []
  users: any[] = []
  isDarkMode = false

  constructor(private bookService: BookService){}

  ngOnInit(): void {
    this.loadBooks();
    const theme = localStorage.getItem('hs_theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      this.isDarkMode = true;
    
  }
}

  loadBooks(){
    this.bookService.getAllBooks().subscribe((data)=>{
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