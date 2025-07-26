export interface Cart {
  book_id: string;
  title: string;
  quantity: number;
}

export interface UserOrder {
  email: string;
  orders: Cart[];
}