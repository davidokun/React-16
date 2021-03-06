import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {

    state = {
        username: 'DavidM'
    };

    changeNameHandler = (event) => {
        this.setState({
            username: event.target.value
        });
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">React Assignment #1</h1>
                </header>

                <UserInput username={this.state.username} changeNameHandler={this.changeNameHandler} />
                <hr/>
                <UserOutput username={this.state.username}/>
                <UserOutput username={this.state.username}/>
                <UserOutput username={this.state.username}/>

            </div>
        );
    }
}

export default App;
