module.exports = app => {

    app.use('/api/courses', require('./courses.routes.js'))
}