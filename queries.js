// Task 2: Basic CRUD Operations

// 1. Find all books in a specific genre
db.books.find({ genre: "Fiction" })

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 1950 } })

// 3. Find books by a specific author
db.books.find({ author: "George Orwell" })

// 4. Update the price of a specific book
db.books.updateOne(
  { title: "The Alchemist" },
  { $set: { price: 15.99 } }
)

// 5. Delete a book by its title
db.books.deleteOne({ title: "Animal Farm" })

// Task 3: Advanced Queries

// 1. Find books that are both in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// 2. Projection: only return title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// 3. Sort by price ascending
db.books.find().sort({ price: 1 })

// 4. Sort by price descending
db.books.find().sort({ price: -1 })

// 5. Pagination (Page 2, 5 books per page)
db.books.find().skip(5).limit(5)

// Task 4: Aggregation Pipeline

// 1. Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avg_price: { $avg: "$price" } } }
])

// 2. Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// 3. Group books by publication decade and count them
db.books.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          { $substr: ["$published_year", 0, 3] },
          "0s"
        ]
      },
      count: { $sum: 1 }
    }
  }
])

// Task 5: Indexing

// 1. Create an index on the title field
db.books.createIndex({ title: 1 })

// 2. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// 3. Use explain() to demonstrate performance
db.books.find({ title: "1984" }).explain("executionStats")
