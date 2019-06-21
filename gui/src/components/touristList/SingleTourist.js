import React, { Component } from 'react'
import './SingleTourist.scss';
import axios from 'axios';
import { FLIGHTS_API_URL } from '../../constants/API_URLS';
import { Link } from 'react-router-dom/cjs/react-router-dom';

class SingleTourist extends Component {
    // 
    state = {
        touristData: '',

    }

    componentDidMount() {
        axios.get(this.props.touristUrl).then(response => {
            this.setState({
                touristData: response.data
            })
        }).catch(error => {
            console.log(error)
        })
        console.log(this.state.touristData)

        axios.get(FLIGHTS_API_URL + this.state.flightPk + '/')
            .then(response => {
                this.setState({
                    flightsSeatsAmount: response.data.seats_amount
                })
            })
    }

    render() {
        return (
            <tr>
                <td>
                    {this.state.touristData.pk}
                </td>
                <td>
                    {this.state.touristData.first_name}
                </td>
                <td>
                    {this.state.touristData.last_name}
                </td>
                <td>
                    {this.state.touristData.username}
                </td>
                <td>
                    {this.state.touristData.email}
                </td>
                <td>
                    {this.state.touristData.birth_date}
                </td>
                <td>
                    {this.state.touristData.sex}
                </td>
                <td>
                    {this.state.touristData.country}
                </td>
                <td>


                    <Link onClick={this.props.handleDeletion}>Delete from flight</Link>
                </td>
            </tr>
        );
    }
}

export default SingleTourist;