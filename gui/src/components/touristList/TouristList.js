import React, { Component } from 'react'
import './TouristList.scss';
import axios from 'axios';
import { FLIGHTS_API_URL, TOURISTS_API_URL } from '../../constants/API_URLS';
import NavBar from '../homepage/NavBar';
import SingleTourist from './SingleTourist';
import { withRouter } from 'react-router-dom';

// DOKONCZYC
class TouristList extends Component {
    state = {
        pk: this.props.match.params.flightNumber,
        listOfTourists: [], // List of passsengers of flight number pk
    }


    componentDidMount() {
        axios.get(FLIGHTS_API_URL + this.state.pk + '/').then(response => {
            this.setState({
                listOfTourists: response.data.tourists
            })

        }).catch(error => {
            console.log(error)
        })

    }

    handleDeletion(touristPk) {
        let url = TOURISTS_API_URL + touristPk + '/' // Tourist which should be removed from passengers of flight in api
        const finalListOfTourists = Object.assign([], this.state.listOfTourists) // Copy of state list which will be later saved as main listOfTourists in  api
        finalListOfTourists.splice(finalListOfTourists.indexOf(url, 1)) // Removeing tourist from list
        // Updateing api by removed tourist
        axios.patch(FLIGHTS_API_URL + this.state.pk + '/', {
            tourists: finalListOfTourists
        }).then(response => {
            alert("Tourist was successfully removed from flight number " + this.state.pk) // Notification
            this.props.history.push('/flights') // Redirection
        }).catch(error => {
            console.log(error)
        })
    }


    render() {
        return (
            <div className="tourists-container">
                <NavBar />
                <h3>List of tourists of flight number {this.state.pk}</h3>
                <table>
                    <tr>
                        <th>
                            Id
                        </th>
                        <th>
                            First Name
                        </th>
                        <th>
                            Last Name
                        </th>
                        <th>
                            Username
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Birth date
                        </th>
                        <th>
                            Sex
                        </th>

                        <th>
                            Country
        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                    {/* Displaying tourists from touristsList */}
                    {this.state.listOfTourists.map(touristUrl => {
                        return (
                            <SingleTourist touristUrl={touristUrl} flightPk={this.state.pk} handleDeletion={this.handleDeletion.bind(this)} listOfTourists={this.state.listOfTourists} />
                        )
                    })}
                </table>
            </div>
        );
    }
}

export default withRouter(TouristList);
























// class TouristList extends Component {
//     state = { 
//         pk:this.props.match.params.flightNumber,
//         listOfTourists:[],
//      }


// componentDidMount(){
//     axios.get(FLIGHTS_API_URL + this.state.pk + '/').then(response => {
//         this.setState({
//             listOfTourists:response.data.tourists
//         })

//     }).catch(error => {
//         console.log(error)
//     })
//     console.log(this.state.pk)
// }

// handleDeletion(touristPk){
// let url = TOURISTS_API_URL + touristPk + '/'
// let finallList = this.state.listOfTourists.splice(this.state.listOfTourists.indexOf(url), 1 );
// this.setState({
//   listOfTourists:finallList
// })
//     }


//     render() { 
//         return ( 
//             <div className="tourists-container">
//             <NavBar />
//                 <h3>List of tourists of flight number {this.state.pk}</h3>
//                 <table>
//                     <tr>
//                         <th>
//                             Id
//                         </th>
//                         <th>
//                             First Name
//                         </th>
//                         <th>
//                             Last Name
//                         </th>
//                         <th>
//                             Username
//                         </th>
//                         <th>
//                             Email
//                         </th>
//                         <th>
//                             Birth date
//                         </th>
//                         <th>
//                             Sex
//                         </th>

//     <th>
//         Country
//         </th>
//         <th>
//                             Action (dobule click)
//                         </th>
//                     </tr>
//                     {/* Displaying tourists from touristsList */}
// {this.state.listOfTourists.map(touristUrl => {
//     return (
//         <SingleTourist touristUrl={touristUrl} flightPk={this.state.pk} handleDeletion={this.handleDeletion}/>
//     )
// })}
//                 </table>
//                 <Link to={'/add-tourist-to-flight/' + this.state.pk + '/'}>Add tourist</Link>
//             </div>
//          );
//     }
// }

// export default TouristList;