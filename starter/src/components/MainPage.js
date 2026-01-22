import "../App.css";
import { getAll } from "../BooksAPI.js"
import { useEffect, useState } from "react";
import { Link , BrowserRouter as Router } from "react-router-dom"
import CategorySectionPage from "../components/categorySectionPage.js"
import SearchPage from "../components/SearchPage.js"

function MainPage() {
  const [allBooks , setAllBooks] = useState([])
  
  useEffect(() => {
    const getAllBooks = async () => {
      const res_allBooks = await getAll()
      setAllBooks(res_allBooks)
    }

    getAllBooks()
  },[])

  //--- ref : ChatGpt ----
  const refresh_books = async () => {
    const res = await getAll();
    setAllBooks(res)
  }
  ///---------------------
  
  const currentlyReading_books = allBooks.filter((book) => book["shelf"] == "currentlyReading")
  const wantToRead_books = allBooks.filter((book) => book["shelf"] == "wantToRead")
  const read_books = allBooks.filter((book) => book["shelf"] == "read")

  console.log(currentlyReading_books+"\n"+wantToRead_books+"\n"+read_books)
  console.log(allBooks)

  return (
    <div className="MainPage">
      
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          <div className="list-books-content">
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                {
                  <div>
                    {
                      currentlyReading_books.map((book) => (
                        <div key={book["title"]}>
                          <CategorySectionPage book_data={book} onShelfChange={refresh_books} />
                        </div>
                      ))
                    }
                  </div>
                }
            </div>

            <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                {
                  <div>
                    {
                      wantToRead_books.map((book) => (
                        <div key={book["title"]}>
                          <CategorySectionPage book_data={book} onShelfChange={refresh_books} />
                        </div>
                      ))
                    }
                  </div>
                }
            </div>

            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                {
                  <div>
                    {
                      read_books.map((book) => (
                        <div key={book["title"]}>
                          <CategorySectionPage book_data={book} onShelfChange={refresh_books} />
                        </div>
                      ))
                    }
                  </div>
                }
            </div>

          </div>
          




          <div className="open-search">
              <a href="/search" onClick={() => (
                <Router>
                  <Link
                    to="/search"
                    component={SearchPage}
                  />  
                </Router>
              )}>
              </a>
          </div>

        </div>

    </div>
  );
}

export default MainPage;
