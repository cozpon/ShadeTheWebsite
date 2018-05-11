const express = require('express');
const router = express.Router();

const db = require('../models');
const Rumor = db.rumor;
const User = db.user;

const Op = require('Sequelize').Op;

router.get('/', (req, res) => {
  return Rumor.findAll({
    where: {
      deletedAt: null,
      offensive: {
        [Op.lte]: 3
      },
      [Op.or]: [
        {
          flag_one: {
            //note: this will be req.user.id, but for accessing the API when we're not logged in, I'm leaving 1 as a placeholder.
            [Op.ne]: req.user.id
          }
        },
        {
          flag_one: null
        }
      ],
      [Op.or]: [
        {
          flag_two: {
            [Op.ne]: req.user.id
          }
        },
        {
          flag_two: null
        }
      ],
      [Op.or]: [
        {
          flag_three: {
            [Op.ne]: req.user.id
          }
        },
        {
          flag_three: null
        }
      ],
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
    if(rumor.flag_one === null){
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
    }else if((rumor.flag_two === null) && (rumor.flag_one != userId)){
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
    }else if((rumor.flag_three === null) && (rumor.flag_two != userId) && (rumor.flag_one != userId)){
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