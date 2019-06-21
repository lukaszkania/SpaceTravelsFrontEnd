import React, { Component } from 'react'
import './DeleteFlight.scss';
import axios from 'axios';
import NavBar from '../../homepage/NavBar';
import { MDBBtn } from "mdbreact";
import { FLIGHTS_API_URL } from '../../../constants/API_URLS';
import { withRouter } from 'react-router-dom';

class DeleteFlight extends Component {

    // Deleting flight whose pk is flightPk
    deleteFlight = (flighPk) => {
        axios.delete(FLIGHTS_API_URL + flighPk + '/').then(response => {
            alert("Flight number " + flighPk + " was successfully removed") // Notification
            this.props.history.push('/flights') // Redirection

        })
    }

    // Cancel deletion
    cancelDeletion() {
        this.props.history.push('/flights') // Redirection

    }

    render() {
        return (
            <div className="delete-flight-container">
                <NavBar />
                <h3>Are you sure You want to delete flight number {this.props.match.params.flightNumber}?</h3>
                <MDBBtn onClick={() => this.deleteFlight(this.props.match.params.flightNumber)} outline color="danger">Yes</MDBBtn>
                <MDBBtn onClick={() => this.cancelDeletion()} outline color="primary">No</MDBBtn>

            </div>
        );
    }
}

export default withRouter(DeleteFlight);