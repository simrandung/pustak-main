import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { Cart } from '../models/cart.model';
import { User } from '../models/user.model';
import { UserOrder } from '../models/cart.model';

import { TotalOrdersResponse } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8000/api'

  constructor(private http: HttpClient) { }

  getTopBooks(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.baseUrl}/top-books`);
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books`);
  }
  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getTotalOrders(): Observable<TotalOrdersResponse> {
  return this.http.get<TotalOrdersResponse>(`${this.baseUrl}/total-orders`);
}
deleteUserByEmail(email: string) {
  return this.http.delete(`${this.baseUrl}/users/email/${email}`);
}
getAllUserOrders(): Observable<UserOrder[]> {
  return this.http.get<UserOrder[]>(`${this.baseUrl}/admin/user-orders`);
}


}
