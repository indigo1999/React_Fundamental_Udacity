import { useEffect, useState } from "react" 
import { search , get } from "../BooksAPI.js"


function SearchPage({search_text , onShelfChange}) {

    const [bookResult,setBookResult] = useState([])

    useEffect(() => {
        const onQuery = async() => {
            if (search_text) {
                const result = await search(search_text,20)

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
                        console.log(books)
                        setBookResult(books)  
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
        </div>
    )

}

export default SearchPage;