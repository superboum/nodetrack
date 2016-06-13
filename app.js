var app = require('koa')();
var router = require('koa-router')();
var jade = require('koa-jade');
var serve = require('koa-static');
var body = require('koa-body');
var parseTorrent = require('parse-torrent');
var fs = require('fs');
var BtServ = require('bittorrent-tracker').Server;

var mybtserv = new BtServ({
  http: true,
  udp: true,
  ws: true,
  filter: function(infoHash, params) {
    return true;
  }
})

mybtserv.listen(6969);

var onHttpRequest = mybtserv.onHttpRequest.bind(mybtserv),
    catchError = function *(next) {
      try { yield next; }
      catch(e) { console.log(e.stack); }
    }
    
try { var torrentList = require('./torrents.json'); } 
catch(e) { var torrentList = []; }

router
  .get('/', function *(next) {
    this.render('home.jade', {torrents: torrentList, live: mybtserv.torrents});
  })
  .post('/', function *(next) {
    try {
      var t = parseTorrent(fs.readFileSync(this.request.body.files.torrentfile.path));
      delete t.pieces; delete t.info; delete t.infoBuffer;
      t.path = this.request.body.files.torrentfile.path;
      torrentList.push(t);
      fs.writeFileSync('torrents.json', JSON.stringify(torrentList));
      this.redirect('/');
    } catch (e) { this.body=e.stack; }
  })
  .get('/torrent/:id/download/:filename', function *(next) {
    this.body = fs.readFileSync(torrentList[this.params.id].path);
  })

app
  .use(serve('public'))
  .use(body({multipart: true, formidable:{uploadDir: __dirname+'/uploads'}}))
  .use(jade.middleware({viewPath: __dirname+'/views'}))
  .use(router.routes())
  .listen(80)
