import React from "react";
import "./App.css";
import {Route, BrowserRouter, Switch, useParams} from "react-router-dom";
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
import ProjectForm from "./components/ProjectForm";
import ProjectEditForm from "./components/ProjectEditForm";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'filteredProjects': [],
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
            this.setState({'projects': projects.results, 'filteredProjects': projects.results});
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

    deleteProject(id) {
        const headers = this.get_headers();
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}/`, {headers}).then(
            () => this.load_data()
        ).catch(
            error => console.log(error)
        );
    }

    createProject(name, users, repo_url) {
        const headers = this.get_headers();
        const admin_user = this.state.users.find((user) => user.username === this.state.auth.username);
        const data = {name: name, admin_user: admin_user.id, users: users, repo_url: repo_url};
        axios.post('http://127.0.0.1:8000/api/projects/', data, {headers}).then(
            () => this.load_data()
        ).catch(
            error => console.log(error)
        )
    }

    editProject(id, name, users, repo_url) {
        const headers = this.get_headers();
        const data = {name: name, users: users, repo_url: repo_url};
        axios.patch(`http://127.0.0.1:8000/api/projects/${id}/`, data, {headers}).then(
            () => this.load_data()
        ).catch(
            error => console.log(error)
        )
    }

    filterString(text) {
        if (!text) {
            this.setState({filteredProjects: this.state.projects});
            return;
        }
        const filteredProjects = this.state.projects.filter((project) => {
            return project.name.toLowerCase().includes(text.toLowerCase())
        })
        this.setState({filteredProjects: filteredProjects})
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <NavMenu auth={this.state.auth} logout={() => this.logout()}
                             filterString={(text) => this.filterString(text)}/>
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects'
                               component={() => <ProjectList projects={this.state.filteredProjects}
                                                             deleteProject={(id) => this.deleteProject(id)}/>}/>
                        <Route exact path='/todo' component={() => <TodoList tasks={this.state.todo}/>}/>

                        <Route exact path='/login' component={() => <LoginForm
                            login={(username, password) => this.login(username, password)}/>}/>

                        <Route exact path='/projects/create' component={() => <ProjectForm
                            createProject={(name, users, repo_url) => this.createProject(name, users, repo_url)}
                            users={this.state.users}/>}/>

                        <Route exact path='/projects/edit/:projectId'
                               component={() => <ProjectEditForm projects={this.state.projects}
                                                                 editProject={(id, name, users, repo_url) => this.editProject(id, name, users, repo_url)}
                                                                 projectId={useParams()} users={this.state.users}/>}/>

                        <Route path='/projects/:projectId'
                               component={() => <ProjectInfo projects={this.state.projects}
                                                             users={this.state.users}/>}/>

                        <Route component={NotFound404}/>
                    </Switch>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;
