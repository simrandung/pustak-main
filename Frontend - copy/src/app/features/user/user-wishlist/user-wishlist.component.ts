import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { BookService } from 'src/app/core/services/book.service';
import { Wishlist } from 'src/app/core/models/wishlist.model';
import { Book } from 'src/app/core/models/book.model';
import { UserNavbarComponent } from 'src/app/shared/components/user-navbar/user-navbar.component';


@Component({
  selector: 'app-user-wishlist',
  standalone: true,
  imports: [CommonModule, FormsModule, UserNavbarComponent],
  templateUrl: './user-wishlist.component.html',
  styleUrls: ['./user-wishlist.component.css'],
})
export class UserWishlistComponent implements OnInit {
  wishlist: Wishlist[] = [];
  books: Book[] = [];
  searchText = '';
  notifications = 2;

  constructor(
    private userService: UserService,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.userService.getWishlist().pipe(
        map((res: any) => Array.isArray(res.wishlist) ? res.wishlist : [])
      ),
      this.bookService.getAllBooks()
    ]).subscribe(([wishlistItems, books]) => {
      this.books = books;
      this.wishlist = wishlistItems.map((item: any) => {
        const match = books.find(b => b.id === item.book_id);
        return {
          ...item,
          price: match?.price || 0,
          author: match?.author || '',
          cover_image: match?.cover_image || '',
          in_stock: match?.in_stock || false
        };
      });
    });
  }

  removeFromWishlist(book: Wishlist) {
    this.userService.removeFromWishlist(book.book_id).subscribe(() => {
      this.wishlist = this.wishlist.filter((b) => b.book_id !== book.book_id);
    });
  }

  addToCart(book: Wishlist) {
    if (!book.in_stock) {
      alert(`Sorry! "${book.title}" is out of stock.`);
      return;
    }
    this.userService.addToCart(book).subscribe(() => {
      alert(`"${book.title}" added to cart.`);
    });
  }

  logout() {
    this.router.navigate(['landingPage']);
  }

}
