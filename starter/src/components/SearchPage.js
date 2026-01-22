import "../App.css"
import { useEffect , useState } from "react"
import { Router , Route } from "react-router-dom"
import MainPage from "../App.js"
import { search , get } from "../BooksAPI.js"

function SearchPage () {

    const [searchText,setSearchText] = useState("")
    const [searchResult,setSearchResult] = useState([])

    useEffect(() => {
        const init_search_result = async () => {
            const search_result = await search(searchText,20)
            if (Array.isArray(search_result) && search_result.length) {
                const books = await Promise.all(
                    search_result.map(each_result => get(each_result["id"]))
                )
                setSearchResult(books)
            }
            
        }

        init_search_result()
    },[searchText])

    const handleSearchText = (event) => {
        setSearchText(event.target.value)
    } 

    console.log(searchResult)
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
                    onChange={(event) => handleSearchText(event)}
                    placeholder="Search by title, author, or ISBN"
                />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid"></ol>
                <div>{searchText}</div>
            </div>
            </div>
        </div>
    )
}

export default SearchPage;