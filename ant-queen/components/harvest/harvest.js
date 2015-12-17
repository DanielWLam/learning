/* 
 * @Author: daniel
 * @Date:   2015-12-15 19:43:43
 * @Last Modified by:   daniel
 * @Last Modified time: 2015-12-17 18:01:44
 */

'use strict';
var mysql = require('../mysql/mysql');
var testData={
  "author": "Daniel",
  "tag": "i-id-news",
  "honey": {

  },
  "flower": [
    {
      "url": "http://www.otosia.com/berita/navigasi-waze-kini-bersuara-bahasa-indonesia.html",
      "data": {
        "catogaryFirst": "automotive"
      }
    },
    {
      "url": "http://www.otosia.com/berita/kalahkan-marc-marquez-di-motogp-mustahil.html",
      "data": {
        "catogaryFirst": "automotive"
      }
    },
    {
      "url": "http://www.otosia.com/berita/kawasaki-vulcan-ss-cruiser-bbergeser-total-jadi-cafe-racer.html",
      "data": {
        "catogaryFirst": "automotive"
      }
    },
    {
      "url": "http://www.otosia.com/berita/gelap-pengendara-ini-celaka-akibat-tak-lihat-zona-konstruksi.html",
      "data": {
        "catogaryFirst": "automotive"
      }
    },
    {
      "url": "http://www.otosia.com/berita/mau-rongsokan-dodge-ini-harganya-miliaran-lho.html",
      "data": {
        "catogaryFirst": "automotive"
      }
    },
    {
      "url": "http://www.otosia.com/berita/jorge-lorenzo-inginkan-rematch-versus-casey-stoner.html",
      "data": {
        "catogaryFirst": "automotive"
      }
    },
    {
      "url": "http://www.otosia.com/berita/kocak-gak-mau-bayar-parkir-pemotor-ini-kena-karma.html",
      "data": {
        "catogaryFirst": "automotive"
      }
    },
    {
      "url": "http://www.otosia.com/berita/volkswagen-bantu-wujudkan-kereta-bayi-teraman-di-dunia.html",
      "data": {
        "catogaryFirst": "automotive"
      }
    },
    {
      "url": "http://www.otosia.com/berita/ducati-tak-masuk-akal-turunkan-10-motor-di-motogp.html",
      "data": {
        "catogaryFirst": "automotive"
      }
    },
    {
      "url": "http://www.otosia.com/berita/mau-mencuri-motor-siap-siap-didor-seperti-maling-ini.html",
      "data": {
        "catogaryFirst": "automotive"
      }
    },
    {
      "url": "http://www.otosia.com/berita/pasukan-suzuki-mendekat-jorge-lorenzo-mulai-waspada.html",
      "data": {
        "catogaryFirst": "automotive"
      }
    },
    {
      "url": "http://www.otosia.com/berita/hindari-tabrakan-maut-lihat-yang-dilakukan-sopir-truk-kontainer-ini.html",
      "data": {
        "catogaryFirst": "automotive"
      }
    },
    {
      "url": "http://www.otosia.com/berita/echi-biker-difabel-yang-bertarung-melawan-trauma-kecelakaan.html",
      "data": {
        "catogaryFirst": "automotive"
      }
    },
    {
      "url": "http://www.otosia.com/berita/2015-tahun-terbaik-rossi-selama-berkarir-di-grand-prix.html",
      "data": {
        "catogaryFirst": "automotive"
      }
    },
    {
      "url": "http://www.otosia.com/berita/model-ines-amelia-bermimpi-jadi-pebalap.html",
      "data": {
        "catogaryFirst": "automotive"
      }
    },
    {
      "url": "http://www.otosia.com/berita/index2.html"
    }
  ],
  "extend": [
    {
      "url": "http://www.otosia.com/berita/navigasi-waze-kini-bersuara-bahasa-indonesia.html",
      "tags": [
        {
          "tag": "automotive",
          "sourceUrl": "http://www.otosia.com/berita/"
        }
      ]
    },
    {
      "url": "http://www.otosia.com/berita/kalahkan-marc-marquez-di-motogp-mustahil.html",
      "tags": [
        {
          "tag": "automotive",
          "sourceUrl": "http://www.otosia.com/berita/"
        }
      ]
    },
    {
      "url": "http://www.otosia.com/berita/kawasaki-vulcan-ss-cruiser-bbergeser-total-jadi-cafe-racer.html",
      "tags": [
        {
          "tag": "automotive",
          "sourceUrl": "http://www.otosia.com/berita/"
        }
      ]
    },
    {
      "url": "http://www.otosia.com/berita/gelap-pengendara-ini-celaka-akibat-tak-lihat-zona-konstruksi.html",
      "tags": [
        {
          "tag": "automotive",
          "sourceUrl": "http://www.otosia.com/berita/"
        }
      ]
    },
    {
      "url": "http://www.otosia.com/berita/mau-rongsokan-dodge-ini-harganya-miliaran-lho.html",
      "tags": [
        {
          "tag": "automotive",
          "sourceUrl": "http://www.otosia.com/berita/"
        }
      ]
    },
    {
      "url": "http://www.otosia.com/berita/jorge-lorenzo-inginkan-rematch-versus-casey-stoner.html",
      "tags": [
        {
          "tag": "automotive",
          "sourceUrl": "http://www.otosia.com/berita/"
        }
      ]
    },
    {
      "url": "http://www.otosia.com/berita/kocak-gak-mau-bayar-parkir-pemotor-ini-kena-karma.html",
      "tags": [
        {
          "tag": "automotive",
          "sourceUrl": "http://www.otosia.com/berita/"
        }
      ]
    },
    {
      "url": "http://www.otosia.com/berita/volkswagen-bantu-wujudkan-kereta-bayi-teraman-di-dunia.html",
      "tags": [
        {
          "tag": "automotive",
          "sourceUrl": "http://www.otosia.com/berita/"
        }
      ]
    },
    {
      "url": "http://www.otosia.com/berita/ducati-tak-masuk-akal-turunkan-10-motor-di-motogp.html",
      "tags": [
        {
          "tag": "automotive",
          "sourceUrl": "http://www.otosia.com/berita/"
        }
      ]
    },
    {
      "url": "http://www.otosia.com/berita/mau-mencuri-motor-siap-siap-didor-seperti-maling-ini.html",
      "tags": [
        {
          "tag": "automotive",
          "sourceUrl": "http://www.otosia.com/berita/"
        }
      ]
    },
    {
      "url": "http://www.otosia.com/berita/pasukan-suzuki-mendekat-jorge-lorenzo-mulai-waspada.html",
      "tags": [
        {
          "tag": "automotive",
          "sourceUrl": "http://www.otosia.com/berita/"
        }
      ]
    },
    {
      "url": "http://www.otosia.com/berita/hindari-tabrakan-maut-lihat-yang-dilakukan-sopir-truk-kontainer-ini.html",
      "tags": [
        {
          "tag": "automotive",
          "sourceUrl": "http://www.otosia.com/berita/"
        }
      ]
    },
    {
      "url": "http://www.otosia.com/berita/echi-biker-difabel-yang-bertarung-melawan-trauma-kecelakaan.html",
      "tags": [
        {
          "tag": "automotive",
          "sourceUrl": "http://www.otosia.com/berita/"
        }
      ]
    },
    {
      "url": "http://www.otosia.com/berita/2015-tahun-terbaik-rossi-selama-berkarir-di-grand-prix.html",
      "tags": [
        {
          "tag": "automotive",
          "sourceUrl": "http://www.otosia.com/berita/"
        }
      ]
    },
    {
      "url": "http://www.otosia.com/berita/model-ines-amelia-bermimpi-jadi-pebalap.html",
      "tags": [
        {
          "tag": "automotive",
          "sourceUrl": "http://www.otosia.com/berita/"
        }
      ]
    },
    {
      "url": "http://www.otosia.com/berita/index2.html",
      "tags": [
        {
          "tag": "automotive",
          "sourceUrl": "http://www.otosia.com/berita/"
        }
      ]
    }
  ]
};
function save(data, callback) {
    var resultData=[];
    var errFlag=0;
    mysql.init(function(err, result) {
        if(err) {
            console.log(err);
        }

    })
    for (var i = 0, len = data.flower.length; i < len; i++) {
        var simgleTask = data.flower[i].url;
        var row={};
        row.id=i;
        row.url=simgleTask;
        row.tag='sport';
        row.bee='test';
        row.ip='test';
        row.weight=0;
        row.createAt=0;
        row.updateAt=0;
        row.expireAt=0;

         mysql.pool.query('INSERT INTO flower SET ?', row,function(err,result){
            if(err){
                errFlag=1;
                throw err;
            }
            resultData.push(result);
         })
    }
    if(errFlag==0){
        callback(resultData);
    }
}
save(testData,function(){console.log(123)})
// exports.save = save;