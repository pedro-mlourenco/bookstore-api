import express, { Request, Response } from "express";
import { books } from "./data";
import { AdminRestockRequest } from "./type"; 

const app = express();
const PORT = 3000;

// Use express.json() middleware to parse JSON request bodies
app.use(express.json());

app.get("/books", (req: Request, res: Response) => {
  res.json({ books });
});

// Customer endpoint to place an order
app.post("/order", (req: Request, res: Response) => {
  const { order } = req.body;
  let total = 0;

  // Check if the order is valid
  const orderDetails = order.map((item: { bookId: string; quantity: number }) => {
    const book = books[item.bookId];

    if (!book) {
      return res.status(400).json({ error: `Book ID ${item.bookId} does not exist.` });
    }
    if (book.stock < item.quantity) {
      return res.status(400).json({ error: `Insufficient stock for Book ${book.title}.` });
    }
    if (book.limited && item.quantity > 10) {
      return res.status(400).json({ error: `Cannot order more than 10 copies of ${book.title}` });
    }

    // Calculate total and check if it exceeds the limit
    const itemTotal = book.price * item.quantity;
    if (total + itemTotal > 120) {
      return res.status(400).json({ error: "Total purchase limit exceeded. Cannot exceed $120." });
    }

    total += itemTotal;
    book.stock -= item.quantity;
    return { title: book.title, price: book.price, quantity: item.quantity };
  });

  res.json({ orderDetails, total });
});

//Admin endpoint
app.post("/admin/restock", (req: Request<{}, {}, AdminRestockRequest>, res: Response): void => {
  const { username, password, restock } = req.body;

  // Log the received body for debugging
  console.log("Received body:", req.body);

  // Check admin credentials
  if (username !== "Uncle_Bob_1337" || password !== "TomCruiseIsUnder170cm") {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  // Process each restock item
  for (const item of restock) {
    const book = books[item.bookId];

    if (!book) {
      res.status(400).json({ error: `Book ID ${item.bookId} does not exist.` });
      return;
    }

    if (book.limited) {
      res.status(400).json({ error: `${book.title} cannot be restocked.` });
      return;
    }

    // Restock the book
    book.stock += item.quantity;
  }

  // Respond with success message
  res.json({ message: "Books restocked successfully.", books });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
