import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/core/services/user.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserNavbarComponent } from 'src/app/shared/components/user-navbar/user-navbar.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,UserNavbarComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit{
  books: any[] = [];
  filteredBooks: any[] = [];


  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {

    this.userService.getAllBooks().subscribe(res => {
      this.books = res;
      this.filteredBooks = res;
      
    });
  }


  addToCart(book: any) {
    this.userService.addToCart(book).subscribe(() => {
      alert(`"${book.title}" added to cart.`);
    });
  }

  addToWishlist(book: any) {
    this.userService.addToWishlist(book).subscribe(() => {
      alert(`"${book.title}" added to wishlist.`);
    });
  }

  logout(){
    this.router.navigate(['landingPage']);
  }

  cart(){
    this.router.navigate(['user/cart']);
  }
  wishlist(){
    this.router.navigate(['user/wishlist']);
    
  }
  
flippedCards: { [key: number]: boolean } = {};

toggleFlip(index: number) {
  this.flippedCards[index] = !this.flippedCards[index];
}


}
