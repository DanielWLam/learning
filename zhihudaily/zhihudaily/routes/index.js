var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
  async.series([
      function(cb){
        var result = [];
        request('http://daily.zhihu.com/',function(err,res,body){
          if(err){
            return;
          }

          $ = cheerio.load(body);

          var boxes = $('.box');
          var imgTag = boxes.find('img[src]');
          var imgs = [];
          var titleTag = boxes.find('.title');
          var titles = [];
          var aTag = boxes.find('.link-button');
          var links = [];

          imgTag.each(function(i,item){
            imgs.push($(this).attr('src'));
          });

          aTag.each(function(i,item){
            links.push($(this).attr('href'));
          });

          titleTag.each(function(i,item){
            titles.push($(this).text());
          });
          for(var i=0,len=imgs.length;i<len;i++){
            result.push({title:titles[i],img:imgs[i],link:links[i]});
          }
          callback(null,result);
        });
      }
  ],function(err,result){
    res.render('index', { title: 'Express' ,result:result});
  });
});

module.exports = router;
