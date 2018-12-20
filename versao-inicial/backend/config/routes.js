const admin = require('./admin');

module.exports = app => {
    app.post('/signup', app.api.user.save);
    app.post('/signin', app.api.auth.signin);
    app.post('/validateToken', app.api.auth.validateToken);
    
    const authenticate = app.config.passport.authenticate();

    app.route('/users')
        .all(authenticate)
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get));
    app.route('/users/:id')
        .all(authenticate)
        .put(admin(app.api.user.save))
        .delete(admin(app.api.user.remove))
        .get(admin(app.api.user.getById));
    

    app.route('/categories')
        .all(authenticate)
        .post(admin(app.api.category.save))
        .get(admin(app.api.category.get));
    
    app.route('/categories/tree')
        .all(authenticate)
        .get(app.api.category.getTree);

    app.route('/categories/:id')
        .all(authenticate)  
        .put(admin(app.api.category.save))
        .delete(admin(app.api.category.remove))
        .get(app.api.category.getById);
    
    
    app.route('/articles')
        .all(authenticate)
        .post(admin(app.api.article.save))
        .get(admin(app.api.article.get));
    
    app.route('/articles/:id')
        .all(authenticate)
        .put(admin(app.api.article.save))
        .delete(admin(app.api.article.remove))
        .get(app.api.article.getById);

    app.route('/categories/:id/articles')
        .all(authenticate)
        .get(app.api.article.getByCategory);

    app.route('/stats')
        .all(authenticate)
        .get(app.api.stat.get);
}