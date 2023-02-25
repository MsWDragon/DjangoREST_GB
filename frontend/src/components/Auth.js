import React from "react";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: '', password: ''};
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        )
    }

    handleSubmit(event) {
        this.props.login(this.state.login, this.state.password);
        event.preventDefault();
    }

    render() {
        return (
            <div className="text-center">
                <div className="form-signin col-3 m-auto">
                    <form onSubmit={event => this.handleSubmit(event)}>
                        <h1 className="h3 mb-3 fw-normal">Вход</h1>
                        <div className="form-floating">
                            <input onInput={event => this.handleChange(event)} type="text" name="login"
                                   value={this.state.login} className="form-control" id="floatingInput"
                                   placeholder="Login"/>
                            <label htmlFor="floatingInput">Login</label>
                        </div>
                        <div className="form-floating">
                            <input onInput={event => this.handleChange(event)} type="password" name="password"
                                   value={this.state.password} className="form-control" id="floatingPassword"
                                   placeholder="Password"/>
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-dark mt-3" type="submit">Sign in</button>
                    </form>
                </div>
            </div>
        );
    }
}


export default LoginForm;