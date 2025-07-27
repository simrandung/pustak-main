import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from './book.service';
import { Book } from '../models/book.model';
import { Cart } from '../models/cart.model';
import { Wishlist } from '../models/wishlist.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  book = [];
  price = [];
  private BASE_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private service: BookService) { }

  getAllBooks(): Observable<Book[]> {
    return this.service.getAllBooks();
  }

  addToWishlist(book: Wishlist): Observable<Wishlist[]> {
    return this.http.post<Wishlist[]>(`${this.BASE_URL}/wishlist/add`, book);
  }

  removeFromWishlist(book: any): Observable<Wishlist[]> {
    return this.http.delete<Wishlist[]>(`/api/wishlist/remove/${book.book_id}`);
  }

  addToCart(book: any): Observable<Cart[]> {

    return this.http.post<Cart[]>(`${this.BASE_URL}/cart/add`, book);
  }

  getCart(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.BASE_URL}/cart`);

  }

  getWishlist(): Observable<Wishlist[]> {
    return this.http.get<Wishlist[]>(`${this.BASE_URL}/wishlist`);
  }
  updateCart(book: any): Observable<Cart[]> {
    return this.http.put<Cart[]>(`${this.BASE_URL}/cart/update`, book);
  }

  removeFromCart(title: string): Observable<Cart[]> {
    return this.http.put<Cart[]>(`${this.BASE_URL}/cart/remove`, { title });
  }

checkoutCart(): Observable<any> {
  return this.http.post(`${this.BASE_URL}/checkout`, {});
}



  clearCart(): Observable<Cart[]> {
    return this.http.put<Cart[]>(`${this.BASE_URL}/cart/clear`, {});
  }





}
