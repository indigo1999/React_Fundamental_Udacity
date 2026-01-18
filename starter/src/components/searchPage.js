import { useEffect, useState } from "react" 
import { search , get } from "../BooksAPI.js"
import CategorySection from "./categorySection.js"


function SearchPage({search_text , onShelfChange}) {

    const [bookResult,setBookResult] = useState([])
    const [currentlyReading,setCurrentlyReading] = useState([])
    const [wantToRead,setWantToRead] = useState([])
    const [read,setRead] = useState([])
    const [noneBook,setNoneBook] = useState([])

    useEffect(() => {
        const onQuery = async() => {
            if (search_text) {
                const result = await search(search_text.toLocaleLowerCase(),20)
                
                if(Array.isArray(result)){
                    //True
                    if(result.length) {
                        
                        //--- ref : ChatGpt ----
                        const books = await Promise.all(
                            result.map(each_book => get(each_book["id"]))
                        )
                        //----------------------

                        // result.forEach( each_book => {
                        //     const book = get(each_book["id"])
                        //     all_book.push(book)
                        // })
                        // console.log(books)
                        ///-------filter books---------
                        const currentlyReading_books = books.filter((book) => book["shelf"] == "currentlyReading")
                        const wantToRead_books = books.filter((book) => book["shelf"] == "wantToRead")
                        const read_books = books.filter((book) => book["shelf"] == "read")
                        const none_books = books.filter((book) => book["shelf"] == "none")
                        ///----------------------------

                        setBookResult(books)
                        setCurrentlyReading(currentlyReading_books)
                        setWantToRead(wantToRead_books)
                        setRead(read_books)  
                        setNoneBook(none_books)
                    } else {
                        alert("book array : []")
                    }
                } else {
                    //False 
                    alert("book items : {}")
                }
            } else {
                console.log("there's no any search term.")
            }
        }  

        onQuery()
    },[search_text])


    return (
        <div>
            <div>Checkpoint get all searched book by each of their book's Id.</div>
            <div>
            {
                bookResult.length ? 
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>xxx</h1>
                        </div>

                        <div className="list-books-content">
                        
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Currently Reading</h2>
                                    {
                                        currentlyReading.map((book) => (
                                            <div key={book["title"]} >
                                                {book["title"]}
                                            </div>
                                        ))
                                    }
                            </div>

                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Want to Read</h2>
                                    {
                                        wantToRead.map((book) => (
                                            <div key={book["title"]} >
                                                {book["title"]}
                                            </div>
                                        ))
                                    }
                            </div>

                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Read</h2>
                                    {
                                        read.map((book) => (
                                            <div key={book["title"]} >
                                                {book["title"]}
                                            </div>
                                        ))
                                    }
                            </div>

                            <div className="bookshelf">
                                <h2 className="bookshelf-title">none</h2>
                                    {
                                        noneBook.map((book) => (
                                            <div key={book["title"]} >
                                                <CategorySection book_data={book} onShelfChange={onShelfChange} />
                                            </div>
                                        ))
                                    }
                            </div>

                        </div>
          
                    </div>
                        : 
                    <div>nothing</div>
            }
            </div>
        </div>
    )

}

export default SearchPage;