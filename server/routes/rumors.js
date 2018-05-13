const express = require('express');
const router = express.Router();

const db = require('../models');
const Rumor = db.rumor;
const User = db.user;

const Op = require('Sequelize').Op;

router.get('/', (req, res) => {
  return Rumor.findAll({
    where: {
      // not deleted
      deletedAt: null,
      // and less than 3 offensive points
      offensive: {
        [Op.lt]: 3
      },
      // and any of the flags (1, 2, or 3) were not made by the current user
      // flag_one != req.user.id
      // flag_two != req.user.id
      // flag_three != req.user.id
      flag_one: {
        [Op.ne]: req.user.id
      },
      flag_two: {
        [Op.ne]: req.user.id
      },
      flag_three: {
        [Op.ne]: req.user.id
      }
    },
    order: [['points', 'DESC']],
    include: [
      { model: User, as: 'user',
        attributes: ['username', 'id']
      }
    ]
  })
  .then(rumors => {
    return res.json(rumors);
  });
});


router.post('/', (req, res) => {
  let data = req.body;
  return Rumor.create(data)
  .then((rumor) => {
    return Rumor.findById(rumor.id, {
      include:[
        { model: User, as: 'user',
          attributes: ['username', 'id']
        }
      ]
    })
    .then((foundRumor) => {
      return res.json(foundRumor);
    })
    .catch((err) => {
      console.log(err);
    });
  });
});

router.put('/:id', (req, res) => {
  let points = req.body.points;
  let id = req.body.id;
  if(points===0){
    return Rumor.findById(id)
    .then((rumor) => {
      return rumor.update({
        points: parseInt(rumor.points, 10)-1
      }, {
        returning: true,
        plain: true
      })
      .then((downVotedRumor) => {
        return Rumor.findById(id, {
          include: [
            { model: User, as: 'user',
              attributes: ['username', 'id']
            }
          ]
        })
        .then((foundRumor) => {
          return res.json(foundRumor);
        });
      });
    });
  }else{
    return Rumor.findById(id)
    .then((rumor) => {
      return rumor.update({
        points: parseInt(rumor.points, 10)+1
      }, {
        returning: true,
        plain: true
      })
      .then((upVotedRumor) => {
        return Rumor.findById(id, {
          include: [
            { model: User, as: 'user',
              attributes: ['username', 'id']
            }
          ]
        })
        .then((newRumor) => {
          return res.json(newRumor);
        });
      });
    });
  }
});


router.put('/:id/inappropriate', (req, res) => {
  let userId = req.body.user;
  let id = req.body.id;
  return Rumor.findById(id)
  .then(rumor => {
    if(rumor.flag_one === 0){
      return rumor.update({
        offensive : (rumor.offensive + 1),
        flag_one : userId
      }, {
        returning: true,
        plain: true
      })
      .then(rumor => {
        return res.json(rumor);
      });
    }else if((rumor.flag_two === 0) && (rumor.flag_one != userId)){
      return rumor.update({
        offensive : (rumor.offensive + 1),
        flag_two : userId
      }, {
        returning: true,
        plain: true
      })
      .then(rumor => {
        return res.json(rumor);
      });
    }else if((rumor.flag_three === 0) && (rumor.flag_two != userId) && (rumor.flag_one != userId)){
      return rumor.update({
        offensive : (rumor.offensive + 1),
        flag_three : userId
      }, {
        returning: true,
        plain: true
      })
      .then(rumor => {
        return res.json(rumor);
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });
});


module.exports = router;