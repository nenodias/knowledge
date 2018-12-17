const queries = require('./queries');

module.exports = app => {
    const { existsOrError } = app.api.validation;

    const save = async (req, res) => {
        const article = { ...req.body };
        if (req.params.id) {
            article.id = req.params.id;
        }

        try {
            existsOrError(article.name, 'Nome não informado');
            existsOrError(article.description, 'Descrição não informada');
            existsOrError(article.categoryId, 'Categoria não informada');
            existsOrError(article.userId, 'Autor não informado');
            existsOrError(article.content, 'Conteúdo não informado');
        } catch (err) {
            return res.status(400), send(err);
        }

        try {
            if (article.id) {
                await app.db('articles')
                    .update(article)
                    .where({ id: article.id })
            } else {
                await app.db('articles')
                    .insert(article)
            }
            return res.status(204).send();
        } catch (err) {
            return res.status(500).send(err);
        }
    };

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('articles')
                .where({ id: req.params.id }).del();
            existsOrError(rowsDeleted, 'Artigo não encontrado');
            return res.status(204).send();
        } catch (err) {
            return res.status(404).send(err);
        }
    };

    const limit = 10; // Usado para paginação

    const get = async (req, res) => {
        const page = req.query.page || 1;
        const result = await app.db('articles').count('id').first();
        const count = parseInt(result.count);

        app.db('articles')
            .select('id', 'name', 'description')
            .limit(limit).offset(page * limit - limit)
            .then(articles => res.json({ data: articles, count, limit }))
            .catch(err => res.status(500).send(err));
    };

    const getById = async (req, res) => {
        app.db('articles')
            .where({ id: req.params.id })
            .first()
            .then(article => {
                article.content = article.content.toString();
                res.json(article);
            }).catch(err => res.status(500).send(err));
    };

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id;
        const page = req.query.page || 1;
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId);
        const ids = categories.map(c => c.id);

        app.db({ a:'articles', u:'users' })
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn({ categoryId: ids })
            .orderBy('a.id', 'desc')
            .then(articles => res.json(articles))
            .catch(err => res.status(500).send(err));

    };

    return { save, remove, get, getById, getByCategory };
};