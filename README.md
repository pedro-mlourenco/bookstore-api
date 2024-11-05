# Bookstore API

This is a simple REST API for a bookstore that allows customers to order books and an admin to restock them. The project is built using TypeScript and Express.

## Features

- Customers can order books.
- An admin can restock books.
- The system checks stock levels to prevent orders exceeding availability.
- Total price calculation with a limit of $120 per order.

## Books Available

| Book ID | Title                                     | Price |
|---------|-------------------------------------------|-------|
| A       | Fellowship of the book                   | $5    |
| B       | Books and the chamber of books           | $10   |
| C       | The Return of the Book                   | $15   |
| D       | Limited Collectors Edition                | $75   |

## Getting Started

To run the project, follow these steps:

1. npm install
2. npx ts-node src/index.ts

## Running Tests

1. npm test
