module.exports = app => {

    const { existsOrError, notExistsOrError } = app.api.validation;

    const save = async (req, res) => {
        const category = { ...req.body };
        if (req.params.id) {
            category.id = req.params.id;
        }
        try {
            existsOrError(category.name, 'Nome não informado');
        } catch (err) {
            return res.status(400).send(err);
        }
        try {
            if (category.id) {
                await app.db('categories')
                    .update(category)
                    .where({ id: category.id })
            } else {
                await app.db('categories')
                    .insert(category)
            }
            return res.status(204).send();
        } catch (err) {
            return res.status(500).send(err);
        }
    };

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da categoria não informado');
            const subcategory = await app.db('categories')
                .where({ parentId: req.params.id });
            notExistsOrError(subcategory, 'Categoria possui subcategorias');

            const articles = await app.db('articles')
                .where({ categoryId: req.params.id });
            notExistsOrError(articles, 'Categoria possui artigos');

            const rowsDeleted = await app.db('categories')
                .where({ id: req.params.id }).del();
            existsOrError(rowsDeleted, 'Categoria não encontrada');

            res.status(204).send();
        } catch (err) {
            res.status(400).send(msg);
        }
    };

    const withPath = categories => {
        const getParent = (categories, parentId) => {
            const parent = categories.filter(parent => parent.id == parentId);
            return parent.length ? parent[0] : null;
        }

        const categoriesWithPath = categories.map(category => {
            let path = category.name;
            let parent = getParent(categories, category.parentId);

            while (parent) {
                path = `${parent.name} > ${path}`;
                parent = getParent(categories, parent.parentId);
            }

            return { ...category, path };
        });

        categoriesWithPath.sort((a, b) => {
            if (a.path < b.path) {
                return -1;
            }
            if (a.path > b.path) {
                return 1;
            }
            return 0;
        });
        return categoriesWithPath;
    }

    const get = async(req, res) => {
        try {
            let categories = await app.db('categories');
            res.json(withPath(categories));
        } catch (err) {
            res.status(500).send(err);
        }
    };

    const getById = async(req, res) => {
        try {
            let category = await app.db('categories')
                .where({ id: req.params.id })
                .first();
            res.json(category);
        } catch (err) {
            res.status(500).send(err);
        }
    };

    return { save, remove, get, getById };
};