var UserController = require('../controllers/UserController'); 
var ChannelController = require('../controllers/ChannelController');
/**
 * Router class to add controller routes to Express
 *
 * @class
 *
 */
class Router{

    constructor(){
        this.setVariables();
        this.addBaseRoutes();
        this.addControllers();
        this.handle404s();
        this.handleErrors();
    }

    /**
     * Assigns middleware to add session errors
     * to local values
     */
    setVariables(){
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
        AraDTApp.get('/index', this.index);
        AraDTApp.get('/chat', this.chat);
        AraDTApp.get('/login', this.login);
        AraDTApp.get('/contact', this.contact);
        AraDTApp.get('/chat2', this.chat2);
        AraDTApp.get('/chat3', this.chat3);
        AraDTApp.get('/about', this.about);
        AraDTApp.get('/account', this.account);
    }

    index(request, response, next) {
        response.render('index')
    }

    chat(reuqest,response, next) {
        response.render('chat')
    }

    account(request, response, next) {
        response.render('account')
    }

    login(request, response, next) {
        response.render('login')
    }

    contact(request, response, next) {
        response.render('contact')
    }

    chat2(request, response, next) {
        response.render('chat2')
    }

    about(request, response, next) {
        response.render('about')
    }

    /**
     * Add controllers for key models, 
     * e.g. Users, Channels, Messages
     */
    addControllers() {
        var userController = new UserController();
        var channelController = new ChannelController();
    };

    // Renders home page ./views/index.ejs
    index(request, response, next) {
        response.render('index');
    }

    // Adds middleware to add HTTP Error to 404 requests
    handle404s() {
        AraDTApp.use(function(request, response, next) {
            next(createError(404));
        });
    }

    // Adds middleware to handle server errors
    handleErrors() {
        
        //  error handler
        AraDTApp.use(function(error, request, response, next) {
            if (error) {
                console.log('Error', error);
            }
            //  set locals, only providing error in development
            response.locals.message = error.message;
            response.locals.error = error;
            
            //  render the error page
            response.status(error.status || 500);
            response.render('error');
        });
    }

}
module.exports = Router;
  