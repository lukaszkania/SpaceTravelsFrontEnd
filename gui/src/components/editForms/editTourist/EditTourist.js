import React, { Component } from 'react'
import './EditTourist.scss';
import NavBar from '../../homepage/NavBar';
import axios from 'axios';
import { TOURISTS_API_URL } from '../../../constants/API_URLS';
import LIST_OF_COUNTRIES from '../../../constants/LIST_OF_COUNTRIES';
import { MDBBtn } from "mdbreact";
import {withRouter} from 'react-router-dom';

class EditTourist extends Component {
        // State of all fields witch can be edited
    state = { 
        pk:'',
        username:'',
        firstName:'',
        lastName:'',
        email:'',
        birthDate:'',
        sex:'',
        country:'',
     }

componentDidMount(){
            //  Getting all actual data of tourist to be displayed on edit page
    axios.get(TOURISTS_API_URL + this.props.match.params.touristNumber + '/').then(response => {
            //  Setting state and input fields
            this.setState({
            pk:response.data.pk,
            username:response.data.username,
            firstName:response.data.first_name,
            lastName:response.data.last_name,
            email:response.data.email,
            birthDate:response.data.birth_date,
            sex:response.data.sex,
            country:response.data.country
        })
    })
}
    //  Handling changes of input fields
handleChange = event => {
    let target = event.target
    let name = target.name
    let value = target.value
    
    this.setState({
        [name]:value
    })
}

    //  Handling changes of select sex field
handleSexSelectChange = event => {
    this.setState(
        {sex:event.target.value}
    )
}

    //  Handling changes of select country field
handleCountrySelectChange = event => {
    this.setState(
        {country:event.target.value}
    )
}

// Makeing changes in api of tourist which pk is in url 
editTourist = event => {
    event.preventDefault()
    // Patching changes using inputed bu user fields data
    axios.patch(TOURISTS_API_URL + this.props.match.params.touristNumber + '/',{
        username: this.state.username,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        birth_date: this.state.birthDate,
        sex: this.state.sex,
        country: this.state.country,
    }).then(response => {
        alert("Tourist whose id is " + this.state.pk + ' was edited successfully')    }) // Notification
this.props.history.push('/tourists') // Redirection

}

    render() { 
        return ( 
            <div className="edit-tourist-container">
            <NavBar/>
            <h3>Edit tourist that Id is equal to {this.state.pk} </h3>
            <form onSubmit={this.editTourist}>
                First name
                <br/>
                <label>
                    <input name="firstName" onChange={this.handleChange} type="text" value={this.state.firstName}></input>
                </label>
                <br/>
                Last name
                <br/>

                <label>
                    <input name="lastName" onChange={this.handleChange} type="text" value={this.state.lastName}></input>
                </label>
                <br/>
                Username
                <br/>
                <label>
                    <input name="username" onChange={this.handleChange} type="text" value={this.state.username}></input>
                </label>
                <br/>
                Email
                <br/>
                <label>
                    <input name="email" onChange={this.handleChange} type="text" value={this.state.email}></input>
                </label>
                <br/>
                Birth date
                <br/>
                <label>
                    <input name="birthDate" onChange={this.handleChange} type="datetime" value={this.state.birthDate}></input>
                </label>
                <br/>
                <label>
                    Sex
                    <br/>
                    <select value={this.state.sex} onChange={this.handleSexSelectChange}>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                    </select>
                </label>
                <br/>
                <label>
                    Country
                    <br/>
                    <select value={this.state.country} onChange={this.handleCountrySelectChange}>
                        {LIST_OF_COUNTRIES.map(country => {
                            return (
                                <option key={country} >
                                {country}
                                </option>
                            )
                        })}
                    </select>                
    </label>
                <br/>
                <MDBBtn onClick={this.editTourist} color="primary">Edit</MDBBtn>

            </form>
            </div>
         );
    }
}
 
export default withRouter(EditTourist);