import React from 'react';
import './App.css';
import axios from "axios";
import Header from "./components/Header";
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
        axios.get('http://127.0.0.1:8000/api/usersapp/').then(response => {
            const users = response.data;
            this.setState({'users': users});
        }).catch(
            error => console.log(error)
        );
    }

    render() {
        return (
            <div>
                <Header/>
                <UserList users={this.state.users}/>
                <Footer/>
            </div>
        )
    }
}

export default App;
