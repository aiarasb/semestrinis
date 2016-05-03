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
                <td>{grade.pazymys}</td>
            );
        };
        
        var createSub = function(sub) {
            return (
                <div className="datagrid">
                    <table>
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
            <div id="gradesTable">
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
            <div className="container">
                <h3>Prisijungti</h3>
                <form onSubmit={this.props.onSubmit}>
                    <input type="text" ref="username" value={this.props.username} onChange={this.handleChange} placeholder="Prisijungimo vardas"/>
                    <input type="password" ref="password" value={this.props.password} onChange={this.handleChange} placeholder="Slaptazodis"/>
                    <button>Prisijungti</button>
                </form>
            </div>
        );
    }
});

var Main = React.createClass({

    handlePazymiai: function() {
        if (this.state.loggedIn) {
            this.setState({
                showGrades: true,
                showTvarkarastis: false,
                showPranesimai: false,
                showNustatymai: false
            });
        }
    },

    handleTvarkarastis: function() {
        if (this.state.loggedIn) {
            this.setState({
                showGrades: false,
                showTvarkarastis: true,
                showPranesimai: false,
                showNustatymai: false
            });
        }
    },

    handlePranesimai: function() {
        if (this.state.loggedIn) {
            this.setState({
                showGrades: false,
                showTvarkarastis: false,
                showPranesimai: true,
                showNustatymai: false
            });
        }
    },

    handleNustatymai: function() {
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
            password: ''
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
                <div className="menu">
                    <button onClick={this.handlePazymiai}>Pazymiai</button>
                    <button onClick={this.handleTvarkarastis}>Tvarkarastis</button>
                    <button onClick={this.handlePranesimai}>Pranesimai</button>
                    <button onClick={this.handleNustatymai}>Nustatymai</button>
                </div>
                <LoginForm username={this.state.username} password={this.state.password} onUserInput={this.handleUserInput} onSubmit={this.handleSubmit} />
                { this.state.showGrades ? <GradesTable moduliai={this.state.duom.semestras.moduliai} /> : null }
                { this.state.showTvarkarastis ? <TvarkarastisTable  /> : null }
                { this.state.showPranesimai ? <PranesimaiTable /> : null }
                { this.state.showNustatymai ? <NustatymaiTable /> : null }
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('app')
);