//controle users


module.exports = (app) => {

	  const IndexController = {

	        index: function(req, res) {
	                   res.render('index', {title: 'My Node.js Application'})
                       }
	   };


  return IndexController;
};
