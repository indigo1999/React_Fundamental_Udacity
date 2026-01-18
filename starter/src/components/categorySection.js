
import { Component } from "react"
import { update } from "../BooksAPI.js"

class CategorySection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            book_data : this.props.book_data,
            category_value : "",
            //--- ref : ChatGpt (advice) ----
            onShelfChange : this.props.onShelfChange
            //-------------------------------
        }
    }

    handleSelectCategory = async (event) => {
        this.setState({ category_value : event.target.value })
        this.handleUpdateCategory(event.target.value)
    }

    handleUpdateCategory = (category_value) => {
        const shelf = category_value
        if (shelf !== "none") {
            update(this.state.book_data,shelf)
            .then((updated_books) => { console.log(updated_books) })
            .finally(() => { this.state.onShelfChange()   })
        }
    }

    render() {

        return (
            <div>
                {/* <div>{this.state.category_value}</div> */}
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        <li>
                        <div className="book">
                            <div className="book-top">
                            <div
                                className="book-cover"
                                style={{
                                width: 128,
                                height: 193,
                                backgroundImage:
                                    `url(${this.state.book_data["imageLinks"]["thumbnail"]})`,
                                }}
                            ></div>
                            <div className="book-shelf-changer">
                                <select value={this.state.book_data["shelf"]} onChange={this.handleSelectCategory}>
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
                            <div className="book-title">{this.state.book_data["title"]}</div>
                            <div className="book-authors">{this.state.book_data["authors"]}</div>
                        </div>
                        </li>
                    </ol>
                    </div>
                
            </div>
        )
    }


}

export default CategorySection;
