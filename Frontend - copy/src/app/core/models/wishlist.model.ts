export interface Wishlist {
  book_id: string;
  title: string;
  notified_unavailable: boolean;
  notified_available: boolean;
  created_at: string;
  price?: number;
  author?: string;
  cover_image?: string;
  in_stock?: boolean;
}
