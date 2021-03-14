const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
    Tag.findAll({
        include: [
            {
                model: Product
            }
        ]
    })
        .then(dbTagData => res.status(200).json(dbTagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
    Tag.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Product
        }
    })
        .then(dbTagData => res.status(200).json(dbTagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
  // create a new tag
    Tag.create(req.body)
        .then(dbTagData => res.status(200).json(dbTagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
    Tag.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbTagData => {
            console.log('dbTagData:', dbTagData);
            if (!dbTagData[0]) {
                return res.status(400).json({ message: "No tag found with this id" });
            };

            res.status(200).json(dbTagData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
    Tag.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbTagData => {
            if (!dbTagData) {
                return res.status(404).json({ message: 'No tag found with this id' });
            }

            res.status(200).json(dbTagData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
