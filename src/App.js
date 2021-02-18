import React, {Component} from 'react';
import './App.css';
import logo from './logo.svg';
import {Login} from  "./components/Login"
import {TodoApp} from "./components/TodoApp"
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import { Redirect } from 'react-router'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false}
        this.autenticate = this.autenticate.bind(this);
    }

    autenticate(){
        this.setState({isLoggedIn: true});
    }

    render() {

        if (this.state.isLoggedIn
             || localStorage.getItem("isLoggedIn") === "true") var view = <Redirect to="/todo" />

        else var view =  <Redirect to="/" />
        
        const LoginView = () => (
            <Login autenticate={this.autenticate}/>
        );
      
        const TodoAppView = () => (
            <TodoApp/>
        );       

        return (
            <Router >
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">TODO React App</h1>
                </header>

             
                <div>
                    {view}
                    <Route exact path="/" component={LoginView}/>
                    <Route path="/todo" component={TodoAppView}/>
                </div>
            </div>
        </Router>
        );
    }
}

export default App;
