var express = require('express');
var router = express.Router();
var FilmsController = require('../controllers/films.js')

//http://localhost:1337/films/
/*
	Example POST (INSERT):

	{
		"title":"Meu Malvado Favorito",
		"description": "A animação mostra Gru, um supervilão que tenta roubar a Lua, e como ele é afetado por três meninas órfãs.",
		"image_url": "https://upload.wikimedia.org/wikipedia/pt/7/7f/Despicable_Me_poster.jpg",
		"release":"2010"
	}
*/
router.post('/',FilmsController.post);


module.exports = router;