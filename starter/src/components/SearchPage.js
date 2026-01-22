import "../App.css"
import { useEffect , useState } from "react"
import { Router , Route } from "react-router-dom"
import MainPage from "../App.js"

function SearchPage () {

    useEffect(() => {

    },[])

    return (
        <div>
            <div className="search-books">
            <div className="search-books-bar">
                <a
                    href="/"
                    className="close-search"
                    onClick={() => (
                        <Router>
                            <Route
                                exact
                                path="/"
                                component={MainPage}
                            />  
                        </Router>
                    )}
                >  
                </a>
                <div className="search-books-input-wrapper">
                <input
                    type="text"
                    onChange={() => {}}
                    placeholder="Search by title, author, or ISBN"
                />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid"></ol>
            </div>
            </div>
        </div>
    )
}

export default SearchPage;