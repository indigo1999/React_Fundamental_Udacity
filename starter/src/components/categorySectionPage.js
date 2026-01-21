import { useState , useEffect } from "react"
import { update } from "../BooksAPI.js"


function CategorySectionPage ({ book_data , onShelfChange }) {

    const [bookData,setBookData] = useState([])
    //const [categoryValue,setCategoryValue] = useState("")

    useEffect(() => {
        const load_book_data = async () => {
           setBookData(book_data)
        }
        load_book_data()
    },[])

    const handleSelectCategory = async (event) => {
        //setCategoryValue(event.target.value)
        handleUpdateCategory(event.target.value)
    }

    const handleUpdateCategory = (category_value) => {
        const shelf = category_value
        if (shelf !== "none") {
            update(bookData,shelf)
            .then((updated_books) => { console.log(updated_books) })
            .finally(() => { onShelfChange() })
        }
    }


    return (
        <div>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        <li>
                        <div className="book">
                            <div className="book-top">
                            {    
                                Object.hasOwn(bookData,"imageLinks") ?
                                    (
                                        Object.hasOwn(bookData["imageLinks"],"smallThumbnail") ?
                                        (
                                            <div
                                                className="book-cover"
                                                style={{
                                                width: 128,
                                                height: 193,
                                                backgroundImage:
                                                    `url(${bookData["imageLinks"]["smallThumbnail"]})`,
                                                }}
                                            ></div>
                                        ) : (
                                            <div
                                                className="book-cover"
                                                style={{
                                                width: 128,
                                                height: 193,
                                                backgroundImage:
                                                    `url(${bookData["imageLinks"]["thumbnail"]})`,
                                                }}
                                            ></div>
                                        )
                                    ) : (
                                        <div>No image links for this book</div>
                                    )
                            }
                            <div className="book-shelf-changer">
                                <select value={bookData["shelf"]} onChange={e => handleSelectCategory(e)}>
                                    <option value="none" disabled>
                                        Move to...
                                    </option>
                                    <option value="currentlyReading">
                                        Currently Reading
                                    </option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                            </div>
                            <div className="book-title">{bookData["title"]}</div>
                            <div className="book-authors">{bookData["authors"]}</div>
                        </div>
                        </li>
                    </ol>
                    </div>
                
            </div>
    )
}

export default CategorySectionPage ;