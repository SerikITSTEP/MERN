import React, { Component } from 'react'
import classnames from "classnames";
import {login_user} from '../../actions/authActions';
import proptypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';



class Login extends Component{
    constructor(){
        super();

        this.state = {
            email:"",
            password:"",
            errors:{}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }

    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    onChange (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit (e) {
        //without refresh
        e.preventDefault();

        const newUser ={
            email: this.state.email,
            password: this.state.password
        }
        this.props.login_user(newUser, this.props.history);
    }



    render () {
        const {errors} = this.state;
        return(
            <div className="auth">
                <div className="auth-content">
                    <h1 className="auth-title">Войти</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-field">
                            <input value={this.state.email} onChange={this.onChange} name="email" placeholder="Email" type="text" className={classnames('input', {'is-error': errors.email})}/>
                            {errors.email&&(<span className="input-msg-error">{errors.email}</span>)}
                        </div>
                        <div className="form-field">
                            <input value={this.state.password} onChange={this.onChange} name="password" placeholder="Password" type="password" className={classnames('input', {'is-error': errors.password})}/>
                            {errors.password&&(<span className="input-msg-error">{errors.password}</span>)}
                        </div>
                        <div className="form-field">
                            <button className="button">Войти</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
Login.propTypes = {
    login_user: proptypes.func.isRequired,
    auth: proptypes.object.isRequired,
    errors: proptypes.object.isRequired
}

const mapStateProps  = (state) => ({
    auth: state.auth,
    errors: state.errors
})
export default connect(mapStateProps, {login_user})(withRouter(Login));