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
      userRole: undefined,
      showToast: false,
      toastText: '',
      toastColor: ''
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    if (token && userRole) {
      this.setState({ loggedInUser: true, userRole: userRole });
    }
  }

  setUserRole = (role) => {
    this.setState({ userRole: role });
    localStorage.setItem("userRole", role);
  }

  render() {
    const { loggedInUser, userRole } = this.state;
    const token = localStorage.getItem("token");

    const PrivateRoute = ({ component: Component, role, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          token && (!role || userRole === role) ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );

    return (
      <>
        <Navigation userRole={userRole} />

        <main>
          <AnimatePresence>
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute exact path="/courses" component={CoursesList} />
              <Route exact path="/signup" component={Signup} />
              <Route
                exact
                path="/login"
                render={(props) => <Login {...props} setUserRole={this.setUserRole} />}
              />
              <PrivateRoute exact path="/courses/:course_id" component={CourseDetails} />
              <PrivateRoute
                path="/teacher-dashboard"
                component={CoursesList}  // Temporary placeholder
                role="teacher"
              />
              <PrivateRoute
                path="/student-dashboard"
                component={CoursesList}  // Temporary placeholder
                role="student"
              />
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