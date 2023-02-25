import React from "react";
import "./App.css";
import axios from "axios";
import NavMenu from "./components/NavMenu";
import Footer from "./components/Footer";
import UserList from "./components/Users";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/').then(response => {
            const users = response.data;
            this.setState({'users': users.results});
        }).catch(
            error => console.log(error)
        );
    }

    render() {
        return (
            <div>
                <NavMenu/>
                <UserList users={this.state.users}/>
                <Footer/>
            </div>
        )
    }
}

export default App;
