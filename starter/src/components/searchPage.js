import { Component } from "react" 


class SearchPage extends Component {

    constructor(props){
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <div>Search Page initiated</div>
                <div>{this.props.test_text}</div>
            </div>
        )
    }



}

export default SearchPage;