const router = require('express').Router();
const Games = require('../model/Games');
const verify = require('./verifyToken');
const { gameValidation, gameChangeValidation } = require('../validation');


//Get all games in store
router.get('/', async (req,res, next) =>{

await res.header("Access-Control-Allow-Headers", 'Authorization, Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
   
if ('OPTIONS' == req.method) {
    res.send(200);
} else {
    await Games.find({}, function(err, games){
        if(err){
            res.status(400).send('Currently no game in store or haveing bug.')
        }else{
            res.send({abc:abc});
        }
    }
     )
    next();
}


});

//Add new game
router.put('/add', verify, async (req,res) =>{

    const {error} = gameValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const duplicated = await Games.findOne({name: req.body.name});
    if(duplicated) return res.status(400).send('Game already existed!');

    const game = new Games({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    try {
        await game.save();
        res.send({message:'New Game Added!'})                 
    } catch (err) {
        await res.status(400).send('Fail to add new game.');
    }
    
});

//Modify game Name/Description/Price
router.post('/modify', verify, async (req,res) =>{

    const {error} = gameChangeValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const exist = await Games.findOne({name: req.body.name});
    if(!exist) return res.status(400).send('This game not exist!');

    const newGameNameExist = await Games.findOne({name: req.body.newName});
    if(newGameNameExist) return res.status(400).send(
        'Unable to change the game name: This game name already existed.');

    //Determine game name change or not
    if(req.body.newName == ""){
        try {
            const game = await Games.findOneAndUpdate({name: req.body.name}, 
            {name: req.body.name, 
            description: req.body.newDescription,
            price: req.body.newPrice}
            );
               await game.save();
               res.send({message:'Game information changed successfully!'})                 
        } catch (err) {
               await res.status(400).send('Fail to modify game information.');
    }
        }
    else{
        try {
            const game = await Games.findOneAndUpdate({name: req.body.name}, 
            {name: req.body.newName, 
            description: req.body.newDescription,
            price: req.body.newPrice}
            );
                await game.save();
                res.send({message:'Game information changed successfully!'})                 
        } catch (err) {
                await res.status(400).send('Fail to modify game information.');
    }
}
});

//Delete game
router.delete('/delete/:name', verify, async (req,res) =>{

    gameName = decodeURI(req.params.name);

    const exist = await Games.findOne({name: gameName});
    if(!exist) return res.status(400).send('This game not exist!');

    try {
        const game = await Games.findOneAndDelete({name: gameName});
        await game.save();
        res.send({message:'Game deleted successfully!'})                 
    } catch (err) {
        await res.status(400).send('Fail to delete this game.');
    }
    
});


module.exports = router;