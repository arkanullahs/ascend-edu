import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'


import Navigation from './layout/navigation/Navigation'
import Footer from './layout/Footer/Footer'
import Home from './pages/Home/Home'

import CoursesList from './pages/Courses-list/Courses-list'
import CourseDetails from './pages/Course-details/Course-details'




class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: undefined,
      teacher: undefined,
      showToast: false,
      toastText: '',
      toastColor: ''
    }
  }







  render() {
    return (
      <>
        <Navigation />

        <main>
          <AnimatePresence>
            <Switch>
              <Route exact path="/" render={props => <Home {...props} />} />
              <Route exact path="/courses" render={props => <CoursesList {...props} />} />
              <Route path="/courses/:course_id" render={props => <CourseDetails {...props} />} />
              {
              }
            </Switch>
          </AnimatePresence>
          { }
        </main>

        <Footer />
      </>
    )
  }
}

export default App
