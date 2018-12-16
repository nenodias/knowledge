module.exports = app => {
    app.route('/users')
        .post(app.api.users.save)
        .get(app.api.users.get);
    app.route('/users/:id')
        .put(app.api.users.save)
        .get(app.api.users.getById);
    
    app.route('/categories')
        .post(app.api.categories.save)
        .get(app.api.categories.get);
    app.route('/categories/:id')
        .put(app.api.categories.save)
        .delete(app.api.categories.remove)
        .get(app.api.categories.getById);
}