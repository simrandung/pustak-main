import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-restock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-restock.component.html',
  styleUrls: ['./admin-restock.component.css']
})
export class AdminRestockComponent implements OnInit {
  outOfStockBooks: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.http.get<any[]>('http://localhost:8000/api/out-of-stock').subscribe(data => {
      this.outOfStockBooks = data;
    });
  }

  restock(bookId: string) {
    this.http.post(`http://localhost:8000/api/${bookId}/restock`, {}).subscribe(() => {
      this.loadBooks(); // Refresh after restock
      alert('Book restocked and users notified via email');
    });
  }


}
