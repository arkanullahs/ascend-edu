import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import "./Home.css"
import { useHistory } from 'react-router-dom';
import { Video, Clock, HelpCircle, Award } from 'react-feather';

const Home = () => {
  const history = useHistory();

  const handleStudentDashboard = () => {
    history.push('/student-dashboard');
  };

  const handleTeacherDashboard = () => {
    history.push('/signup');
  };

  const lineChartData = [
    { name: 'Jan', students: 4000, courses: 2400 },
    { name: 'Feb', students: 3000, courses: 1398 },
    { name: 'Mar', students: 9800, courses: 2000 },
    { name: 'Apr', students: 3908, courses: 2780 },
    { name: 'May', students: 4800, courses: 1890 },
    { name: 'Jun', students: 3800, courses: 2390 },
  ];

  const pieChartData = [
    { name: 'Technology', value: 400 },
    { name: 'Language', value: 300 },
    { name: 'Business', value: 300 },
    { name: 'Arts', value: 200 },
  ];

  const barChartData = [
    { name: 'Course A', students: 4000, rating: 2400 },
    { name: 'Course B', students: 3000, rating: 1398 },
    { name: 'Course C', students: 2000, rating: 9800 },
    { name: 'Course D', students: 2780, rating: 3908 },
    { name: 'Course E', students: 1890, rating: 4800 },
    { name: 'Course F', students: 2390, rating: 3800 },
  ];

  const companyLogos = [
    { name: 'Google', logo: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png' },
    { name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png' },
    { name: 'Tesla', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png' },
    { name: 'HU', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Harvard_University_logo.svg' },
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1920px-Microsoft_logo_%282012%29.svg.png' },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];


  const features = [
    {
      title: 'Live Classes',
      description: 'Engage in real-time with expert instructors and fellow learners. Participate in interactive discussions and gain hands-on experience. Stay connected with peers through live Q&A sessions.',
      icon: <Video />, // Using the Video icon
      color: '#F7E2E2' // Light Pink
    },
    {
      title: 'Self-Paced Learning',
      description: 'Learn at your own speed with our flexible course structure. Access materials anytime, anywhere, and progress at your convenience. Balance your learning with personal and professional commitments.',
      icon: <Clock />, // Using the Clock icon
      color: '#D6EBF5' // Powder Blue
    },
    {
      title: 'Interactive Quizzes',
      description: 'Test your knowledge with fun and challenging assessments. Receive instant feedback and track your progress. Reinforce your learning through practical, scenario-based questions.',
      icon: <HelpCircle />, // Using the HelpCircle icon
      color: '#D0EDD6' // Pale Green
    },
    {
      title: 'Certificate Programs',
      description: 'Earn recognized certifications to boost your career. Validate your skills and enhance your resume. Join a community of certified professionals and expand your network.',
      icon: <Award />, // Using the Award icon
      color: '#EECFFE' // Plum
    }
  ];

  return (
    <div className="home">
      <header className="hero frosty-glass">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          className="hero-content"
        >
          <h1>বাংলাদেশ শিখবে, লাইভে!</h1>
          <p>স্কিল শেখার মাধ্যমে বদলে ফেলুন নিজের ভবিষ্যৎ</p>
          <div className="hero-actions">
            <button
              className="btn btn-primary frosty-button"
              onClick={handleStudentDashboard}
            >
              শেখা শুরু করুন
            </button>
            <button
              className="btn btn-secondary frosty-button"
              onClick={handleTeacherDashboard}
            >
              শেখানো শুরু করুন
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0 }}
          className="hero-image"
        >
          <img src="https://cdn.ostad.app/public/upload/2024-02-18T10-44-42.948Z-2dsdss.webp" alt="E-learning illustration" />
        </motion.div>
      </header>

      <section className="trusted-by">
        <h6>AS FEATURED IN</h6>
        <div className="logo-container">
          {companyLogos.map((company, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img src={company.logo} alt={`${company.name} logo`} className="company-logo" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="features frosty-glass">
        <h2>Enhance Your Learning Experience</h2>
        <p className="featuretext">Our platform offers a variety of features to support your educational journey:</p>
        <div className="feature-cards">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card frosty-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="feature-card-header">
                <div className="icon-background" style={{ backgroundColor: feature.color }}>
                  {feature.icon} {/* Rendering the Feather Icon directly */}
                </div>
                <div className="digit">{`0${index + 1}`}</div>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="metrics frosty-glass">
        <h2>Our Platform Insights</h2>
        <div className="chart-container">
          <div className="chart-card glass-card">
            <h3>Student Growth & Course Offerings</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="students" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="courses" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-card glass-card">
            <h3>Course Category Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-card glass-card">
            <h3>Course Popularity and Ratings</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="students" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="rating" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;