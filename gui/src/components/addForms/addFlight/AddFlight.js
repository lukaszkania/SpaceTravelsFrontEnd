import React, { Component } from 'react'
import './AddFlight.scss'
import NavBar from '../../homepage/NavBar';
import axios from 'axios';
import { FLIGHTS_API_URL } from '../../../constants/API_URLS';
import { withRouter } from 'react-router-dom';
import { MDBBtn } from "mdbreact";

class AddFlight extends Component {
    state = {
        // For handling change of form inputs
        departureDate: '',
        arrivalDate: '',
        seatsAmount: '',
        ticketPrice: '',
    }

    //  Handling changes of data inputed by user, universal for every input field
    handleChange = event => {
        let target = event.target
        let name = target.name
        let value = target.value
        // Changeing proper data from state defined by name of input field
        this.setState({
            [name]: value
        })
    }

    // Posting inputed by user data to api
    handleSubmit = event => {
        event.preventDefault()
        // Creating object which will be posted
        const flight = {
            departure_date: this.state.departureDate,
            arrival_date: this.state.arrivalDate,
            seats_amount: this.state.seatsAmount,
            ticket_price: this.state.ticketPrice,
        }
        // Posting to api flight object
        axios.post(FLIGHTS_API_URL, flight).then(response => {
            alert("Flight was added successfully") // Notification
            this.props.history.push('/flights') // Redirection
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (

            <div className="add-flight-container">
                <NavBar />
                <h1>Add flight</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Departure date
                                <input type="datetime" id='departureDate' name="departureDate" onChange={this.handleChange} placeholder="YYYY-MM-DD HH:SS">
                        </input>
                    </label>
                    <br />
                    <label>
                        Arrival date
                                <input type="datetime" id='arrivalDate' name="arrivalDate" onChange={this.handleChange} placeholder="YYYY-MM-DD HH:SS">
                        </input>
                    </label>
                    <br />
                    <label>
                        Seats amount
                                <input type="number" id='seatsAmount' name="seatsAmount" onChange={this.handleChange}>
                        </input>
                    </label>
                    <br />
                    <label>
                        Ticket price
                                <input type="number" id='ticketPrice' step='0.01' name="ticketPrice" onChange={this.handleChange} f>
                        </input>
                    </label>
                    <br />
                    <MDBBtn onClick={this.handleSubmit} color="primary" rounded>Add flight</MDBBtn>
                </form>
            </div>
        );
    }
}



export default withRouter(AddFlight);