const router = require('express').Router();
const db = require('./rating-router-helper')
const {authenticate} = require('../Auth/authenticators')



router.get("/rating", (req, res) => {
  db.getRating()
      .then(rating => {
          res.status(200).json(rating)
      })
      .catch(error => {
          res.status(500).json({ message: "Oops!, Something went wrong. " + error.message})
      })
})


router.get("/rating/:id", (req, res) => {
    db.findRatingById(req.params.id)
        .then(rating => {
            if(rating){
                res.status(200).json(rating)
            }else{
                res.json({message: `rating with ID ${req.params.id} does not exist in the database`})
            }
        })
        .catch(error => {
            res.status(500).json({message: "Something went wrong:-" + error.message })
        })
})


router.post("/rating", authenticate, (req, res) => {
    let {rating, comment, park_id, user_id} = req.body;
    if(!rating && !comment && !park_id && !user_id){
      res.json({message: "Please provide all needed columns (rating, comment, park_id and user_id)"})
    }else{
      db.addRating(req.body)
      .then(saved => {
          res.status(201).json(saved)
      })
      .catch(error => {
          res.status(500).json(error.message);
      })
    }
})

router.put("/rating/:id", authenticate, (req, res) => {
    let {rating, comment} = req.body;
    if(!rating || !comment){
      res.json({message: "Please use valid columns (rating, comment, park_id and user_id)"})
    }else{
        db.findRatingById(req.params.id)
        .then(found =>{
            if(found){
                db.updateRating(req.body, req.params.id)
                    .then(user => {
                        res.status(200).json({message: `${user} User with ID ${req.params.id} got Edited`})
                    })
            }else{
                res.status(404).json({ message: 'Could not find a User with given id' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "something went wrong:-. " + error.message})
        })
    }

})


router.delete('/rating/:id', authenticate, (req, res) => {
  
    db.removeRating(req.params.id)
    .then(deleted => {
      if (deleted) {
        res.json({ Message: `A user with ID ${req.params.id} got deleted` });
      } else {
        res.status(404).json({ message: 'Could not find a user with given id' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Failed to delete project ' + error.message});
    });
  });

module.exports = router