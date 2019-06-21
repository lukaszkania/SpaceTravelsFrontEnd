import React, { Component } from 'react';
import './PassengersList.scss';
import NavBar from '../homepage/NavBar';
import axios from 'axios';
import { TOURISTS_API_URL } from '../../constants/API_URLS';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import SingleFlight from './SingleFlight';

class PassengersList extends Component {
    // Component which have all flights of tourist whose pk is in url
    state = {
        pk: this.props.match.params.touristNumber, // Slug from url
        touristFlights: [], // All flights of tourist
    }

    componentDidMount() {
        // Getting all flights of tourist whose pk is in url from api
        axios.get(TOURISTS_API_URL + this.state.pk + '/').then(response => {
            this.setState({
                touristFlights: response.data.flights
            })
        }).catch(error => {
            console.log(error)
        })

    }

    render() {
        return (
            <div className="passenger-flights-list-container">
                <NavBar />
                <h3>List of flights tourist number {this.state.pk}</h3>
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
                        </tr>
                        {this.state.touristFlights.map(touristUrl => {
                            return (<SingleFlight touristUrl={touristUrl} />)
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

export default PassengersList;