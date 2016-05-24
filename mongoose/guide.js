var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/runoob');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {

// });

var Schema = mongoose.Schema;
var blogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    comments: [{
        body: String,
        date: Date
    }],
    date: {
        type: Date,
        default: Date.now
    },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
});

blogSchema.methods.findSimilarAuthors = function(cb) {
    return this.model('Blog').find({
        author: this.author
    }, cb);
}

var BBlog = mongoose.model('Blog', blogSchema); ///Create collections name blogs
var dog=new BBlog({author:'daniel'});
dog.findSimilarAuthors(function(err,dogs){
    console.log(dogs);
})