import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/core/services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})

export class UserCartComponent implements OnInit{

  cart: any[]=[]
  books: any[] = [];
  filteredBooks: any[] = [];
  searchText = '';

  constructor(private userService: UserService, private router: Router ){}

  ngOnInit(): void {
    this.userService.getCart().subscribe((res)=>{
      this.cart = res;
      console.log(res);
      

    })
  }

  searchBooks() {
    const term = this.searchText.toLowerCase();
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(term)
    );
  }
  logout(){
    this.router.navigate(['landingPage']);
  }


}
