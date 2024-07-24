import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, RadarChart, Radar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell } from 'recharts';

const Home = () => {
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

  const radarChartData = [
    { subject: 'Math', A: 120, B: 110, fullMark: 150 },
    { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
    { subject: 'English', A: 86, B: 130, fullMark: 150 },
    { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
    { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
    { subject: 'History', A: 65, B: 85, fullMark: 150 },
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
    { name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png' },
    { name: 'Tesla', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png' },
    { name: 'BUET', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/BUET_LOGO.svg/180px-BUET_LOGO.svg.png' },
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="home">
      <header className="hero frosty-glass">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <h1>বাংলাদেশ শিখবে, লাইভে!</h1>
          <p>স্কিল শেখার মাধ্যমে বদলে ফেলুন নিজের ভবিষ্যৎ</p>
          <div className="hero-actions">
            <button className="btn btn-primary frosty-button">শেখা শুরু করুন</button>
            <button className="btn btn-secondary frosty-button">শেখানো শুরু করুন</button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="hero-image"
        >
          <img src="https://i.ibb.co/xM3yDXZ/hero.gif" alt="E-learning illustration" />
        </motion.div>
      </header>

      <section className="features frosty-glass">
        <h2>Our Features</h2>
        <div className="feature-cards">
          {['Live Classes', 'Expert Instructors', 'Interactive Learning', 'Progress Tracking'].map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card frosty-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3>{feature}</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
            <h3>Subject Performance Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name="Student A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Student B" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
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

      <section className="trusted-by frosty-glass">
        <h2>Trusted By Industry Leaders</h2>
        <div className="logo-container">
          {companyLogos.map((company, index) => (
            <motion.div
              key={index}
              className="logo-card frosty-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img src={company.logo} alt={`${company.name} logo`} className="company-logo" />
              <p>{company.name}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;