const express = require('express');
const router = express.Router();
const ClassDataModel = require('../models/classInfo');

const updateEach = async items => {
    const entriesArray = Object.keys(items);

    const results = await Promise.all(
        entriesArray.map(key => {
            return ClassDataModel.update(key, items[key]);
        })
    );
    return results;
};

/* GET home page. */
router.get('/', async(req, res, next) => {
    const topicData = await ClassDataModel.getAllTopicData();
    const topicStatusList = await ClassDataModel.getAllClassStatus();

    res.render('template', {
        locals: {
            title: 'Class Topic Ranking',
            topicData: topicData,
            topicStatusList: topicStatusList
        },
        partials: {
            partial: 'partial-index'
        }
    });
});

router.post('/update', async(req, res) => {
    const addUpdatedValues = await updateEach(req.body);

    if (addUpdatedValues) {
        res.status(200).redirect('/')
    } else {
        res.sendStatus(500);
    }
});

module.exports = router;