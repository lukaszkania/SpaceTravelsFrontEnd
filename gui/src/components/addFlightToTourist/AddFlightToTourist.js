import React, { Component } from 'react'
import './AddFlightToTourist.scss';
import NavBar from '../homepage/NavBar';
import axios from 'axios';
import { FLIGHTS_API_URL, TOURISTS_API_URL } from '../../constants/API_URLS';
import { withRouter } from 'react-router-dom';

class AddFlightToTourist extends Component {
    state = {
        touristPk: this.props.match.params.touristNumber, // Slug in url of actual tourist
        allFlights: [], // To display all flights
        touristFlights: [] // Flights of user which pk is touristPk
    }

    componentDidMount() {
        // Getting all flights from api
        axios.get(FLIGHTS_API_URL).then(response => {
            this.setState({
                allFlights: response.data
            })
        }).catch(error => {
            console.log(error)
        })

        // Getting flights of user which pk is touristPk
        axios.get(TOURISTS_API_URL + this.state.touristPk + '/').then(response => {
            this.setState({
                touristFlights: response.data.flights
            })
        }).catch(error => {
            console.log(error)
        })
    }

    // Adding flight to tourist which pk is touristPk
    addFlight(flightPk) {
        const finalListOfFlights = this.state.touristFlights.slice() // Getting copy of touristFlights
        const url = FLIGHTS_API_URL + flightPk + '/' // Creating flight that will be added to api
        finalListOfFlights.push(url)
        // Adding modifide flights list to api
        axios.patch(TOURISTS_API_URL + this.state.touristPk + '/', { flights: finalListOfFlights }).then(response => {
            console.log(response)

            // Updating state
            this.setState({
                flights: finalListOfFlights
            })
        })
        alert("Flight was added successfully") // Notification
        this.props.history.push('/tourists') // Redirection

    }

    render() {
        return (
            <div className="add-flight-to-tourist-container">
                <NavBar />
                <h3>Which flight should be added to tourist number {this.state.touristPk}?</h3>

                {/* TABLE OF ALL AVALIABLE FLIGHTS */}
                <table>
                    <tr>
                        <th>
                            Id
                    </th>
                        <th>
                            Departure date
                    </th>
                        <th>
                            Arrival Date
                    </th>
                        <th>
                            Seats amount
                    </th>
                        <th>
                            Ticket price
                    </th>
                        <th>Add </th>
                    </tr>

                    {/* DISPLAYING DATA OF FLIGHTS FROM STATE */}
                    {this.state.allFlights.map(flight => {
                        return (
                            <tr>
                                <td>
                                    {flight.pk}
                                </td>
                                <td>
                                    {flight.departure_date}
                                </td>
                                <td>
                                    {flight.arrival_date}
                                </td>
                                <td>
                                    {flight.seats_amount}
                                </td>
                                <td>
                                    {flight.ticket_price}
                                </td>
                                <td>
                                    <button onClick={() => this.addFlight(flight.pk)}>Add</button>
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        );
    }
}

export default withRouter(AddFlightToTourist);