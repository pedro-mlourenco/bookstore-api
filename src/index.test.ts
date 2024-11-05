import request from "supertest";
import app from "./index"; 

describe("Bookstore API Endpoints", () => {
  describe("POST /admin/restock", () => {
    it("should restock books with valid credentials", async () => {
      const response = await request(app)
        .post("/admin/restock")
        .send({
          username: "Uncle_Bob_1337",
          password: "TomCruiseIsUnder170cm",
          restock: [
            { bookId: "A", quantity: 10 },
            { bookId: "B", quantity: 10 }
          ]
        });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Books restocked successfully.");
    });

    it("should reject restock with invalid credentials", async () => {
      const response = await request(app)
        .post("/admin/restock")
        .send({
          username: "WrongUser",
          password: "WrongPassword",
          restock: [{ bookId: "A", quantity: 10 }]
        });
      expect(response.status).toBe(403);
      expect(response.body.error).toBe("Unauthorized");
    });
  });

  describe("GET /books", () => {
    it("should list all books", async () => {
      const response = await request(app).get("/books");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("books");
      expect(response.body.books.A).toHaveProperty("title", "Fellowship of the book");
    });
  });

  describe("POST /order", () => {
    it("should allow an order within stock limits", async () => {
      const response = await request(app)
        .post("/order")
        .send({
          order: [
            { bookId: "A", quantity: 2 },
            { bookId: "B", quantity: 1 }
          ]
        });
      expect(response.status).toBe(200);
    });

    it("should prevent ordering more than available stock", async () => {
      const response = await request(app)
        .post("/order")
        .send({
          order: [{ bookId: "D", quantity: 200 }]
        });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Insufficient stock for Book Limited Collectors Edition.");
    });
  });
});
