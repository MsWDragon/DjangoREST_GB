import React from 'react';

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'name': '',
            'repo_url': '',
            'users': this.props.users[0].id
        }
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        )
    }

    handleUsersChange(event) {
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions[i].value);
        }
        this.setState({users: users})
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.users, this.state.repo_url)
        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <form className="w-50 mx-auto">
                    <div className="form-group mb-4">
                        <label htmlFor="login">Имя проекта*</label>
                        <input type="text" className="form-control" name="name"
                               value={this.state.name} onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="author">Участники проекта*</label>
                        <select multiple className="form-control" name="users"
                                onChange={(event) => this.handleUsersChange(event)}>
                            {this.props.users.map((user) => <option
                                value={user.id}>{user.firstName} {user.lastName}</option>)}
                        </select>
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="author">Ссылка на репозиторий</label>
                        <input type="text" className="form-control" name="repo_url"
                               value={this.state.repo_url} onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success w-100"
                                onClick={(event) => this.handleSubmit(event)}>Сохранить
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ProjectForm;