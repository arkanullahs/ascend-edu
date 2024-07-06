import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './layout/navigation/Navigation';
import Footer from './layout/Footer/Footer';
import Home from './pages/Home/Home';
import CoursesList from './pages/Courses-list/Courses-list';
import CourseDetails from './pages/Course-details/Course-details';

class App extends Component {

  constructor() {
    super();
    this.state = {
      loggedInUser: undefined,
      teacher: undefined,
      showToast: false,
      toastText: '',
      toastColor: ''
    };
  }

  render() {
    const token = localStorage.getItem("token");

    return (
      <>
        <Navigation />

        <main>
          <AnimatePresence>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/courses" render={props => token ? <CoursesList {...props} /> : <Redirect to="/login" />} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/courses/:course_id" render={props => token ? <CourseDetails {...props} /> : <Redirect to="/login" />} />
              <Route path="*" render={() => <Redirect to="/" />} />
            </Switch>
          </AnimatePresence>
        </main>

        <Footer />
      </>
    );
  }
}

export default App;
