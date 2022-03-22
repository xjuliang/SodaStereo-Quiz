/* 
Archivo mi_codigo.js
En este archivo programaremos el código correspondiente
al juego de Trivia.
 */

let indice_pregunta_actual = 0, total_puntos =300, siguiente_pregunta;
const nombre_alumno = "Matias Cuesta;"
const maximo_preguntas_por_jugadas=12;
const puntos_resultado_bien=7;

/*console.log(nombre_alumno);
console.log(maximo_preguntas_por_jugadas);
console.log(indice_pregunta_actual);
console.log(total_puntos);
console.log(puntos_resultado_bien);
*/

function mostrarResultado(){
	document.getElementById("pantalla-juego").classList.add("d-none");
	
	document.getElementById("pantalla-resultado").classList.remove("d-none");
	if(total_puntos >= puntos_resultado_bien){

	document.getElementById("pantalla-resultado").classList.add("bien");



	}else{

	document.getElementById("pantalla-resultado").classList.add("mal");

	}
	document.getElementById("resultado-puntos").innerHTML = total_puntos;


	}

function obtenerSiguientePregunta(){
	indice_pregunta_actual++;
	if(indice_pregunta_actual < preguntas.length){
		mostrarPregunta(preguntas[indice_pregunta_actual]);
		return indice_pregunta_actual;
	}
	else return false;
}

function mostrarPregunta(pregunta){
	document.querySelector('#pregunta-numero').innerHTML =(indice_pregunta_actual + 1) + ")";
	document.querySelector('#pregunta-texto').innerHTML = pregunta.pregunta;
	document.querySelector('#pregunta-imagen').setAttribute("src", pregunta.imagen_src);

	let divOpciones = document.querySelectorAll("#opciones div");
	let inputOpciones = document.querySelectorAll("#opciones input");
	let labelOpciones = document.querySelectorAll("#opciones label");

	for(let w = 0; w < divOpciones.length; w++){
		divOpciones[w].classList.remove("correcta");
		divOpciones[w].classList.remove("erronea");
		inputOpciones[w].checked = false;
		inputOpciones[w].innerHTML = pregunta.opciones[w];
		labelOpciones[w].innerHTML = pregunta.opciones[w];
	}
}

// mostrarPregunta(obtenerSiguientePregunta());



function aleatorio(){
	let num=Math.floor(Math.random()*47)
	return console.log(num)
}

function iniciarJuego(){
	desordenarArray(preguntas);
	//ocultamos barra del menu y pantalla resultado
	document.querySelector("#pantalla-inicio").classList.add("d-none");
	document.querySelector("#pantalla-resultado").classList.add("d-none");
	//mostar el header y la pantalla de juego
	document.querySelector("#header").classList.remove("d-none");
	document.querySelector("#pantalla-juego").classList.remove("d-none");
	//mostrar boton verificar
	document.querySelector("#boton-verificar").classList.remove("d-none");
	//inicializar indice pregunta actual e total puntos
	indice_pregunta_actual=0;
	total_puntos=0;
	mostrarPregunta(preguntas[indice_pregunta_actual]);	
}
function verificarPreguntaActual(){
	let divOpciones = document.querySelectorAll('#opciones div');
	let inputOpciones = document.querySelectorAll('#opciones input');
	for(let i = 0; i < inputOpciones.length; i++){
		if(inputOpciones[i].checked){
			if(preguntas[indice_pregunta_actual].opciones[i] == preguntas[indice_pregunta_actual].respuesta_correcta){
				total_puntos++;
				divOpciones[i].classList.add("correcta");
			} else {
				divOpciones[i].classList.add("erronea");
			}
		}
	}
}
function botonVerificar(){
	let algunaChequeda = false;
	let inputOpciones = document.querySelectorAll('#opciones input');
	for(let z=0; z < inputOpciones.length; z++){
		algunaChequeda = true;
		document.getElementById('boton-verificar').classList.add('d-none');
		document.getElementById('boton-siguiente').classList.remove('d-none');
		verificarPreguntaActual();
		break;
	}
}
let boton_verificar = document.querySelector("#boton-verificar");
boton_verificar.addEventListener("click", botonVerificar);

let boton_jugar = document.querySelector("#inicio-boton-jugar");
boton_jugar.addEventListener("click", iniciarJuego);

let boton_siguiente = document.querySelector("#boton-siguiente");
boton_siguiente.addEventListener("click", botonSiguiente);
let volver_a_jugar = document.querySelector("#resultado-boton-volver-a-jugar");
volver_a_jugar.addEventListener("click", iniciarJuego);


function botonSiguiente(){
	document.getElementById('boton-siguiente').classList.add('d-none');
	if (!obtenerSiguientePregunta()) {
		mostrarResultado();	
	}
	else{
	document.getElementById('boton-verificar').classList.remove('d-none');
	}
}