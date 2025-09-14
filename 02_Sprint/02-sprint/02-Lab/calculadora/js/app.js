(() => {   
        const valor = document.querySelectorAll('.value');
        const display = document.querySelector('.show');
        const resultado = document.querySelector('.signoEqual');
        const limpiar = document.querySelector('.clean');

        let decimalFlat = true;
        let operadorFlat = true;
        let stateEqual = false;
        let digito;
        let total = 0;

        const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        const operadores = ["+", "-", "*", "/"];
        const decimales = ".";        
        
        valor.forEach( (num) => {
            num.addEventListener('click', (e) => {

                digito = e.target.textContent;

                if (display.innerHTML === "0" && !stateEqual) {
                    primerDigito(digito);
                } else {
                    comprobar(digito);
                }         
            })
        })

        const primerDigito = (digito) => {

            if (digito == decimales ) {
                display.innerHTML += digito;
                decimalFlat = true;
                operadorFlat = true;
            } else if (numeros.includes(Number(digito))) {
                display.innerHTML = digito;
                operadorFlat = false;
                decimalFlat = false;
            }
        }

        const comprobar = (digito) => {
           
            const indiceOperador = operadores.findIndex(opera => opera == digito);
            switch (digito) {
                case operadores[indiceOperador] :
                    if ( operadorFlat == false) {
                        operaciones(digito);
                        operadorFlat = true;
                    }
                    break;

                case "." :
                    if ( decimalFlat == false ) {
                        display.innerHTML += digito;
                        decimalFlat = true;
                        operadorFlat = true;
                    } else {
                        display.innerHTML;
                    }
                    break;

                default:                    

                    if ( numeros.includes(Number(digito)) ) {
                        console.log("entro", stateEqual, numeros.includes(Number(digito)));

                        if ( stateEqual ) {
                            display.innerHTML = digito;
                            stateEqual = false
                        } else {
                            display.innerHTML += digito;
                            operadorFlat = false;
                            actualizarEstadoDecimal(display.innerHTML )
                        }
                    }
            }
           
        }

        const actualizarEstadoDecimal = (cadena) => {
            const ultimosCaracteres = cadena.slice(-2);
            
            // Desbloquea cuando: [operador][número]
            if (/[+\-*/]\d/.test(ultimosCaracteres)) {
                return decimalFlat = false;
            }
            // Bloquea cuando: [número][.]
            else if (/\d\./.test(ultimosCaracteres)) {
                return decimalFlat = true;
            }
            
            return decimalFlat; // Mantiene el estado actual
        }

        const operaciones = (digito) => {
            display.innerHTML += digito;            
        }
    
        resultado.addEventListener('click', () => {

            total = eval(display.innerHTML);
            stateEqual = true;

            display.textContent = total;
        })

        limpiar.addEventListener('click', () => {
            display.innerHTML = 0;
            decimalFlat = true;
            operadorFlat = true;
        })
     
 })();