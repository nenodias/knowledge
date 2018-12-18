module.exports = app => {
    app.post('/signup', app.api.user.save);
    app.post('/signin', app.api.auth.signin);
    app.post('/validateToken', app.api.auth.validateToken);
    
    const authenticate = app.config.passport.authenticate();

    app.route('/users')
        .all(authenticate)
        .post(app.api.user.save)
        .get(app.api.user.get);
    app.route('/users/:id')
        .all(authenticate)
        .put(app.api.user.save)
        .get(app.api.user.getById);
    

    app.route('/categories')
        .all(authenticate)
        .post(app.api.category.save)
        .get(app.api.category.get);
    
    app.route('/categories/tree')
        .all(authenticate)
        .get(app.api.category.getTree);

    app.route('/categories/:id')
        .all(authenticate)  
        .put(app.api.category.save)
        .delete(app.api.category.remove)
        .get(app.api.category.getById);
    
    
    app.route('/articles')
        .all(authenticate)
        .post(app.api.article.save)
        .get(app.api.article.get);
    
    app.route('/articles/:id')
        .all(authenticate)
        .put(app.api.article.save)
        .delete(app.api.article.remove)
        .get(app.api.article.getById);

    app.route('/categories/:id/articles')
        .all(authenticate)
        .get(app.api.article.getByCategory);
}