
	/***** INICIO DECLARACIÓN DE VARIABLES GLOBALES *****/

	// Array de palos
    let palos = ["corazones", "picas", "rombos", "treboles"];
      
	// Array de número de cartas
	 numeros = ["as", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jota", "reina", "rey"];
	// En las pruebas iniciales solo se trabajará con cuatro cartas por palo:
	//let numeros = [10, "jota", "reina", "rey"];

    // paso (top y left) en pixeles de una carta a la anterior en un mazo
    let paso = 3;

	// Tapetes				
	let tapete_inicial   = document.getElementById("inicial");
	let tapete_sobrantes = document.getElementById("sobrantes");
	let tapete_receptor1 = document.getElementById("receptor1");
	let tapete_receptor2 = document.getElementById("receptor2");
	let tapete_receptor3 = document.getElementById("receptor3");
	let tapete_receptor4 = document.getElementById("receptor4");

	// Mazos
	let mazo_inicial   = [];
	let mazo_sobrantes = [];
	let mazo_receptor1 = [];
	let mazo_receptor2 = [];
	let mazo_receptor3 = [];
	let mazo_receptor4 = [];

	// Contadores de cartas
	let cont_inicial     = document.getElementById("cont_inicial");
	let cont_sobrantes   = document.getElementById("cont_sobrantes");
	let cont_receptor1   = document.getElementById("cont_receptor1");
	let cont_receptor2   = document.getElementById("cont_receptor2");
	let cont_receptor3   = document.getElementById("cont_receptor3");
	let cont_receptor4   = document.getElementById("cont_receptor4");
	let cont_movimientos = document.getElementById("cont_movimientos");

	// Tiempo
	let cont_tiempo  = document.getElementById("cont_tiempo"); // span cuenta tiempo
	let segundos 	   = 0;    // cuenta de segundos
	let temporizador = null; // manejador del temporizador

	/**** COMIENZO DECLARACION VARUABLES GLOBALES */
	
	// var destino_1 = document.getElementById("receptor1");
    // destino_1.ondragenter = function(e){e.preventDefault();}
	// destino_1.ondragover = function(e){e.preventDefault();}
    // destino_1.ondraleave = function(e){e.preventDefault();}
    // destino_1.ondrop = function(e){e.preventDefault();}
	// destino_1.ondrop = soltar; 
	
	// var destino_2=document.getElementById("receptor2")
	// destino_2.ondragenter = function(e){e.preventDefault();}
    // destino_2.ondragover = function(e){e.preventDefault();}
    // destino_2.ondraleave = function(e){e.preventDefault();}
    // destino_2.ondrop = function(e){e.preventDefault();}
	// destino_2.ondrop = soltar;

	// var destino_3 = document.getElementById("receptor3");
    // destino_3.ondragenter = function(e){e.preventDefault();}
	// destino_3.ondragover = function(e){e.preventDefault();}
    // destino_3.ondraleave = function(e){e.preventDefault();}
	// destino_3.ondrop = function(e){e.preventDefault();}
    // destino_3.ondrop = soltar;
	
	// var destino_4 = document.getElementById("receptor4");
    // destino_4.ondragenter = function(e){e.preventDefault();}
    // destino_4.ondragover = function(e){e.preventDefault();}
    // destino_4.ondraleave = function(e){e.preventDefault();}
    // destino_4.ondrop = function(e){e.preventDefault();}
	// destino_4.ondrop = soltar;
	
	// var destino_sobra = document.getElementById("sobrantes");
    // destino_sobra.ondragenter = function(e){e.preventDefault();}
	// destino_sobra.ondragover = function(e){e.preventDefault();}
    // destino_sobra.ondraleave = function(e){e.preventDefault();}
	// destino_sobra.ondrop = function(e){e.preventDefault();}
    // destino_sobra.ondrop = soltar;

	/***** FIN DECLARACIÓN DE VARIABLES GLOBALES *****/

			 
	// Rutina asociada a botón reset: comenzar_juego
	document.getElementById("reset").onclick = comenzar_juego;

	// El juego debería comenzar al cargar la página: no se debe esperar a pulsar el botón de Reiniciar
    /* !!!!!!!!!!!!!!!!!!! CÓDIGO !!!!!!!!!!!!!!!!!!!!!!! */
	comenzar_juego();
    /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */


	// Desarrollo del comienzo de juego
	function comenzar_juego() {

		/* Crear el mazo inicial con toda la baraja. Este será un array cuyos 
		elementos serán elementos HTML <img>, siendo cada uno de ellos una carta.
		Sugerencia: en dos bucles for, bárranse los "palos" y los "numeros", formando
		oportunamente el nombre del fichero png que contiene a la carta (recuérdese poner
		el path correcto en la URL asociada al atributo src de <img>). Una vez creado
		el elemento img, inclúyase como elemento del array mazo_inicial. 
		*/
		/* !!!!!!!!!!!!!!!!!!!!!! CÓDIGO !!!!!!!!!!!!!!!!!!!! */	
        
		function iniciar_baraja(){

		for(var i=0; i<palos.length;i++){
			for(var j=0; j<numeros.length; j++){
				var nombre_carta = document.createElement("img");
				nombre_carta.src = "img/baraja/"+numeros[j]+"-"+palos[i]+".png";
				nombre_carta.setAttribute("data-palo", palos[i]);
				nombre_carta.setAttribute("data-numero", numeros[i]);
				mazo_inicial.pop(nombre_carta);
			}
		}

		for(var i=0; i<palos.length; i++){
			for(var j=0; j<numeros.length; j++){
				var nombre_carta=document.createElement("img");
				nombre_carta.src="img/baraja/"+numeros[j]+"-"+palos[i]+".png";
				
				nombre_carta.setAttribute("data-palo", palos[i]); 
				nombre_carta.setAttribute("data-numero", numeros[j]);
				nombre_carta.setAttribute("class", "carta_style"); 
				mazo_inicial.push(nombre_carta);
			}
		}
		}
        /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
        

		// Barajar
		iniciar_baraja();

		barajar(mazo_inicial);

		// Dejar mazo_inicial en tapete inicial
		cargar_tapete_inicial(mazo_inicial, tapete_inicial);
		tapete_inicial.lastChild.draggable = true;
		// Puesta a cero de contadores de mazos
		set_contador(cont_sobrantes, 0);
		set_contador(cont_receptor1, 0);
		set_contador(cont_receptor2, 0);
		set_contador(cont_receptor3, 0);
		set_contador(cont_receptor4, 0);
		set_contador(cont_movimientos, 0);
				
		// Arrancar el conteo de tiempo
		arrancar_tiempo();

	} // comenzar_juego


	/**
		Se debe encargar de arrancar el temporizador: cada 1000 ms se
		debe ejecutar una función que a partir de la cuenta autoincrementada
		de los segundos (segundos totales) visualice el tiempo oportunamente con el 
		format hh:mm:ss en el contador adecuado.

		Para descomponer los segundos en horas, minutos y segundos pueden emplearse
		las siguientes igualdades:

		segundos = truncar (   segundos_totales % (60)                 )
		minutos  = truncar ( ( segundos_totales % (60*60) )     / 60   )
		horas    = truncar ( ( segundos_totales % (60*60*24)) ) / 3600 )

		donde % denota la operación módulo (resto de la división entre los operadores)

		Así, por ejemplo, si la cuenta de segundos totales es de 134 s, entonces será:
			00:02:14

		Como existe la posibilidad de "resetear" el juego en cualquier momento, hay que 
		evitar que exista más de un temporizador simultáneo, por lo que debería guardarse
		el resultado de la llamada a setInterval en alguna variable para llamar oportunamente
		a clearInterval en su caso.   
	*/
	
	function arrancar_tiempo(){ // Ya completamente implementado: estúdiese
		if (temporizador) clearInterval(temporizador);
    
		let hms = function (){
        let seg = Math.trunc( segundos % 60 );
        let min = Math.trunc( (segundos % 3600) / 60 );
        let hor = Math.trunc( (segundos % 86400) / 3600 );
        let tiempo =  ( (hor<10)? "0"+hor : ""+hor ) 
                + ":" + ( (min<10)? "0"+min : ""+min )  
                + ":" + ( (seg<10)? "0"+seg : ""+seg );
        set_contador(cont_tiempo, tiempo);
        segundos++;
        }
        segundos = 0;
        hms(); // Primera visualización 00:00:00
        temporizador = setInterval(hms, 1000); // hms() será invocado cada segundo               	
	} // arrancar_tiempo

			



			
	/**
		Si mazo es un array de elementos <img>, en esta rutina debe ser
		reordenado aleatoriamente. Al ser un array un objeto, se pasa
		por referencia, de modo que si se altera el orden de dicho array
		dentro de la rutina, esto aparecerá reflejado fuera de la misma.
		Para reordenar el array puede emplearse el siguiente pseudo código:

		- Recorramos con i todos los elementos del array
			- Sea j un indice cuyo valor sea un número aleatorio comprendido 
		  		entre 0 y la longitud del array menos uno. Este valor aleatorio
		  		puede conseguirse, por ejemplo con la instrucción JavaScript
					Math.floor( Math.random() * LONGITUD_DEL_ARRAY );
			- Se intercambia el contenido de la posición i-ésima con el de la j-ésima

	*/
	function barajar(mazo) {
		/* !!!!!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! */	
        for (var i=0; i<mazo.length; i++){
			var j = Math.floor(Math.random() * mazo.length);
			var aux = mazo[i];
			mazo[i] = mazo[j];
			mazo[j] = aux;
		}
    	/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
	} // barajar


			
	/**
		En el elemento HTML que representa el tapete inicial (variable tapete_inicial)
		se deben añadir como hijos de DOM todos los elementos <img> del array mazo actual.
		Antes de añadirlos, se deberían fijar propiedades como la anchura, la posición,
		coordenadas top y left, algun atributo de tipo data-...
		Al final se debe ajustar el contador de cartas a la cantidad oportuna
	*/
	function cargar_tapete_inicial(mazo,ref) {
		/* !!!!!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! */	
        var inc_x=0;
		var inc_y=0;
		for (var i=0; i<mazo.length; i++) {
			mazo[i].style.position="absolute";
			mazo[i].style.width="50px";
			mazo[i].style.height="auto";
			mazo[i].style.top=inc_x+"px";
			mazo[i].style.left=inc_y+"px";
			inc_x+=paso;
			inc_y+=paso;
			ref.appendChild(mazo[i]);
			}
		set_contador(cont_inicial, mazo.length);        
        /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */	
	} // cargar_tapete_inicial

	//mover la carta
	function al_mover (e){
        e.target.setAttribute("data-tapete_id",e.target.parentElement.id);
        e.dataTransfer.setData("text/plain", e.target.id);
    }

	//Recibir la carta

	var destino = document.querySelectorAll('.receptor , #sobrantes');
	for (var i = 0; i < destino.length; i++) {
	destino[i].ondragenter = function(e){e.preventDefault();}
	destino[i].ondragover = function(e){e.preventDefault();}
	destino[i].ondragleave = function(e){e.preventDefault();}
	destino[i].ondrop = function(e){e.preventDefault();}
	destino[i].ondrop = soltar;
	}

	function soltar(e){
		
		e.preventDefault();
		var tapete_destino;

		//Soltar cartas según el tapete
		if(e.target.classList.contains("tapete")){ //puede que el tapete esté totalmente vacío
			tapete_destino = e.target;
		} else{
			tapete_destino = e.target.parentElement; //o puede que tenga mínimo 1 carta sobre él
		}

		var carta_id = e.dataTransfer.getData("text");
		var carta = document.getElementById(carta_id);
		var tapete_origen = carta.getAttribute("data-tapete_id"); //data-tapete-origen

		// Para depositar la carta:
		// 1)bIr al tapete sobrante desde el tapete principal
		// 2) Ir a un tapete vacío (sólo contiene el span del contador) únicamente si es un rey y el tapete destino no es el tapete sobrante
		// 3) Ir a un tapete receptor y que la carta que se deposite sea de un color contrario a la última del mismo tapete con el siguiente número que toque

		if((tapete_destino.id == "sobrantes" && tapete_origen == "inicial") || (tapete_destino.lastChild.classList.contains("contador") && carta.getAttribute("data-nombre") == "rey" && tapete_destino.id!="sobrantes") || (tapete_destino.id!="sobrantes" && tapete_destino.lastChild.getAttribute("data-color")!=carta.getAttribute("data-color") && (numeros.indexOf(tapete_destino.lastChild.getAttribute("datanombre"))-1 == numeros.indexOf(carta.getAttribute("data-nombre"))))){
			carta.style.top = "50%";
			carta.style.left = "50%";
			carta.style.transform = "translate(-50%, 50%)";
			tapete_destino.appendChild(carta);

			//Posibles casos de tapete origen y final 
			switch(tapete_origen){
				case "inicial":
					mazo_inicial.pop(); //Se extrae carta de mazo de tapete origen
					dec_contador(cont_inicial); //Decrementar contador tapete origen
					tapete_inicial.lastChild.draggable = true; //Activar draggable de la nueva última carta del tapete origen
					break;
				case "sobrantes":
					mazo_sobrantes.pop();
					dec_contador(cont_sobrantes);
					tapete_sobrantes.lastChild.draggable = true;
					break;
				case "receptor1":
					mazo_receptor1.pop();
					dec_contador(cont_receptor1);
					tapete_receptor1.lastChild.draggable = true;
					break;
				case "receptor2":
					mazo_receptor2.pop();
					dec_contador(cont_receptor2);
					tapete_receptor2.lastChild.draggable = true;
					break;
				case "receptor3":
					mazo_receptor3.pop();
					dec_contador(cont_receptor3);
					tapete_receptor3.lastChild.draggable = true;
					break;
				case "receptor4":
					mazo_receptor4.pop();
					dec_contador(cont_receptor4);
					tapete_receptor4.lastChild.draggable = true;
					break;
			}

			switch(tapete_destino.id){
				case "receptor1":
					mazo_receptor1.push(carta); //Se extrae carta de mazo de tapete origen
					tapete_receptor1.children[mazo_receptor1.length-1].draggable = false; //Desactivar draggable de la nueva última carta del tapete origen
					inc_contador(cont_receptor1); //Decrementar contador tapete origen
					break;
				case "receptor2":
					mazo_receptor2.push(carta); //Se extrae carta de mazo de tapete origen
					tapete_receptor2.children[mazo_receptor2.length-1].draggable = false; //Desactivar draggable de la nueva última carta del tapete origen
					inc_contador(cont_receptor2); //Decrementar contador tapete origen
					break;
				case "receptor3":
					mazo_receptor3.push(carta); //Se extrae carta de mazo de tapete origen
					tapete_receptor3.children[mazo_receptor2.length-1].draggable = false; //Desactivar draggable de la nueva última carta del tapete origen
					inc_contador(cont_receptor3); //Decrementar contador tapete origen
					break;
				case "receptor4":
					mazo_receptor4.push(carta); //Se extrae carta de mazo de tapete origen
					tapete_receptor4.children[mazo_receptor2.length-1].draggable = false; //Desactivar draggable de la nueva última carta del tapete origen
					inc_contador(cont_receptor4); //Decrementar contador tapete origen
					break;
				case "sobrantes":
					mazo_sobrantes.push(carta); //Se extrae carta de mazo de tapete origen
					tapete_sobrantes.children[mazo_receptor2.length-1].draggable = false; //Desactivar draggable de la nueva última carta del tapete origen
					inc_contador(cont_sobrantes); //Decrementar contador tapete origen
					break;
			}
			
			//Incrementamos el contador de movimientos del juego
			inc_contador(cont_movimientos);

			//Comrpobar juego acabado
			if(cont_inicial.innerHTML == 0 && cont_sobrantes.innerHTML == 0){
				setTimeout(function(){
					alert("Has ganado! Movimientos: " + cont_movimientos.innerHTML + "\nTiempo: " + cont_tiempo.innerHTML);
					comenzar_juego();
				},0.5)
			}
			
			if (cont_inicial.innerHTML == 0 && cont_sobrantes.innerHTML != 0) {
				barajar(mazo_sobrantes);
				mazo_inicial = mazo_sobrantes;
				cargar_tapete_inicial(mazo_inicial);
				tapete_inicial.lastChild.draggable = true;
				mazo_sobrantes = [];
				set_contador(cont_sobrantes,0);
				set_contador(cont_inicial, mazo_inicial.length);
			}
		}
	}

	function set_contador(contador, valor) {
		/* !!!!!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! */	
		contador.innerHTML = valor;
        /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */	
		}
