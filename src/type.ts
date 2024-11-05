export interface AdminRestockRequest {
    username: string;
    password: string;
    restock: Array<{ bookId: string; quantity: number }>;
  }
  