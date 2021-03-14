const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
    Category.findAll({
        include: [
            {
                model: Product,
            }
        ]
    })
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
    Category.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Product,
            }
        ]
    })
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
  // create a new category
    Category.create(req.body)
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
    Category.update(req.body, {
            where: {
                id: req.params.id
            }
    })
        .then(dbCategoryData => {
            if (!dbCategoryData[0]) {
                return res.status(404).json({ message: "No category found!" });
            };

            return res.json(dbCategoryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCategoryData => {
            console.log(dbCategoryData);
            if (!dbCategoryData) {
                return res.status(404).json({ message: "No category found!" });
            };

            return res.json(dbCategoryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
