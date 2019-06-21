import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import COUNTRY_LIST from '../../constants/LIST_OF_COUNTRIES';
import { MDBInput } from 'mdbreact';
import './RegisterForm.scss';

// Function to display all countires name in Select country field
const selectCountryName = (array) => {
    return array.map((country, index) => {
        return (
            <option value={toString(index + 1)}>{array[index]}</option>
        )
    })

}


class RegisterForm extends Component {
    state = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        emailConfirm: '',
        sex: '',
        country: '',
        notes: '',
        dateOfBirth: '',

    }

    handleChange = event => {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value

        this.setState({
            name: value
        })
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                        <form onSubmit={this.handleSubmit}>
                            <p className="h4 text-center mb-4">Sign up</p>
                            {/* FIRST NAME */}
                            <label htmlFor="name" className="grey-text">
                                First name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                name="name"
                                value={this.state.firstName}
                                onChange={this.handleChange}
                            />
                            <br />

                            {/* LAST NAME */}
                            <label htmlFor="surname" className="grey-text">
                                Last name
                            </label>
                            <input
                                type="text"
                                id="surname"
                                className="form-control"
                                name='surname'
                                value={this.state.lastName}
                                onChange={this.handleChange}

                            />
                            <br />

                            {/* USERNAME */}
                            <label htmlFor="username" className="grey-text">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                name='username'
                                value={this.state.username}
                                onChange={this.handleChange}

                            />
                            <br />

                            {/* EMAIL */}
                            <label htmlFor="email" className="grey-text">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}

                            />
                            <br />

                            {/* CONFIRM EMAIL */}
                            <label
                                htmlFor="confirm-email"
                                className="grey-text"
                            >
                                Confirm your email
                            </label>
                            <input
                                type="email"
                                id="confirm-email"
                                className="form-control"
                                name='confirm-email'
                                value={this.state.emailConfirm}
                                onChange={this.handleChange}

                            />
                            <br />

                            {/* PASSWORD */}
                            <label
                                htmlFor="password"
                                className="grey-text"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}

                            />
                            <br />
                            {/* SEX */}
                            <div>
                                <label htmlFor="sex" className="grey-text">
                                    Sex
                                </label>
                                <select className="browser-default custom-select" onChange={this.handleChange}>
                                    <option value={this.state.sex}>Female</option>
                                    <option value={this.state.sex}>Male</option>
                                    <option value={this.state.sex}>Other</option>
                                </select>
                            </div>
                            <br />

                            {/* COUNTRY */}
                            <div>
                                <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                    Country
                                </label>
                                <select className="browser-default custom-select" value={this.state.country} onChange={this.handleChange}>
                                    {selectCountryName(COUNTRY_LIST)}
                                </select>
                            </div>
                            <br />

                            {/* NOTES */}
                            <div>
                                <label htmlFor="notes" className="grey-text">
                                    Notes
                                </label>
                                <MDBInput type="textarea" rows="3" />
                            </div>
                            <br />

                            {/* DATE OF BIRTH */}
                            <div>
                                <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                    Date of birth
                                </label>
                            </div>

                            {/* SUBMIT */}
                            <div className="text-center mt-4">
                                <MDBBtn color="unique" type="submit">
                                    Register
                                </MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default RegisterForm;



