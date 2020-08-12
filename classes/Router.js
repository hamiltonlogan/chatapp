var UserController = require('../controllers/UserController');
var createError = require('http-errors');

/**
 * Router class to add controller routes to express
 * 
 * @class
 * 
 */
class Router{
    
    constructor(){
        this.setVariable();
        this.addBaseRoutes();
        this.addControllers();
        this.handle404s();
        this.handleErrors();
    }

    /**
     * Assign middleware to add session errors
     * to local values
     */
    setVariable(){
        AraDTApp.use(function(request, response, next) {
            if (request.session.errors) {
                response.locals.errors = request.session.errors;
            }
            request.session.errors = {};
            request.session.errors.general = [];
            next();
        });
    }

    /**
     * Adds simple routes that only require a view,
     * no controllers or models
     */
    addBaseRoutes() {
        AraDTApp.get('/', this.index);
    }

    /**
     * Add controllers for key models,
     * e.g. User, Channels, Messages
     */
    addControllers() {
        var UserController = new UserController();
    }

    // Renders home page ./views/index.ejs
    index(request , response, next) {
        response.render('index');
    }

    // Adds middlewarre to add HTTP Error to 404 requests
    handle404s() {
        AraDTApp.use(function(request, response, next) {
            next(createError(404));
        })
    }

    // Adds middleware to handle server errors
    handleErrors() {
        
        // Error 
        AraDTApp.use(function(error, request, response, next) {
            if (error) {
                console.log('Error', error);
            }
            // Ser locals, only providing error in development
            response.locals.message = error.message;
            response.locals.error = error;

            // render the error page
            response.status(error.status || 500);
            response.render('error');
        });
    }
}

module.exports = Router;