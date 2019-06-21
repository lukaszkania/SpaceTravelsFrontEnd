import React, { Component } from 'react'
import './AddTourist.scss';
import NavBar from '../../homepage/NavBar';
import LIST_OF_COUNTRIES from '../../../constants/LIST_OF_COUNTRIES';
import axios from 'axios';
import { TOURISTS_API_URL } from '../../../constants/API_URLS';
import { withRouter } from 'react-router-dom';
import { MDBBtn } from "mdbreact";

class AddTourist extends Component {
    state = {
        // For handling change of form inputs
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        birth_date: '',
        sex: 'Female', // By default
        country: 'Afghanistan', // By default
        notes: '',
    }

    //  Handling changes of data inputed by user, for every field that is not select
    handleChange = event => {
        let name = event.target.name
        let value = event.target.value
        // Changeing proper data from state defined by name of input field
        this.setState({
            [name]: value
        })
    }

    //  Handling changes of data selected by user, for sex select field 
    handleSexSelectChange = event => {
        // Changeing sex data from state 
        this.setState(
            { sex: event.target.value }
        )
    }

    //  Handling changes of data selected by user, for country select field 
    handleCountrySelectChange = event => {
        // Changeing country data from state 
        this.setState(
            { country: event.target.value }
        )
    }

    //  Handling changes of data selected by user, for notes textarea field 
    handleNotesChanges = event => {
        // Changeing notes data from state 
        this.setState({
            notes: event.target.value
        })
    }

    // Posting inputed bu user data to api
    handleSubmit = event => {
        event.preventDefault()
        // Creating object which will be posted
        const tourist = {
            username: this.state.username,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            birth_date: this.state.birth_date,
            sex: this.state.sex,
            country: this.state.country,
            notes: this.state.notes
        }
        // Posting to api created tourist object
        axios.post(TOURISTS_API_URL, tourist).then(response => {
            console.log(response)
            alert("Tourist was added succesfully") // Notification
            this.props.history.push('/tourists') // Redirection
        })
    }

    render() {
        return (
            <div className="add-tourist-container">
                <NavBar />
                <h1>Add tourist</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        First name
                    <br />
                        <input type='text' name="first_name" id="first_name" placeholder="Type your first name" onChange={this.handleChange} ></input>
                    </label>
                    <br />
                    <label>
                        Last name
                    <br />
                        <input type='text' name="last_name" id="last_nameirth" placeholder="Type your last name" onChange={this.handleChange}></input>
                    </label>
                    <br />
                    <label>
                        Username
                    <br />
                        <input type='text' name="username" id="username" placeholder="Type your username" onChange={this.handleChange} ></input>
                    </label>
                    <br />
                    <label>
                        Email
                    <br />
                        <input type='email' name="email" id="email" placeholder="Type your email" onChange={this.handleChange}></input>
                    </label>
                    <br />
                    <label>
                        Birth date
                    <br />
                        <input type='datetime' name="birth_date" id="birth_date" placeholder="DD-MM-YYYY" onChange={this.handleChange}></input>
                    </label>
                    <br />
                    <label>
                        Sex
                    <br />
                        <select value={this.state.sex} onChange={this.handleSexSelectChange}>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Country
                    <br />
                        <select value={this.state.country} onChange={this.handleCountrySelectChange}>
                            {LIST_OF_COUNTRIES.map(country => {
                                return (
                                    <option key={country} >
                                        {country}
                                    </option>
                                )
                            })}
                        </select>
                    </label>
                    <br />
                    <label>
                        Notes
                    <br />
                        <textarea value={this.state.notes} onChange={this.handleNotesChanges}>
                        </textarea>
                    </label>
                    <br />
                    <MDBBtn onClick={this.handleSubmit} color="primary" rounded>Add tourist</MDBBtn>
                </form>
            </div>
        );
    }
}

export default withRouter(AddTourist);