import React, { Component } from 'react'
import './Flights.scss';
import axios from 'axios'
import { FLIGHTS_API_URL } from '../../constants/API_URLS';
import NavBar from '../homepage/NavBar';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import SingleFlight from './SingleFLight';

class Flights extends Component {
    state = {
        flights: [], // All flights that are in api
    }

    componentDidMount() {
        // Getting data from api
        axios.get(FLIGHTS_API_URL).then(response => {
            // Setting state to list of objects of flights
            this.setState({
                flights: response.data,
            })
        })
            .catch(error => {
                console.log(error)
            })

    }

    render() {
        return (
            <div className="flights-container">
                <NavBar />
                <h2>Flights</h2>
                <table>
                    <tr>
                        <th>
                            Flight Id
                        </th>
                        <th>
                            Departure Date
                        </th>
                        <th>
                            Arrival Date
                        </th>
                        <th>
                            Seats
                        </th>
                        <th>
                            Ticket Price
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>

                    {/* Displaying all flights from API */}
                    {this.state.flights.map(flight => {
                        return (
                            <tr key={flight.pk}>
                                <td>{flight.pk}</td>
                                <td>{flight.departure_date}</td>
                                <td>{flight.arrival_date}</td>
                                <td>{flight.seats_amount}</td>
                                <td>{flight.ticket_price}</td>
                                <td>
                                    {/* Every flight is one component with proper props of itself */}
                                    <SingleFlight flightPk={flight.pk} seatsAmount={flight.seats_amount} />
                                    {/* Redirections to other pages */}
                                    <Link to={"/flight-passengers/" + flight.pk + '/'}>Show tourists list</Link>
                                    <Link to={'/edit-flight/' + flight.pk}>Edit flight</Link>
                                    <Link to={'/delete-flight/' + flight.pk}>Delete flight</Link>
                                </td>
                            </tr>
                        )
                    })}
                </table>
                <Link to="/add-flight">Add flight </Link>
            </div>
        );
    }
}

export default Flights;