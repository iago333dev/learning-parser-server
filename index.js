
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var bodyParser = require('body-parser');
var FilmsRoutes = require('./src/routes/films.js');
var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

/*

EXAMPLES

* POST FILM *

  curl -X POST \
  -H "X-Parse-Application-Id: iago333dev" \
  -H "Content-Type: application/json" \
  -d '{"title":"Lorem Ipsum...","description":"Lorem Ipsum...","image_url":"https://loremimpsumurl.jpg" ,"release":"2010"}' \
  http://localhost:1337/parse/classes/Film

* GET ALL FILMS *

  curl -X GET \
  -H "X-Parse-Application-Id: iago333dev" \
  http://localhost:1337/parse/classes/Film

* GET ESPECIFIC FILM *

  curl -X GET \
  -H "X-Parse-Application-Id: iago333dev" \
  http://localhost:1337/parse/classes/Film/[FILM_ID]

*/

/*============================

  EXPRESS SETTINGS

=============================*/
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
app.use('/films',FilmsRoutes);

var port = process.env.PORT || 1337;

/*============================

  PARSER-SERVER SETTINGS 

=============================*/

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'iago333dev',
  masterKey: process.env.MASTER_KEY || '', 
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  
  liveQuery: {
    classNames: ["Films"] 
  }
});

var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('Parse-Server running on port ' + port + '.');
});

ParseServer.createLiveQueryServer(httpServer);
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

/*============================

  INDEX PAGE

=============================*/

app.get('/', function(req, res) {
  res.status(200).send('learning Parse Server...');
});