interface Book {
    title: string;
    price: number;
    stock: number;
    limited?: boolean;
  }
  
export const books: Record<string, Book> = {
  "A": { title: "Fellowship of the book", price: 5, stock: 100 },
  "B": { title: "Books and the chamber of books", price: 10, stock: 100 },
  "C": { title: "The Return of the Book", price: 15, stock: 100 },
  "D": { title: "Limited Collectors Edition", price: 75, stock: 10, limited: true },
};
