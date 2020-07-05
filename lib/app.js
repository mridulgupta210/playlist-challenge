var path = require('path');
var express = require('express');
var morgan = require('morgan')
var bodyParser = require('body-parser')

var Songs = require('./songs');

var STATIC_DIR = path.join(__dirname, '..', 'public');

module.exports = function createApp(options) {
    var library = new Songs(path.join(__dirname, '..', 'data'));

    var app = express();
    app.use(morgan('tiny'));
    app.use(bodyParser.json());
    app.use(express.static(STATIC_DIR));
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
        res.header('Access-Control-Allow-Headers', 'content-type');
        next();
    });

    app.get('/library/', function(req, res) {
        var data = library.getLibrary();

        res.json(data);
    });

    app.get('/library/:id/', function(req, res) {
        var id = parseInt(req.params.id, 10);
        var data = library.getSong(id);

        res.json(data);
    });

    app.get('/playlist/', function(req, res) {
        var data = library.getPlaylists(function(err, playlists) {
            res.json(playlists);
        });
    });

    app.post('/playlist/', function(req, res) {
        var data = req.body;

        console.dir(data)
        console.dir(req.headers);

        var name = data.name
        var songs = data.songs

        library.savePlaylist(null, name, songs, function(err, id) {
            res.json({
                id: id
            });
        });
    });

    app.get('/playlist/:id/', function(req, res) {
        var id = parseInt(req.params.id, 10);
        var data = library.getPlaylist(id);

        res.json(data);
    });

    app.post('/playlist/:id/', function(req, res) {
        var id = parseInt(req.params.id, 10);
        var data = req.body;

        var name = data.name
        var songs = data.songs

        library.savePlaylist(id, name, songs, function(err, id) {
            res.json({
                id: id
            });
        });
    });

    app.delete('/playlist/:id/', function(req, res) {
        var id = parseInt(req.params.id, 10);
        var data = library.deletePlaylist(id);

        res.json({});
    });

    return app;
};
