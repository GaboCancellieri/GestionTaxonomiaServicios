const dbConnection =require('../../config/dbConnection');//aca digo donde tengo que ir a buscar la bd

module.exports=app =>{	
	const connection=dbConnection();//aca tengo la conexion a la bd
	
	app.getTodosLosMedicos('/', (req, res)=>{	
		//console.log("Entre...")
		//console.log(connection);
		connection.query('SELECT * FROM logistica_diciembre.medico', (err, result)=>{
			//console.log("Lo que recibi es....");
			
			res.render('medico/medico.service.ts', {
				
				medico: result //le paso para renderizar los valores que obtengo de la base de datos a medico.html
			});
			
		});
	});
	
	
	app.insertarMedico('/medico', (req, res) => {
		
		console.log(req.body); //recibo los elementos
	    const { DniMedico,NombreMedico,ApellidoMedico, TelefonoMedico, Matricula } = req.body;  
	    
	  
	    
	    
	    var sql= "INSERT INTO cliente (DniMedico,NombreMedico,ApellidoMedico, TelefonoMedico, Matricula) 	VALUES("+"'"+DniMedico+"'"+','+"'"+NombreMedico+"'"+','+"'"+ApellidoMedico+"'"+','+TelefonoMedico+','+"'"+Matricula+")";//hay que pasar los string a varchar..
	    	
	    	console.log(sql);
	    connection.query(sql,function (err, result) {
	        if (err) res.redirect('/');//si hay error tratarlo
	        else res.redirect('/');// si no hay error me quedo
	        console.log(result);
	        console.log(err);
	        console.log("1 record inserted");
	      });
	    
	    
		    });
	  }
	  	  
	  