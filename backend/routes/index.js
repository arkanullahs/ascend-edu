module.exports = app => {

    app.use('/api/courses', require('./courses.routes.js'))
    app.use('/api/teachers', require('./teachers.routes.js'))
}