import React, { Component } from 'react';
import './UserFlightsList.scss';
import NavBar from '../homepage/NavBar';
import axios from 'axios';
import { TOURISTS_API_URL, FLIGHTS_API_URL } from '../../constants/API_URLS';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import SingleFlight from './SingleFlight';

class UserFlightsList extends Component {
    state = {
        pk: this.props.match.params.touristNumber, // Slug from url that will be pk of tourist
        touristFlights: [], // All flights of tourist whose pk is in url
    }

    componentDidMount() {
        // Getting data of tourist that pk is equal to pk from url slug
        axios.get(TOURISTS_API_URL + this.state.pk + '/').then(response => {
            this.setState({
                touristFlights: response.data.flights
            })

        }).catch(error => {
            console.log(error)
        })

    }

    handleDeletion(flightPk) {
        let url = FLIGHTS_API_URL + flightPk + '/' // Flight which should be removed from tourist in api
        const finalListOfFlights = Object.assign([], this.state.touristFlights) // Copy of state list which will be later saved as main listOfFlights in api
        finalListOfFlights.splice(finalListOfFlights.indexOf(url, 1)) // Removeing flight from list
        // Updateing api by removed flight
        axios.patch(TOURISTS_API_URL + this.state.pk + '/', {
            flights: finalListOfFlights
        }).then(response => {
            alert("Flight was successfully removed from tourist number " + this.state.pk) // Notification
            this.props.history.push('/tourists') // Redirection
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div className="user-flights-list-container">
                <NavBar />
                <h3>List of flights of tourist number {this.state.pk}</h3>
                {/* DISPLAYING FLIGHTS IF THEY ARE ANY */}
                {this.state.touristFlights ? (
                    <table>
                        <tr>
                            <th>
                                Flight Id
                    </th>
                            <th>
                                Departure date
                    </th>
                            <th>
                                Arrival date
                    </th>
                            <th>
                                Seats
                    </th>
                            <th>
                                Ticket price
                    </th>
                            <th>
                                Action
                    </th>
                        </tr>
                        {this.state.touristFlights.map(flightUrl => {
                            // Every flight will be displayed as SingleFlight component, also we give props with flight url to get api from that url in SingleFlight component
                            return (<SingleFlight flightUrl={flightUrl} handleDeletion={this.handleDeletion.bind(this)} />)
                        })}
                    </table>) :
                    // AND IF THEY NOT
                    (<div> <h5>This user has not any flights assigned yet </h5>
                    </div>)}
                <Link to={'/add-flight-to-tourist/' + this.state.pk}>Add flight</Link>
            </div>
        );
    }
}

export default UserFlightsList;