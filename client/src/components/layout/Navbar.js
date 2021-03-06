import React, { Component } from 'react';
import {Link} from "react-router-dom";
import proptypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';


class Navbar extends Component{

   /* constructor() {
        super();

        this.state = {
            user: {}
        };
    }*/
    //componentWillReceiveProps not work on first render
    //componentDidMount works in one time in one circle
   /* componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.setState({user: this.props.auth.user});
        }
        else {
            this.props.history.push('/');
        }
    }*/


    constructor(){
        super();

        this.state ={
            dropdownStatus: false,
            search: "",
            searchResults:[]
        }

        this.setDropdown = this.setDropdown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.clearSearch = this.clearSearch.bind(this)
    }

    setDropdown(e) {
        this.setState({
            dropdownStatus: !this.state.dropdownStatus
        })
    }
    onChange (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        if (e.target.value.length > 0) {
            axios.get(`/api/blog/${e.target.value}/search`)
                .then(res =>{

                    console.log(res.data);
                    this.setState({
                        searchResults: res.data
                    })
                })
                .catch(err=>{
                        alert (err.msg);
                })
        }
    }
    clearSearch() {
        this.setState({
            search: "",
            searchResults:[]
        })
    }


    render () {
        const {user} = this.props.auth;

        let searchResultsHTML = '';

        if (this.state.searchResults.length>0) {
            searchResultsHTML = this.state.searchResults.map((data, index) => (

                    <div  key={index} className="search-result-tem">
                        <Link to={"/blog/"+data._id} onClick={this.clearSearch}>{data.title}</Link>
                    </div>
            ))
        }

        /*let dropdownStatus=false;
        let classfordropdown ="dropdown";
        let setDrowDown = () => {
            console.log("---------------------");
            dropdownStatus = !dropdownStatus;

            if (dropdownStatus) {
                classfordropdown = "dropdown active"
            }
            else {
                classfordropdown = "dropdown"
            }

            console.log(classfordropdown, dropdownStatus);
        }*/
        return(
                <header className="header">
                        <div className="header-content">
                            <div className="header-logo">
                                <img src="images/logo.svg" alt=""/>
                            </div>
                            <div className="header-search">
                                <input value={this.state.search} onChange={this.onChange} name="search" type="text"/>
                                <img src="images/search.svg" alt=""/>
                            </div>
                            <div className="search-result">
                                {searchResultsHTML}
                            </div>

                            {user.name&&(
                            <ul className="header-nav">
                                <li>
                                    <Link to="/">Главная</Link>
                                </li>
                                <li>
                                    <Link to="/profile">Профиль</Link>
                                </li>
                            </ul>
                            )}
                            {user.name&&(
                            <div className="header-ava" onClick={this.setDropdown}>
                                <img src="images/ava.svg" alt=""/>
                            </div>
                            )}
                            <div className={classnames("dropdown", {"active": this.state.dropdownStatus})}>
                                <ul>
                                    <li>Настройки</li>
                                    <li>Выйти</li>
                                </ul>
                            </div>
                            {!user.name&&(
                            <ul className="header-nonauth" >
                                <li>
                                    <Link to="/login">Войти</Link>
                                </li>
                                <li>
                                    <Link to="/register">Регистрация</Link>
                                </li>
                            </ul>
                            )}
                        </div>
                </header>
            )
    }
}

Navbar.propTypes = {
    auth: proptypes.object.isRequired
}

const mapStateProps  = (state) => ({
    auth: state.auth
})
export default connect(mapStateProps, {})(withRouter(Navbar));