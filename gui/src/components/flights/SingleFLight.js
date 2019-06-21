import React, { Component } from 'react'
import axios from 'axios';
import { FLIGHTS_API_URL } from '../../constants/API_URLS';
import { Link } from 'react-router-dom/cjs/react-router-dom';

class SingleFlight extends Component {
    // State of every single flight which is in api
    state = {
        singleFlightData: '', // Data of single flight which will be get from api by axios
        numberOfPassengers: '' // Number of passengers which will be assigned to seatsAmount props from Flights component
    }

    componentDidMount() {
        // Getting data of single flight from api
        axios.get(FLIGHTS_API_URL + this.props.flightPk + '/').then(response => {
            //  Setting state data
            this.setState({
                singleFlightData: response.data,
                numberOfPassengers: response.data.tourists.length
            })
        }).catch(error => {
            console.log(error)
        })

    }
    render() {
        return (
            <div>
                {/* If number of passangerss of this flight is  greater than its seats amount then we wont display Add tourist link*/}
                {this.props.seatsAmount > this.state.numberOfPassengers &&
                    <Link to={'add-tourist-to-flight/' + this.state.singleFlightData.pk} >Add tourist</Link>
                }
            </div>
        );
    }
}

export default SingleFlight;