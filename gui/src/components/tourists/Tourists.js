import React, { Component } from 'react'
import './Tourists.scss';
import axios from 'axios'
import { TOURISTS_API_URL } from '../../constants/API_URLS';
import NavBar from '../homepage/NavBar';
import { Link } from 'react-router-dom/cjs/react-router-dom';

class Tourists extends Component {
    state = {
        tourists: [], // That will be all flights avalivable in api
    }

    componentDidMount() {
        // Getting all flights from api and changeing state
        axios.get(TOURISTS_API_URL).then(response => {
            this.setState({
                tourists: response.data,
            })
        })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div className="tourists-container">
                <NavBar />
                <h3>Tourists</h3>
                <table>
                    <tr>
                        <th>
                            Id
                        </th>
                        <th>
                            Username
                        </th>
                        <th>
                            First Name
                        </th>
                        <th>
                            Last Name
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Birth Date
                        </th>
                        <th>
                            Sex
                        </th>
                        <th>
                            Country
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>

                    {/* Displaying tourists from API */}
                    {this.state.tourists.map(tourist => {
                        return (
                            <tr>
                                <td>{tourist.pk}</td>
                                <td>{tourist.username}</td>
                                <td>{tourist.first_name}</td>
                                <td>{tourist.last_name}</td>
                                <td>{tourist.email}</td>
                                <td>{tourist.birth_date}</td>
                                <td>{tourist.sex}</td>
                                <td>{tourist.country}</td>
                                <td>
                                    <Link to={"tourist-flights/" + tourist.pk + '/'}>Show flights list</Link>
                                    <Link to={"edit-tourist/" + tourist.pk + '/'}>Edit</Link>
                                    <Link to={"delete-tourist/" + tourist.pk + '/'}>Delete</Link>
                                </td>
                            </tr>
                        )
                    })}
                </table>
                <Link to="/add-tourist">Add tourist</Link>
            </div>
        );
    }
}

export default Tourists;