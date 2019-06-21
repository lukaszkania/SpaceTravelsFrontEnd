import React, { Component } from 'react';
import HomePage from './components/homepage/HomePage';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Tourists from './components/tourists/Tourists';
import Flights from './components/flights/Flights';
import TouristList from './components/touristList/TouristList';
import AddFlight from './components/addForms/addFlight/AddFlight';
import AddTourist from './components/addForms/addTourist/AddTourist';
import DeleteFlight from './components/deleteForm/deleteFlight/DeleteFlight';
import EditFlight from './components/editForms/editFlight/EditFlight';
import EditTourist from './components/editForms/editTourist/EditTourist';
import DeleteTourist from './components/deleteForm/deleteTourist/DeleteTourist';
import AddFlightToTourist from './components/addFlightToTourist/AddFlightToTourist';
import UserFlightsList from './components/userFlightsList/UserFlightsList';
import AddTouristToFLight from './components/addTouristToFlight/AddTouristToFlight';
import PageNotFound from './components/pageNotFound/PageNotFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>

            <Route exact path="/" component={HomePage}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>

            {/* FLIGHTS */}
            <Route exact path="/flights" component={Flights}></Route>
            <Route exact path="/add-flight" component={AddFlight}></Route>
            <Route exact path="/delete-flight/:flightNumber" component={DeleteFlight}></Route>
            <Route exact path="/edit-flight/:flightNumber" component={EditFlight}></Route>
            <Route exact path="/flight-passengers/:flightNumber" component={TouristList}></Route>
            <Route exact path="/add-flight-to-tourist/:touristNumber" component={AddFlightToTourist}></Route>

            {/* TOURISTS */}
            <Route exact path="/tourists" component={Tourists}></Route>
            <Route exact path="/add-tourist" component={AddTourist}></Route>
            <Route exact path="/delete-tourist/:touristNumber" component={DeleteTourist}></Route>
            <Route exact path="/edit-tourist/:touristNumber" component={EditTourist}></Route>
            <Route exact path="/tourist-flights/:touristNumber" component={UserFlightsList}></Route>
            <Route exact path="/add-tourist-to-flight/:flightNumber" component={AddTouristToFLight}></Route>

            <Route component={PageNotFound}></Route>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
