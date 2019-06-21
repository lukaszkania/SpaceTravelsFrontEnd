import React, { Component } from 'react';
import './AddTouristToFlight.scss';
import axios from 'axios';
import NavBar from '../homepage/NavBar';
import { TOURISTS_API_URL, FLIGHTS_API_URL } from '../../constants/API_URLS';
import { withRouter } from 'react-router-dom';
import { MDBBtn } from "mdbreact";

class AddTouristToFLight extends Component {
    state = {
        flightPk: this.props.match.params.flightNumber, // Slug from ur;
        allTourists: [], // All tourists that will be displayed on page in table
        passengers: [] // List with tourists which are passengers of this specific flight of id flightPk
    }


    componentDidMount() {
        //  Getting all tourists from api
        axios.get(TOURISTS_API_URL).then(response => {
            // Assigninig tourists from api to state
            this.setState({
                allTourists: response.data
            })
        }).catch(error => {
            console.log(error)
        })

        // Getting all passengers of this specific flight whose pk is flightPk
        axios.get(FLIGHTS_API_URL + this.state.flightPk + '/').then(response => {
            // Assigninig passengers from api to state (this will be list of urls to every tourist which is in tourists field in flight api)
            this.setState({
                passengers: response.data.tourists
            })
        }).catch(error => {
            console.log(error)
        })
    }

    addTourist(touristPk) {
        // Patching passenger which was clicked to api
        const finalListOfPassengers = this.state.passengers.slice() // Getting copy of passengers array from api
        const url = TOURISTS_API_URL + touristPk + '/' // Creating object which will be patched
        finalListOfPassengers.push(url)
        // Updateing api
        axios.patch(FLIGHTS_API_URL + this.state.flightPk + '/', { tourists: finalListOfPassengers }).then(response => {
            // Updating state with updated array
            this.setState({
                flights: finalListOfPassengers
            })
        })
        alert("Tourist was added successfully") // Notification
        this.props.history.push('/flights') // Redirection
    }


    render() {
        return (
            <div className="add-tourist-to-flight-container">
                <NavBar />
                <h3>Which tourist should be added to flight number {this.state.flightPk}?</h3>
                <table>
                    <tr>
                        <th>
                            Id
                    </th>
                        <th>
                            First name
                    </th>
                        <th>
                            Last name
                    </th>
                        <th>
                            Username
                    </th>
                        <th>
                            Email
                    </th>
                        <th>
                            Birth day
                    </th>
                        <th>
                            Sex
                    </th>
                        <th>
                            Country
                    </th>
                        <th>Add </th>
                    </tr>
                    {/* DISPLAYING DATA OF ALL EXISTING IN API TOURISTS */}
                    {this.state.allTourists.map(tourist => {
                        return (
                            <tr>
                                <td>
                                    {tourist.pk}
                                </td>
                                <td>
                                    {tourist.first_name}
                                </td>
                                <td>
                                    {tourist.last_name}
                                </td>
                                <td>
                                    {tourist.username}
                                </td>
                                <td>
                                    {tourist.email}
                                </td>
                                <td>
                                    {tourist.birth_date}
                                </td>
                                <td>
                                    {tourist.sex}
                                </td>
                                <td>
                                    {tourist.country}
                                </td>
                                <td>
                                    <MDBBtn onClick={() => this.addTourist(tourist.pk)} rounded outline>Add</MDBBtn>
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        );
    }
}

export default withRouter(AddTouristToFLight);