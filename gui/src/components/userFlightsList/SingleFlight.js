import React, { Component } from 'react'
import './SingleFlight.scss';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom';

class SingleFlight extends Component {
    state = {
        flightData: '' // Data of single flight whose url we get from props form UserFlightList component
    }

    componentDidMount() {
        // Getting data from url that we get from props from UserFlightList component
        axios.get(this.props.flightUrl).then(response => {
            this.setState({
                flightData: response.data
            })
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <tr>
                <td>

                    {this.state.flightData.pk}

                </td>
                <td>

                    {this.state.flightData.departure_date}
                </td>
                <td>

                    {this.state.flightData.arrival_date}
                </td>
                <td>

                    {this.state.flightData.seats_amount}
                </td>
                <td>

                    {this.state.flightData.ticket_price}
                </td>
                <td>
                    <Link onClick={this.props.handleDeletion}>Delete flight</Link>
                </td>
            </tr>
        );
    }
}

export default SingleFlight;