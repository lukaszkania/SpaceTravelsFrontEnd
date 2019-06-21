import React, { Component } from 'react'
import './EditFlight.scss'
import axios from 'axios';
import NavBar from '../../homepage/NavBar';
import { FLIGHTS_API_URL } from '../../../constants/API_URLS';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { MDBBtn } from "mdbreact";
import { withRouter } from 'react-router-dom';

class EditFlight extends Component {
    // State of all fields witch can be edited
    state = {
        departureDate: '',
        arrivalDate: '',
        seatsAmount: '',
        ticketPrice: '',
        tourists: []
    }

    componentDidMount() {
        //  Getting all actual data of flight to be displayed on edit page
        axios.get(FLIGHTS_API_URL + this.props.match.params.flightNumber + "/").then(response => {
            //  Setting state and input fields
            this.setState({
                departureDate: response.data.departure_date,
                arrivalDate: response.data.arrival_date,
                seatsAmount: response.data.seats_amount,
                ticketPrice: response.data.ticket_price,
                tourists: response.data.tourists
            })
        }).catch(error => {
            console.log(error)
        })
    }

    //  Handling changes of input fields
    handleChange = event => {
        let target = event.target
        let name = target.name
        let value = target.value

        this.setState({
            [name]: value
        })
    }

    // Makeing changes in api of flight which pk is in url 
    editFlight = event => {
        event.preventDefault()
        // Patching changes using inputed bu user fields data
        axios.patch(FLIGHTS_API_URL + this.props.match.params.flightNumber + '/', {
            arrival_date: this.state.arrivalDate,
            departure_date: this.state.departureDate,
            seats_amount: this.state.seatsAmount,
            ticket_price: this.state.ticketPrice
        }).then(response => {
            alert("Flight number " + this.props.match.params.flightNumber + ' was edited successfully')
        }) // Notification
        this.props.history.push('/flights') // Redirection
    }

    render() {
        return (
            <div className="edit-flight-container">
                <NavBar />
                <h3>Edit flight number {this.props.match.params.flightNumber}</h3>
                <form onSubmit={this.editFlight}>
                    <label>
                        Departure date
                    <br />
                        <input type="datetime" value={this.state.departureDate} name="departureDate" onChange={this.handleChange}>
                        </input>
                    </label>
                    <br />
                    <label>
                        Arival date
                    <br />
                        <input type="datetime" value={this.state.arrivalDate} name="arrivalDate" onChange={this.handleChange}>
                        </input>
                    </label>
                    <br />
                    <label>
                        Seats amount
                    <br />
                        <input type="number" value={this.state.seatsAmount} name="seatsAmount" onChange={this.handleChange}>
                        </input>
                    </label>
                    <br />
                    <label>
                        Ticket price
                    <br />
                        <input type="number" step="0.01" value={this.state.ticketPrice} name="ticketPrice" onChange={this.handleChange}>
                        </input>
                    </label>
                    <br />
                    <label>

                        <Link to={"/flight-passengers/" + this.props.match.params.flightNumber + '/'}>Passengers</Link> {/* Link to passengers of the flight which id is in url */}
                    </label>
                    <br />
                    <MDBBtn onClick={this.editFlight} color="primary">Edit</MDBBtn>
                </form>
            </div>
        );
    }
}

export default withRouter(EditFlight);