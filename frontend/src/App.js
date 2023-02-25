import React from "react";
import "./App.css";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import axios from "axios";
import NavMenu from "./components/NavMenu";
import Footer from "./components/Footer";
import UserList from "./components/Users";
import ProjectList from "./components/Projects";
import TodoList from "./components/Todo";
import NotFound404 from "./components/NotFound404";
import ProjectInfo from "./components/ProjectInfo";
import LoginForm from "./components/Auth"
import Cookies from "universal-cookie";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todo': [],
            'token': '',
            'auth': {'username': '', 'is_auth': false}
        };
    }

    componentDidMount() {
        const cookies = new Cookies();
        const username = cookies.get('login');
        if (username !== '') {
            this.setState(
                {'auth': {'username': username, 'is_auth': true}},
                () => this.load_data()
            );
        }
    }

    load_data() {
        const headers = this.get_headers();

        axios.get('http://127.0.0.1:8000/api/users/', {headers}).then(response => {
            const users = response.data;
            this.setState({'users': users.results});
        }).catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/projects/', {headers}).then(response => {
            const projects = response.data;
            this.setState({'projects': projects.results});
        }).catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/todo/', {headers}).then(response => {
            const todo = response.data;
            this.setState({'todo': todo.results});
        }).catch(error => console.log(error));
    }

    set_token(login, access, refresh) {
        const cookies = new Cookies();
        cookies.set('login', login);
        cookies.set('access', access);
        cookies.set('refresh', refresh);
    }

    get_headers() {
        let headers = {'Content-Type': 'application/json'}
        if (this.state.auth.is_auth) {
            const cookies = new Cookies();
            headers['Authorization'] = 'Bearer ' + cookies.get('access');
        }
        return headers;
    }

    login(username, password) {
        axios.post('http://127.0.0.1:8000/api/token/', {'username': username, 'password': password})
            .then(response => {
                const access = response.data['access'];
                const refresh = response.data['refresh'];
                this.set_token(username, access, refresh);
                this.setState(
                    {'auth': {'username': username, 'is_auth': true}},
                    () => this.load_data()
                );
            }).catch(error => {
            if (error.response.status === 401) {
                alert('Неверный логин или пароль.')
            } else {
                alert(error.message + '. ' + error.response.statusText + '. ' + error.response.status + '.')
            }
        })
    }

    logout() {
        this.set_token('', '', '');
        this.setState({'auth': {'username': '', 'is_auth': false}});
    }

    render() {
        return (<div>
            <BrowserRouter>
                <NavMenu auth={this.state.auth} logout={() => this.logout()}/>
                <Switch>
                    <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                    <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                    <Route exact path='/todo' component={() => <TodoList tasks={this.state.todo}/>}/>

                    <Route exact path='/login' component={() => <LoginForm
                        login={(username, password) => this.login(username, password)}/>}/>

                    <Route path='/projects/:projectId'
                           component={() => <ProjectInfo projects={this.state.projects}/>}/>

                    <Route component={NotFound404}/>
                </Switch>
            </BrowserRouter>
            <Footer/>
        </div>)
    }
}

export default App;
