import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "bookproject",
  password: "postgresjai",
  port: 5432,
});
db.connect();

app.get("/", async (req, res) => {
    var result = await db.query("SELECT * FROM books;");
    const books = result.rows;
    res.render("index.ejs", {books: books});
});

app.get("/quotes", async (req, res) => {
    const title = req.query.title;
    const author = req.query.author;
    const rating = req.query.rating;
    const review = req.query.review;
    const url = req.query.url;
    const id = req.query.bookID;

    var result = await db.query("SELECT quote FROM quotes WHERE bookid = $1;", [id]);
    const quotes = result.rows;
    res.render("quotes.ejs", {title: title, author: author, rating: rating, review: review, url: url, id: id, quotes: quotes});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
