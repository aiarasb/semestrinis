import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render(){
        return (
            <Main />
        );
    }
}

var GradesTable = React.createClass({
    render: function() {
        
        var createGrade = function(grade) {
            return (
                <td>{grade.pazymys != 1337 ? grade.pazymys : "--"}</td>
            );
        };
        
        var createSub = function(sub) {
            return (
                <div>
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <td style={{ width: "15%" } }>{sub.pavadinimas}</td>
                            {sub.pazymiai.map(createGrade)}
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        };
        
        return (
            <div>
                <h2>Pazymiai</h2>
                {this.props.moduliai.map(createSub)}
            </div>
        );
    }
});

var TvarkarastisTable = React.createClass({
    render: function() {
        return (
            <div>
                <h2>Tvarkarasti</h2>
            </div>
        );
    }
});

var PranesimaiTable = React.createClass({
    render: function() {
        return (
            <div>
                <h2>Pranesimai</h2>
            </div>
        );
    }
});

var NustatymaiTable = React.createClass({
    render: function() {
        return (
            <div>
                <h2>Nustatymai</h2>
            </div>
        );
    }
});

var LoginForm = React.createClass({

    handleChange: function() {
        this.props.onUserInput(
            this.refs.username.value,
            this.refs.password.value
        );
    },

    render: function() {
        return (
            <div>
                <form className="form-signin" onSubmit={this.props.onSubmit}>
                    <h2 className="form-signin-heading">Prisijungti</h2>
                    <label for="inputEmail" className="sr-only">Vartotojo vardas</label>
                    <input type="text" ref="username" className="form-control" value={this.props.username} onChange={this.handleChange} placeholder="Vartotojo vardas" required autofocus />
                    <label for="inputPassword" className="sr-only">Slaptažodis</label>
                    <input type="password" ref="password" className="form-control" value={this.props.password} onChange={this.handleChange} placeholder="Slaptažodis" required />
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value="remember-me" /> Prisiminti
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Prisijungti</button>
                </form>
            </div>
        );
    }
});

var Main = React.createClass({

    handlePazymiai: function(e) {
        e.preventDefault();
        if (this.state.loggedIn) {
            this.setState({
                showGrades: true,
                showTvarkarastis: false,
                showPranesimai: false,
                showNustatymai: false
            });
        }
    },

    handleTvarkarastis: function(e) {
        e.preventDefault();
        if (this.state.loggedIn) {
            this.setState({
                showGrades: false,
                showTvarkarastis: true,
                showPranesimai: false,
                showNustatymai: false
            });
        }
    },

    handlePranesimai: function(e) {
        e.preventDefault();
        if (this.state.loggedIn) {
            this.setState({
                showGrades: false,
                showTvarkarastis: false,
                showPranesimai: true,
                showNustatymai: false
            });
        }
    },

    handleNustatymai: function(e) {
        e.preventDefault();
        if (this.state.loggedIn) {
            this.setState({
                showGrades: false,
                showTvarkarastis: false,
                showPranesimai: false,
                showNustatymai: true
            });
        }
    },

    getInitialState: function() {
        return {
            username: '',
            password: '',
            duom: {
                semestras: {
                    moduliai: []
                }
            },
            showGrades: false,
            showTvarkarastis: false,
            showPranesimai: false,
            showNustatymai: false,
            loggedIn: false
        };
    },

    handleSubmit: function(e) {
        e.preventDefault();
        alert("Username: "+this.state.username+"\nPassword: "+this.state.password);
        //Pass login info to server
        /*$.ajax({
            url: "http://localhost:5000/api/Account/Authorize",
            dataType: 'json',
            type: 'POST',
            data: { Username: this.state.username, Password: this.state.password },
            success: function(data) {
                alert(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("http://localhost:5000/api/Account/Authorize", status, err.toString());
            }.bind(this)

        });*/
        this.setState({
            duom: {
                semestras: {
                    moduliai: [
                        {
                            pavadinimas: "pirmas",
                            pazymiai: [
                                { pazymys: 5 },
                                { pazymys: 8 },
                                { pazymys: 1337 },
                                { pazymys: 9 }
                            ]
                        },
                        {
                            pavadinimas: "antras",
                            pazymiai: [
                                { pazymys: 5 },
                                { pazymys: 8 },
                                { pazymys: 1337 },
                                { pazymys: 9 },
                                { pazymys: 9 },
                                { pazymys: 1337 },
                                { pazymys: 9 }
                            ]
                        }
                    ]
                }
            },
            loggedIn: true,
            username: '',
            password: '',
            showGrades: true
        });
    },

    handleUserInput: function(username, password) {
        this.setState({
            username: username,
            password: password
        });
    },

    render: function() {
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">Project name</a>
                        </div>
                        <div id="navbar" className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li><a href="#" onClick={this.handlePazymiai}>Pažymiai</a></li>
                                <li><a href="#" onClick={this.handleTvarkarastis}>Tvarkaraštis</a></li>
                                <li><a href="#" onClick={this.handlePranesimai}>Pranešimai</a></li>
                                <li><a href="#" onClick={this.handleNustatymai}>Nustatymai</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    { this.state.loggedIn ? null : <LoginForm username={this.state.username} password={this.state.password} onUserInput={this.handleUserInput} onSubmit={this.handleSubmit} /> }
                    { this.state.showGrades ? <GradesTable moduliai={this.state.duom.semestras.moduliai} /> : null }
                    { this.state.showTvarkarastis ? <TvarkarastisTable  /> : null }
                    { this.state.showPranesimai ? <PranesimaiTable /> : null }
                    { this.state.showNustatymai ? <NustatymaiTable /> : null }
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('app')
);