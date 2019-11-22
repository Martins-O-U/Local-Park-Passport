const router = require('express').Router();
const db = require('./users-route-helper')
const bcrypt = require('bcryptjs')
const {authenticate, generateToken} = require('../Auth/authenticators')



router.post("/register", (req, res) => {
  let user = req.body;
  let {username, password, email, fullname} = req.body;
    if(username && password && email && fullname){
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;
        db.addUsers(user)
            .then(saved => {
                res.status(201).json(saved)
            })
            .catch(error => {
                res.status(500).json(error.message);
            })
    }else{
        res.status(400).json({message: "Please Provide needed columns (fullname, email, username and password)"})
    }
})

router.post("/login", (req, res) => {
  let { username, password } = req.body;
    if(username && password){
        db.findUsersBy({username}).first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({
                    message:`Welcome, on board ${user.username}`, token
                })
            } else {
                res.status(401).json({ message: "Invalid Credentials!" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Oops!, Something went wrong:- "+ error.message});
        })
    }else{
        res.status(400).json({message: "Please Provide username and password"})

  }

})

router.get("/users", (req, res) => {
  db.getUsers()
      .then(users => {
          res.status(200).json(users)
      })
      .catch(error => {
          res.status(500).json({ message: "Oops!, Something went wrong. " + error.message})
      })
})

router.get("/users/:id", (req, res) => {
    db.findUsersById(req.params.id)
        .then(user => {
            if(user){
                res.status(200).json(user)
            }else{
                res.json({message: `user with ID ${req.params.id} does not exist in the database`})
            }
        })
        .catch(error => {
            res.status(500).json({message: "Something went wrong:-" + error.message })
        })
})


router.put("/users/:id", authenticate, (req, res) => {
    db.findUsersById(req.params.id)
    .then(found =>{
        if(found){
            db.updateUser(req.body, req.params.id)
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

})


router.delete('/users/:id', authenticate, (req, res) => {
  
    db.removeUser(req.params.id)
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