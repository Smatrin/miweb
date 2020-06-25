let fecha = new Date(), saludo = document.getElementById('saludo'), display = document.getElementById("display"), operandos = document.getElementById("operandos"),
    resultado = document.getElementById("resultado"), operador = ""

if (fecha.getHours() < 12) {
    showMsj("Buenos días");
} else if (fecha.getHours() >= 12){
    showMsj("Buenas tardes");
} else if (fecha.getHours() >= 19) {
    showMsj("Buenas noches");
}

/* ESTE BUCLE ES PARA AGREGAR EL EVENTO CLICK A LOS BOTONES 0 - 9 */
for (let i = 0; i < 10; i++) {
    document.getElementById(i).addEventListener("click", () => {
        if (operandos.innerHTML === "0") {
            operandos.innerHTML = "";
        }
        operandos.innerHTML += i;
    });  
}
 /** INVERSO **/
document.getElementById("inverso").addEventListener("click", () => {
    res = 1 / operandos.innerHTML;
    operandos.innerHTML = "1 / " + operandos.innerHTML + " = ";
    addClass();
    resultado.innerHTML = res.toFixed(3);
});

/** CUADRADO **/
document.getElementById("cuadrado").addEventListener("click", () => {
    let numero = operandos.innerHTML;
    operandos.innerHTML += "<sup class='sup'>2</sup>";
    operandos.innerHTML += "<span class='igual'>=</span>";
    resultado.innerHTML = +numero * +numero;
    addClass();
})

/** POTENCIA **/
document.getElementById("potencia").addEventListener("click", () => {
    operador = "^";
    operandos.innerHTML += " ^ ";    
})

/** ENTERO **/
document.getElementById("int").addEventListener("click", () => {
    let numero = 0;
    numero = +operandos.innerHTML;
    if (numero < 0) {     
        operandos.innerHTML = -Math.ceil(-(numero));
    } else {
        operandos.innerHTML = Math.floor(numero);
    }
});

/** RAIZ **/
document.getElementById("raiz").addEventListener("click", () => {
    if (operandos.innerHTML === "0") {
        operandos.innerHTML = "&radic; ";
        operador = "R";
    } else {
        let numero = +operandos.innerHTML;
        addClass();
        operandos.innerHTML = "&radic;" + operandos.innerHTML + " = ";
        resultado.innerHTML = raiz(numero)
    }
});

/** POSITIVO NEGATIVO **/
document.getElementById("pos-neg").addEventListener("click", () => {
    let numero = parseInt(operandos.innerHTML);
    if (operandos.innerHTML === "0") {
        operandos.innerHTML = "-";
    } else {
        if(parseInt(operandos.innerHTML) === numero) {
            operandos.innerHTML = -+operandos.innerHTML;
        }
    }
});

/** PORCENTAJE **/
document.getElementById("percent").addEventListener("click", () => {
    operador = "%";
    operandos.innerHTML += " % ";
});

/** LIMPIAR **/
document.getElementById("clear").addEventListener("click", () => {
    /*if (operandos.innerHTML === "0" && resultado.innerHTML === "") {
        location.reload();
    }*/
    //addClass();
    operandos.classList.remove("move-operandos")
    operandos.innerHTML = "0";
    resultado.innerHTML = "";
});

/** MULTIPLICACIÓN **/
document.getElementById("signo-multiplicacion").addEventListener("click", () => {
    operador = "*"
    operandos.innerHTML += " * ";
});

/** DIVISIÓN **/
document.getElementById("signo-division").addEventListener("click", () => {
    operador = "/"
    operandos.innerHTML += " / ";
});

/** SIGNO MAS **/
document.getElementById("signo-mas").addEventListener("click", () => {
    operador = "+";
    operandos.innerHTML += " + ";
});

/** SIGNO MENOS **/
document.getElementById("signo-menos").addEventListener("click", () => {
    operador = "-";
    operandos.innerHTML += " - ";
});

/** PUNTO **/
document.getElementById("dot").addEventListener("click", () => {
    if (operandos.innerHTML === "0") {
        operandos.innerHTML = "";
    }
    operandos.innerHTML += ".";
});

/** IGUAL **/
document.getElementById("igual").addEventListener("click", () => {
    operacionAritmetica();
    operandos.innerHTML += "=";
    addClass();
});

function showMsj(msj) {
    saludo.innerHTML = msj;    
}

function addClass() {
    operandos.classList.toggle("move-operandos");//AGREGA LA CLASE move-operandos SIN ELIMINAR LAS QUE YA TIENE
}

function operacionAritmetica() {
    let res;
    cadena = operandos.innerHTML.split("" + operador + "");
    switch(operador) {
		case "*":
			res = 1;
			for(i = 0; i < cadena.length; i++) {
				res = res * +cadena[i];
			}
		break;
		case "/":
			res = +cadena[0] / +cadena[1];
		break;
		case "+" :
			res = 0;
			for(i = 0; i < cadena.length; i++) {
				res += +cadena[i];
			}
		break;
		case "-" :
            res = +cadena[0];         
			for(i = 1; i < cadena.length; i++) {
                res -= +cadena[i];                
			}
		break;
		case "^":
            res = Math.pow(+cadena[0], +cadena[1]);
		break;
		case "%" :
			res = +cadena[0];
            res = (res / 100) * +cadena[1];
        break;
        case "R" :
            cadena = operandos.innerHTML.split(" ");
            console.log("cade", +cadena[1]);
            res = raiz(+cadena[1]);
        break;
    }
    resultado.innerHTML = res
}

function raiz(num) {
    if (num < 0) {
        return "Error";
    } else {
        return Math.sqrt(+num);
    }
}