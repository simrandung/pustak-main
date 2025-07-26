import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from 'src/app/core/services/book.service';
import { FormsModule } from '@angular/forms';
import { AdminService } from 'src/app/core/services/admin.service';
import { User } from 'src/app/core/models/user.model';
import { AdminCardsComponent } from "src/app/shared/components/admin-cards/admin-cards.component";

@Component({
  selector: 'app-manage-books',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminCardsComponent],
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent implements OnInit {
  books: any[] = [];
  newBook = { book_id: '', title: '', author: '', price: '', cover_image: '' }
editingBook: any = null;


  isDarkMode = false
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

  constructor(private bookService: BookService, private adminService: AdminService) { }
  ngOnInit(): void {
    this.loadBooks();


    const theme = localStorage.getItem('hs_theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      this.isDarkMode = true;
    }

  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe((data) => {
      this.books = data;

    })
  }

 addBook() {
  if (this.editingBook) {
    this.bookService.updateBook(this.editingBook.id, this.newBook).subscribe(() => {
      this.newBook = { book_id: '', title: '', author: '', price: '', cover_image: '' };
      this.editingBook = null;
      this.loadBooks();
    });
  } else {
    this.bookService.addBook(this.newBook).subscribe(() => {
      this.newBook = { book_id: '', title: '', author: '', price: '', cover_image: '' };
      this.loadBooks();
    });
  }
}

editBook(book: any) {
  this.editingBook = book;
  this.newBook = { ...book };
}

  deleteBook(id: string) {
    this.bookService.deleteBook(id).subscribe(() =>
      this.loadBooks());
  }

  // updateBook(id: string, book: any) {
  //   this.bookService.updateBook(id, book).subscribe(() => {

  //     this.loadBooks();
  //   })

  // }
  // loadUsers(){
  //   this.bookService.getAllUsers().subscribe((data)=>{
  //     this.users = data;

  //   })
  // }



}
