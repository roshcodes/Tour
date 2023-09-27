const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
router.use(express.urlencoded({extended:false}));
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const special = require('../models/special');
const events = require('../models/events');
const db = "mongodb://localhost:27017/Special";
const bodyParser = require('body-parser');
router.use(bodyParser.json()); 
router.use(cors())
mongoose
    .connect(db,{
      useNewUrlParser: true,
      useUnifiedTopology: true 
    })
    .then(()=> console.log("connected to Database"))
    .catch((e)=> console.log("error",e));



function verifyToken(req, res, next) 
{
  if(!req.headers.authorization) 
  {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') 
  {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) 
  {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

// router.get('/events', (req,res) => {
//   let events = [
//     {
//       "name": "Raigad",
//       "description": "2 Days",
//       "Tour_Fees": "Tour Fees: Rs.5000",
//       "Tour_Operator": "Roshan Ashok Jadhav"
//     },
//     {
//       "name": "Lonavala",
//       "description": "2 Days",
//       "Tour_Fees": "Tour Fees: Rs.5000",
//       "Tour_Operator": "Roshan Ashok Jadhav"
//     },
//     {
//       "name": "Nashik",
//       "description": "2 Days",
//       "Tour_Fees": "Tour Fees: Rs.5000",
//       "Tour_Operator": "Roshan Ashok Jadhav"
//     },
//     {
//       "name": "Satara",
//       "description": "2Days",
//       "Tour_Fees": "Tour Fees: Rs.5000",
//       "Tour_Operator": "Roshan Ashok Jadhav"
//     },
//     {
//       "name": "Mumbai",
//       "description": "2 Days",
//       "Tour_Fees": "Tour Fees: Rs.5000",
//       "Tour_Operator": "Roshan Ashok Jadhav"
//     },
//     {
//       "name": "Pune",
//       "description": "2 Days",
//       "Tour_Fees": "Tour Fees: Rs.5000",
//       "Tour_Operator": "Roshan Ashok Jadhav"
//     }
//   ]
//   res.json(events)
// })



router.get('/events',(req,res)=>{
  events.find((err, val)=>
  {
    if (err) {
      console.log("Error");
    } else {
      res.json(val)
    }
  })
})


router.get('/special',verifyToken, (req,res)=>{
  special.find((err,val)=>  {
    if (err) {
      console.log("Error");
    } else {
      res.json(val)
    }
  })
})




// router.get('/special', verifyToken, (req, res) => {
//   let specialEvents = [
//     {
//       "name": "Kerala",
//       "description": "15 Days Tour",
//       "Tour_Fees": "Tour Fees: Rs.20,000",
//       "Tour_Operator": "Roshan Ashok Jadhav"
//     },
//     {
//       "name": "Amritsar",
//       "description": "15 Days Tour",
//       "Tour_Fees": "Tour Fees: Rs.20,000",
//       "Tour_Operator": "Roshan Ashok Jadhav"
//     },
//     {
//       "name": "Goa",
//       "description": "15 Days Tour",
//       "Tour_Fees": "Tour Fees: Rs.20,000",
//       "Tour_Operator": "Roshan Ashok Jadhav"
//     },
//     {
//       "name": "Kashmir",
//       "description": "15 Days Tour",
//       "Tour_Fees": "Tour Fees: Rs.20,000",
//       "Tour_Operator": "Roshan Ashok Jadhav"
//     },
//     {
//       "name": "Ladakh",
//       "description": "15 Days Tour",
//       "Tour_Fees": "Tour Fees: Rs.20,000",
//       "Tour_Operator": "Roshan Ashok Jadhav"
//     },
//     {
//       "name": "shimla",
//       "description": "15 Days Tour",
//       "Tour_Fees": "Tour Fees: Rs.20,000",
//       "Tour_Operator": "Roshan Ashok Jadhav"
//     }
//   ]
//   res.json(specialEvents)
// })


// router.post('/login', async(req, res) => {
// let use = req.body;
// if ((use.email === "roshan") && (use.password === "roshan")) 
// {
// let payload = {subject: 1}
// let token = jwt.sign(payload, 'secretKey')
// res.status(200).send({token})   
// } 
// else 
// {
//  res.status(401).send('Invalid Password')
// } 
// })
//////////////////////////////////////////////////////////////////////////////////////////////
// router.post('/events', async(req, res) => {
//     const user = new events({
//         email: req.body.email,
//         password: req.body.password,
//     })
//     user.save()
//         .then((_) => {
//             res.json({ success: true, message: "Account Created Successfully " });
//         })
//         .catch((err) => {
//             if(err.code ===11000){
//                 return res.json({success:false, message:"Account Has Already Created"});
//             }
//             res.json({ success: false, message: "Authentication fail" });
//         });
// });

// router.get('/events',(req,res,next)=>{
//   events.find().then(events=>{
//     res.status(200).send.json({
//       events:events
//     });
//   }).catch(err=>{
//     console.log(err);
//     res.status(500).json({
//       error:err
//     })
//   })
// })


// router.get('/special', verifyToken,(req,res,next)=>{
//   special.find().then(special=>{
//     res.status(200).json({
//       special:special
//     });
//   }).catch(err=>{
//     console.log(err);
//     res.status(500).json({
//       error:err
//     })
//   })
// })

router.post('/login', async(req,res) => {
  try{
      const email = req.body.email;
      const password = req.body.password;
      const useremail = await user.findOne({email:email});

      if(useremail.password === password) {
         let payload = {subject: 1}
         let token = jwt.sign(payload, 'secretKey')
         res.status(200).send({token})   
         } 
  } catch(error){
      res.status(400).send("invalid email");
  }
});
module.exports = router;
