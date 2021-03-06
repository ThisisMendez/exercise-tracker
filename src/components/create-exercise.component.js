import React, { Component } from 'react'; 
import axios from 'axios'; 
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercises extends Component { 
    constructor(props) { 
        super(props);
            // You have to call super when you are defining a subclass 
            // binding to each of the methods

        this.onChangeUsername = this.onChangeUsername.bind(this); 
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

            // in react you always add it in state 
        this.state = { 
            username: '', 
            description: '', 
            duration: 0, 
            date: new Date(), 
            users: []
        }
    }

// This code will run before any of the other code runs
    componentDidMount() { 
        axios.get('http://localhost:5000/users/')
        .then(response => { 
            if (response.data.length > 0){ 
                this.setState({
                    users: response.data.map(user => user.username), // we say user.username because we just want the user
                    username: response.data[0].username
                 })
            }
        }) 
    }

    onChangeUsername(e) { 
        this.setState({ 
            username: e.target.value 
            //target is textbox value is the value of the text box 
        }); 
    }
    onChangeDescription(e) { 
        this.setState({ 
            description: e.target.value
        }); 
    }
    onChangeDuration(e) { 
        this.setState({ 
            duration: e.target.value //target is textbox value is the value of the textbox 
        }); 
    }
    onChangeDate(date) { 
        this.setState({ 
            date: date
        }); 
    }
    //OnSubmit Button
    onSubmit(e) { 
        e.preventDefault(); 
        
        // inside a single method you can create variables if they are only going to be called in that single method 
        const exercise = { 
            username: this.state.username, 
            description: this.state.description, 
            duration: this.state.duration, 
            date: this.state.date
        }
        
        console.log(exercise); 

        // POST link from front to backend 
        axios.post('http://localhost:5000/exercises/add', exercise)
        .then(res => console.log(res.data)); 


        window.location = '/';

    // once you submit an exercise it'll go back to the list of exercises
    // You never create a variable normally in react. Exception Inside a single method you can create variables if they are only going to be used in that method 


    }


render() { 
    return ( 
    <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}> 
            <div className="form-group"> 
                <label>Username: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}>
                        {
                            this.state.users.map(function(user) {
                                return <option
                                key={user}
                                value={user}>
                                {user}
                                </option>;
                            })
                        }
                </select>
            </div>
            <div className="form-group">
                <label>Description: </label>
                <input type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                />
            </div>
            <div className="form-group">
                <label>Duration (in minutes): </label>
                <input 
                    type="text"
                    className="form-control"
                    value={this.state.duration}
                    onChange={this.onChangeDuration}
                />
            </div>
            <div className="form-group">
                <label>Date: </label>
                <div>
                    <DatePicker
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                    />
                </div>
            </div>

            <div className="form-group">
                <input type="submit" value="Create Exercise Log" className="btn btn-primary" />.
            </div>
        </form>
    </div>
        )
    }
}