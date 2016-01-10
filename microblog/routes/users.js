var express = require('express');
var router = express.Router();

var users = {
        'daniel': {
            name: 'daniel',
            pass: '123123'
        }
    }
    /* GET users listing. */
router.all('/users/:username', function(req, res, next) {
    if (users[req.params.username]) {
        next();
    } else {
        next(new Error(req.params.username+' does not exist.'));
    }
});

router.get('/users/:username', function(req, res, next) {
    res.send(JSON.stringify(users[req.params.username]));
});

router.put('/user/:username',function(req,res,next){
    res.send('Done');
})

module.exports = router;