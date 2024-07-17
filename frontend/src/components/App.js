import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navigation from './layout/navigation/Navigation';
import Footer from './layout/Footer/Footer';
import Home from './pages/Home/Home';
import CoursesList from './pages/Course-List/CourseList';
import CourseDetails from './pages/Course-Info/CourseDetails';
import Login from "./pages/Login/index";
import Signup from "./pages/Signup/index";
import TeacherDashboard from './pages/Teacher-Dashboard/TeacherDashboard';
import StudentDashboard from './pages/Students-Dashboard/StudentDashboard';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Navigation />

      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/courses" component={CoursesList} role="student" />
          <PrivateRoute path="/teacher-dashboard" component={TeacherDashboard} role="teacher" />
          <PrivateRoute path="/student-dashboard" component={StudentDashboard} role="student" />
          <PrivateRoute exact path="/courses/getOneCourse/:courseId" component={CourseDetails} role="student" />

          <Redirect to="/" />
        </Switch>
      </main>

      <Footer />
    </Router>
  );
}
export default App;