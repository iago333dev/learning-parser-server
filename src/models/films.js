const Parse = require('parse')
const Film = Parse.Object.extend("Film");


exports.Post = (Object) => {
	var film = new Film();
	
	film.set("titulo", Object.title);
	film.set("descricao", Object.description);
	film.set("image_url", Object.image);
	film.set("dataLancamento", Object.release);	

	return(film);
}





