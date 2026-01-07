import "./App.css";
import { getAll , search , get } from "./BooksAPI.js"
import { useEffect, useState } from "react";
import CategorySection from "./components/categorySection.js"
import SearchPage from "./components/searchPage.js"

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [searchInput,setSearchInput] = useState("");



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
  

  ///-----handleSearchInput------
  const handleSearchInput = (event) => {
    setSearchInput(event.target.value) 
  }

  ///----------------------------

  ///-------filter books---------
  const currentlyReading_books = allBooks.filter((book) => book["shelf"] == "currentlyReading")
  const wantToRead_books = allBooks.filter((book) => book["shelf"] == "wantToRead")
  const read_books = allBooks.filter((book) => book["shelf"] == "read")
  ///----------------------------

  console.log(currentlyReading_books+"\n"+wantToRead_books+"\n"+read_books)

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                value={searchInput}
                onChange={e => handleSearchInput(e)}
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
            <SearchPage test_text={searchInput}/>
          </div>
        </div>
      ) : (
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
                          <CategorySection book_data={book} onShelfChange={refresh_books} />
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
                          <CategorySection book_data={book} onShelfChange={refresh_books} />
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
                          <CategorySection book_data={book} onShelfChange={refresh_books} />
                        </div>
                      ))
                    }
                  </div>
                }
            </div>

          </div>
          




          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>search</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
