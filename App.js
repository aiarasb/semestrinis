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

    getInitialState: function() {
        return {
            username: '',
            password: ''
        }
    },

    handleChange: function(field, e) {
        var nextState = {};
        nextState[field] = e.target.value;
        this.setState(nextState);
    },

    submit: function(e) {
        e.preventDefault();
        var duom = {
            username: this.state.username,
            password: this.state.password
        };
        this.props.onSubmit(duom);
    },

    render: function() {
        return (
            <div className="container">
                <h3>Prisijungti</h3>
                <form onSubmit={this.submit}>
                    <input type="text" value={this.state.username} onChange={this.handleChange.bind(this, 'username')} placeholder="Prisijungimo vardas"/>
                    <input type="password" value={this.state.password} onChange={this.handleChange.bind(this, 'password')} placeholder="Slaptazodis"/>
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

    handleSubmit: function(duom) {
        alert("Username: "+duom.username+"\nPassword: "+duom.password);
        //Pass login info to server
        /*$.ajax({
            url: "http://localhost:5000/api/Account/Authorize",
            dataType: 'json',
            type: 'POST',
            data: { Username: duom.username, Password: duom.password },
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
            loggedIn: true
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
                <LoginForm onSubmit={this.handeSubmit}/>
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