import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { forkJoin, map } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { BookService } from 'src/app/core/services/book.service';
import { CheckoutDialogComponent } from '../checkout-dialog/checkout-dialog.component';
import { Cart } from 'src/app/core/models/cart.model';
import { Book } from 'src/app/core/models/book.model';
import { Router, RouterModule } from '@angular/router';

interface CartItems {
  title: string;
  quantity: number;
  price: number;
  image?: string;
  author?: string;
}

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  cart: CartItems[] = [];
  subtotal = 0;
  tax = 0;
  total = 0;
  // searchText = '';
  // filteredBooks: Book[] = [];
  books: Book[] = [];
  notifications = 2;

  private dialog = inject(MatDialog);
  private userService = inject(UserService);
  private bookService = inject(BookService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.fetchCartWithBookDetails();
  }

  fetchCartWithBookDetails() {
    forkJoin([
      this.userService.getCart().pipe(
        map((response: any) => Array.isArray(response) ? response : response.cart || [])
      ),
      this.bookService.getAllBooks()
    ]).subscribe(([cartItems, books]) => {
      this.books = books;
      this.cart = cartItems.map((item: any) => {
        const match = books.find(b => b.title === item.title);
        return {
          ...item,
          price: match?.price || 0,
          image: match?.cover_image || '',
          author: match?.author || ''
        };
      });
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.subtotal = this.cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    this.tax = Math.round(this.subtotal * 0.05); // 5% tax
    this.total = this.subtotal + this.tax;
  }

  increaseQty(book: CartItems) {
    book.quantity += 1;
    this.userService.updateCart({ title: book.title, quantity: book.quantity }).subscribe(() => {
      this.calculateTotal();
    });
  }

  decreaseQty(book: CartItems) {
    if (book.quantity > 1) {
      book.quantity -= 1;
      this.userService.updateCart({ title: book.title, quantity: book.quantity }).subscribe(() => {
        this.calculateTotal();
      });
    }
  }
removeFromCart(book: CartItems) {
  this.userService.removeFromCart(book.title).subscribe(() => {
    this.cart = this.cart.filter(item => item.title !== book.title);
    this.calculateTotal();
  });
}

goBack() {
  this.router.navigate(['user']);
}


  checkout() {
    if(this.total === 0){
      alert("Your cart is empty")
    }
    else{ 
  const dialogRef = this.dialog.open(CheckoutDialogComponent);

  dialogRef.afterClosed().subscribe(() => {
    // Reset the cart after dialog is closed
    this.cart = [];
    this.subtotal = 0;
    this.tax = 0;
    this.total = 0;

    // Optionally, clear cart on backend too
    this.userService.clearCart().subscribe(() => {
      console.log('Cart cleared on backend');
    });
  });


    }
  }

  // searchBooks() {
  //   const term = this.searchText.toLowerCase();
  //   this.filteredBooks = this.books.filter(book =>
  //     book.title.toLowerCase().includes(term)
  //   );
  // }

  logout() {
    this.router.navigate(['landingPage']);
  }
}
