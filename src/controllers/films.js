var FilmsModel = require('../models/films.js')

exports.post = (req, res, next) => {
	console.log(req.body);

	if(!req.body.title || !req.body.description || !req.body.image_url || !req.body.release){
		res.status(400).send('ERROR: Envie todos os parametros necessários');			
	}else{

		var object = {
			title: req.body.title,
			description: req.body.description,
			image: req.body.image_url,
			release: req.body.release
		}

		FilmsModel.Post(object);
	}

};