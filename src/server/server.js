var express = require('express'),
    path = require('path'),
    fs = require('fs');
var compression = require('compression');

var app = express();
var staticRoot = __dirname + '/';

app.set('port', (process.env.PORT || 3000));

app.use(compression());

if (process.env.ENV === 'PROD') {
    app.use(express.static(staticRoot))
} else {
    app.use('/app', express.static(staticRoot + '../app'));
    app.use(express.static(staticRoot + '../../'));
}

app.use('/test', function(req,res,next) {
    res.send("Testing Server");
});

app.use(function(req, res, next){

    // if the request is not html then move along
    var accept = req.accepts('html', 'json', 'xml');
    if(accept !== 'html'){
        return next();
    }

    // if the request has a '.' assume that it's for a file, move along
    var ext = path.extname(req.path);
    if (ext !== ''){
        return next();
    }

    if (process.env.ENV === 'PROD') {
        fs.createReadStream(staticRoot + 'index.html').pipe(res);
    } else {
        fs.createReadStream(staticRoot + '../index.html').pipe(res);
    }

});

app.listen(app.get('port'), function() {
    console.log('app running on port', app.get('port'));
});