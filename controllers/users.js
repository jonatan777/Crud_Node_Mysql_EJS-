//controle crud
var express = require('express')




module.exports = (app) => {
const CrudController = {

  
       //bucar todos no banco
todos: function(req, res, next) {
		       req.getConnection(function(error, conn) {
			   conn.query('SELECT * FROM users ORDER BY id DESC',function(err, rows, fields) {
				//if(err) throw err
					if (err) {
						req.flash('error', err)
						res.render('user/list', {
							title: 'User List', 
							data: ''
						})
					} else {
					// render to views/user/list.ejs template file
						res.render('user/list', {
							title: 'User List', 
							data: rows
						})
				        }
			    })
		     })
},
  
  
//renderizar a pagina sem dados
criar1: function(req, res, next){	
		// render to views/user/add.ejs
		res.render('user/add', {
			title: 'Add New User',
			name: '',
			age: '',
			email: ''		
		})
},
        
//renderizar a pagina sem dados      
criar: function(req, res, next){

			 //verificação do campo nome, caso não corresponda, renderizar a pagina
			    if (!req.body.name.length || req.body.name.length < 5) {
				  req.flash('error', 'pelomenos 5 letras') 	
				};
				
	//verificação do campo age, caso não corresponda, renderizar a pagina   
			    var age = req.body.age;  	      
			    if( isNaN(age)) {
				  req.flash('error', 'a idade tem que ser um numero') 	
				  	
				};
		 //verificação do campo age, caso não corresponda, renderizar a pagina
			    var email = req.body.email;	      	      
			    if( email == "" || req.body.age == null || req.body.name.length < 5) {
			           
				  req.flash('error', 'um Email valido') 	
				  	
				  	
			            res.render('user/add', {
					title: 'Add New User',
					name: '',
					age: '',
					email: ''		
				    })
				  	
				};
				
				
				
				 //objeto "user" preenchido para ser adicionado ao DB
					const user = {
					               name : req.body.name,
					               age   : req.body.age,
			                               email : req.body.email
			                               
					};
				
					   
				
					req.getConnection(function(error, conn) {
						conn.query('INSERT INTO users SET ?', user, function(err, result) {
							//if(err) throw err
							if (err) {
								req.flash('error', err)
								
								// render to views/user/add.ejs
								res.render('user/add', {
									title: 'Add New User',
									name: user.name,
									age: user.age,
									email: user.email					
								})
							} else {				
								req.flash('success', 'Data added successfully!')
								
								// render to views/user/add.ejs
								res.render('user/add', {
									title: 'Add New User',
									name: '',
									age: '',
									email: ''					
								})
							}
						})
					})
	    			    
},

 
                 
editar_get: function(req, res, next){
			req.getConnection(function(error, conn) {
			
				conn.query('SELECT * FROM users WHERE id = ?',[req.params.id], function(err, rows, fields) {
					if(err) throw err
					
					// if user not found
					if (rows.length <= 0) {
						req.flash('error', 'User not found with id = ' + req.params.id)
						res.redirect('/users')
					}
					else { // if user found
						// render to views/user/edit.ejs template file
						res.render('user/edit', {
							title: 'Edit User', 
							//data: rows[0],
							id: req.params.id,
							name: rows[0].name,
							age: rows[0].age,
							email: rows[0].email					
						})

					}			
				})
			})
},
        
        
        
editar_put: function(req, res, next) {
			   
			    if (req.body.name.length < 5) {

                                   req.body.name = null;
				  req.flash('error', 'pelomenos 5 letras') 

			    };
								
			      	      
			    if(!req.body.age) {
			          req.body.age = null;
			         req.flash('error', 'numeros')
				 
			    };
				

			    	      	      
			    if( req.body.email == "") {
			           
			           req.body.email = null;
				  req.flash('error', 'um Email valido') 	
			                
				};
				

                            if(req.body.name == null || req.body.age == null || req.body.email == null ){
                            
                            res.render('user/edit', {
							title: 'Edit User',
							id: req.params.id,
							name: req.body.name,
							age: req.body.age,
							email: req.body.email
						   })
                            
                            }else{

//--------------------------------------------------------------------------------------------------------
                                        
					const user = {
						name: req.body.name,
						age: req.body.age,
						email: req.body.email
					}
					
					
					req.getConnection(function(error, conn) {
						conn.query('UPDATE users SET ? WHERE id = ' + req.params.id, user, function(err, result) {
							//if(err) throw err
							if (err) {
								req.flash('error', err)
								
								// render to views/user/add.ejs
								res.render('user/edit', {
									title: 'Edit User',
									id: req.params.id,
									name: req.body.name,
									age: req.body.age,
									email: req.body.email
								})
							} else {
								req.flash('success', 'Data updated successfully!')
								
								// render to views/user/add.ejs
								res.redirect('/users')
							}
						})
					})
					
			 }// <-- fim do else
					
					
},  //<-- fim do put
        
        
        
                 
deletar: function(req, res, next) {
			
			req.getConnection(function(error, conn) {
				conn.query('DELETE FROM users WHERE id = ' + req.params.id, user, function(err, result) {
					//if(err) throw err
					if (err) {
						req.flash('error', err)
						// redirect to users list page
						res.redirect('/users')
					} else {
						req.flash('success', 'User deleted successfully! id = ' + req.params.id)
						// redirect to users list page
						res.redirect('/users')
					}
				})
			})
}

};  //<-- fim do crud controller


  return CrudController;
}; //<-- module.exports