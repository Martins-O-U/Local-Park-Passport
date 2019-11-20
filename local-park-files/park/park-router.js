const router = require('express').Router();
const db = require('./park-router-helper')
const {authenticate} = require('../Auth/authenticators')


router.get("/parks", (req, res) => {
  db.getParks()
      .then(parks => {
          res.status(200).json(parks)
      })
      .catch(error => {
          res.status(500).json({ message: "Oops!, Something went wrong. " + error.message})
      })
})


router.get("/parks/:id", (req, res) => {
    db.getDetailedPark(req.params.id)
        .then(park => {
            if(park){
                res.status(200).json(park)
            }else{
                res.json({message: `Park with ID ${req.params.id} does not exist in the database`})
            }
        })
        .catch(error => {
            res.status(500).json({message: "Something went wrong:-" + error.message })
        })
})

router.get("/parksByRating/:id", (req, res) => {
    db.findParkBy(req.params.id)
        .then(park => {
            if(park){
                res.status(200).json(park)
            }else{
                res.json({message: `Park with rating of ${req.params.id} does not exist in the database`})
            }
        })
        .catch(error => {
            res.status(500).json({message: "Something went wrong:-" + error.message })
        })
})

router.post("/parks", authenticate, (req, res) => {
    let {name, description, city, country} = req.body;
    if(!name && !description && !city && !country){
      res.json({message: "Please provide all needed columns (name, description, city and country)"})
    }else{
      db.addPark(req.body)
      .then(saved => {
          res.status(201).json(saved)
      })
      .catch(error => {
          res.status(500).json(error.message);
      })
    }
})


router.put("/parks/:id", authenticate, (req, res) => {
    db.findParkById(req.params.id)
    .then(found =>{
        if(found){
            db.updatePark(req.body, req.params.id)
                .then(park => {
                    res.status(200).json({message: `${park} park with ID ${req.params.id} got Edited`})
                })
        }else{
            res.status(404).json({ message: 'Could not find a park with given id' });
        }
    })
    .catch(error => {
        res.status(500).json({ message: "something went wrong:-. " + error.message})
    })

})


router.delete('/parks/:id', authenticate, (req, res) => {
  
    db.removePark(req.params.id)
    .then(deleted => {
      if (deleted) {
        res.json({ Message: `A park with ID ${req.params.id} got deleted` });
      } else {
        res.status(404).json({ message: 'Could not find a park with given id' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Failed to delete park ' + error.message});
    });
});


module.exports = router