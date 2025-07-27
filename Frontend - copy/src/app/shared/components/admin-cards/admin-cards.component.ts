import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';
import { User } from 'src/app/core/models/user.model';
import { Book } from 'src/app/core/models/book.model';

@Component({
  selector: 'app-admin-cards',
  standalone: true,
  templateUrl: './admin-cards.component.html',
  styleUrls: ['./admin-cards.component.css'],
})
export class AdminCardsComponent implements OnInit, OnChanges {
  books: Book[] = [];
  users: User[] = [];
  totalorders: number = 0;

  @Input() refreshTrigger = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['refreshTrigger']) {
      this.loadAll(); 
    }
  }

  loadAll() {
    this.loadBooks();
    this.loadUsers();
    this.loadOrders();
  }

  loadBooks() {
    this.adminService.getAllBooks().subscribe((data) => {
      this.books = data;
    });
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe((res: User[]) => {
      this.users = res;
    });
  }

  loadOrders() {
    this.adminService.getTotalOrders().subscribe((res) => {
      this.totalorders = res.total_orders;
    });
  }
}
