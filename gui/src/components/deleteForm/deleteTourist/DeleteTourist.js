import React, { Component } from 'react'
import './DeleteTourist.scss';
import NavBar from '../../homepage/NavBar';
import { TOURISTS_API_URL } from '../../../constants/API_URLS';
import { withRouter } from 'react-router-dom';
import { MDBBtn } from "mdbreact";
import axios from 'axios';

class DeleteTourist extends Component {

    // Deleting tourist whose pk is touristPk
    deleteTourist = (touristPk) => {
        axios.delete(TOURISTS_API_URL + touristPk + '/').then(response => {
            alert("Tourist whose Id number is " + touristPk + " was successfully removed") // Notification
            this.props.history.push('/tourists') // Redirection
        })
    }

    // Cancel deletion
    cancelDeletion() {
        this.props.history.push('/tourists') // Redirection

    }

    render() {
        return (
            <div className="delete-tourist-container">
                <NavBar />
                <h3>Are you sure You want to delete tourist number {this.props.match.params.touristNumber}?</h3>
                <MDBBtn onClick={() => this.deleteTourist(this.props.match.params.touristNumber)} outline color="danger">Yes</MDBBtn>
                <MDBBtn onClick={() => this.cancelDeletion()} outline color="primary">No</MDBBtn>
            </div>
        );
    }
}

export default withRouter(DeleteTourist);