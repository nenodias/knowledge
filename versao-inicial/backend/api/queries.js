module.exports = {
    categoryWithChildren: `
        WITH RECURSIVE subcategories (id) AS (
            SELECT id from categories WHERE id = ?
            UNION ALL 
            SELECT c.id FROM subcategories, categories c
                WHERE "parrentId" = subcategories.id
        )
        SELECT id FROM subcategories
    `   
}