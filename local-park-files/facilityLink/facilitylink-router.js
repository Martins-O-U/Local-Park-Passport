const router = require('express').Router();
const db = require('./facilityLink-router-helper')
const {authenticate} = require('../Auth/authenticators')


router.get("/links", (req, res) => {
  db.getFacilitylinked()
      .then(parks => {
          res.status(200).json(parks)
      })
      .catch(error => {
          res.status(500).json({ message: "Oops!, Something went wrong. " + error.message})
      })
})


router.get("/links/:id", (req, res) => {
    db.findfacilitykById(req.params.id)
        .then(park => {
            if(park){
                res.status(200).json(park)
            }else{
                res.json({message: `Park link with ID ${req.params.id} does not exist in the database`})
            }
        })
        .catch(error => {
            res.status(500).json({message: "Something went wrong:-" + error.message })
        })
})

router.get("/linked/:id", (req, res) => {
    db.findFacility(req.params.id)
        .then(park => {
            if(park){
                res.status(200).json(park)
            }else{
                res.json({message: `Park with link of ${req.params.id} does not exist in the database`})
            }
        })
        .catch(error => {
            res.status(500).json({message: "Something went wrong:-" + error.message })
        })
})

router.post("/links/:id", authenticate, (req, res) => {
    let park_id = req.params.id
    let {facility_id} = req.body;
    if(!facility_id){
      res.json({message: "Please provide all needed columns (park_id && facility_id)"})
    }else{
      db.addLink({facility_id, park_id})
      .then(saved => {
          res.status(201).json({message: saved.length + " facility Added"})
      })
      .catch(error => {
          res.status(500).json(error.message);
      })
    }
})


router.put("/links/:id", authenticate, (req, res) => {
    db.findfacilitykById(req.params.id)
    .then(found =>{
        if(found){
            db.updatefacilityLink(req.body, req.params.id)
                .then(park => {
                    res.status(200).json({message: `${park} park link with ID ${req.params.id} got Edited`})
                })
        }else{
            res.status(404).json({ message: 'Could not find a park link with given id' });
        }
    })
    .catch(error => {
        res.status(500).json({ message: "something went wrong:-. " + error.message})
    })

})


router.delete('/links/:id', authenticate, (req, res) => { 
    db.removeFacilityLink(req.params.id)
    .then(deleted => {
      if (deleted) {
        res.json({ Message: `A park link with ID ${req.params.id} got deleted` });
      } else {
        res.status(404).json({ message: 'Could not find a park link with given id' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Failed to delete park link ' + error.message});
    });
});


module.exports = router