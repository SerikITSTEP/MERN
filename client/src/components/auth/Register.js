import React, { Component } from 'react';
import classnames from 'classnames';
import { register_user } from '../../actions/authActions';
import proptypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import TextFieldGroup from '../../common/TextFieldGroup';

class Register extends Component{
    constructor(){
        super();

        this.state = {
          email:"",
          name:"",
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
        e.preventDefault();

        const newUser = {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password
        }
        this.props.register_user(newUser, this.props.history)
    }

    render () {
        const {errors} = this.state;
        return(
            <div className="auth">
                <div className="auth-content">
                    <h1 className="auth-title">Регистрация</h1>
                        <form onSubmit={this.onSubmit}>
                            {/*<div className="form-field">
                                <input value={this.state.email} onChange={this.onChange} name="email" placeholder="Email" type="text" className={classnames('input', {'is-error': errors.email})}/>
                                {errors.email&&(<span className="input-msg-error">{errors.email}</span>)}
                            </div>
                            <div className="form-field">
                                <input value={this.state.name} onChange={this.onChange} name="name" placeholder="Name" type="text" className={classnames('input', {'is-error': errors.name})} />
                                {errors.name&&(<span className="input-msg-error">{errors.name}</span>)}
                            </div>
                            <div className="form-field">
                                <input value={this.state.password} onChange={this.onChange} name="password" placeholder="Password" type="password" className={classnames('input', {'is-error': errors.password})}/>
                                {errors.password&&(<span className="input-msg-error">{errors.password}</span>)}
                            </div>*/}
                            <TextFieldGroup value={this.state.email} placeholder={"Email"} onChange={this.onChange} error={errors.email} name={"email"}/>

                            <TextFieldGroup value={this.state.name} placeholder={"Name"} onChange={this.onChange} error={errors.name} name={"name"}/>

                            <TextFieldGroup value={this.state.password} placeholder={"Password"} onChange={this.onChange} error={errors.password}
                                            name={"password"} type={"password"}/>


                            <div className="form-field">
                                <button className="button" type="submit">Регистрация</button>
                            </div>
                        </form>
                </div>
            </div>
        )
    }
}
Register.propTypes = {
    register_user: proptypes.func.isRequired,
    auth: proptypes.object.isRequired,
    errors: proptypes.object.isRequired
}

const mapStateProps  = (state) => ({
    auth: state.auth,
    errors: state.errors
})
export default connect(mapStateProps, {register_user})(withRouter(Register));