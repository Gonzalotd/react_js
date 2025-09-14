const operadores = ["+", "-", "*", "/"];
const decimales = ".";

function esNumero(digito) {
    return !isNaN(parseFloat(digito)) && isFinite(digito);
}

function esOperador(digito) {
    return operadores.includes(digito);
}

function esDecimal(digito) {
    return digito === decimales;
}

function actualizarEstadoDecimal(cadena, decimalFlat) {
    const ultimosCaracteres = cadena.slice(-2);
    
    if (/[+\-*/]\d/.test(ultimosCaracteres)) {
        return false;
    } else if (/\d\./.test(ultimosCaracteres)) {
        return true;
    }
    
    return decimalFlat;
}

// ==================== CALCULADORA ====================
export class Calculadora {
    constructor() {
        this.display = "0";
        this.decimalFlat = true;
        this.operadorFlat = true;
        this.stateEqual = false;
        this.total = 0;
    }

    manejarEntrada(digito) {
        if (this.display === "0" && !this.stateEqual) {
            this.primerDigito(digito);
        } else {
            this.comprobar(digito);
        }
        return this.display;
    }

    primerDigito(digito) {
        if (esDecimal(digito)) {
            this.display += digito;
            this.decimalFlat = true;
            this.operadorFlat = true;
        } else if (esNumero(digito)) {
            this.display = digito;
            this.operadorFlat = false;
            this.decimalFlat = false;
        }
    }

    comprobar(digito) {
        if (esOperador(digito)) {
            if (!this.operadorFlat) {
                this.operaciones(digito);
                this.operadorFlat = true;
            }
        } else if (esDecimal(digito)) {
            if (!this.decimalFlat) {
                this.display += digito;
                this.decimalFlat = true;
                this.operadorFlat = true;
            }
        } else if (esNumero(digito)) {
            if (this.stateEqual) {
                this.display = digito;
                this.stateEqual = false;
            } else {
                this.display += digito;
                this.operadorFlat = false;
                this.decimalFlat = actualizarEstadoDecimal(this.display, this.decimalFlat);
            }
        }
    }

    operaciones(digito) {
        this.display += digito;
    }

    calcular() {
        try {
            this.total = eval(this.display);
            this.stateEqual = true;
            this.display = this.total.toString();
            return this.total;
        } catch (error) {
            this.display = "Error";
            return "Error";
        }
    }

    limpiar() {
        this.display = "0";
        this.decimalFlat = true;
        this.operadorFlat = true;
        this.stateEqual = false;
        this.total = 0;
        return this.display;
    }

    getDisplay() {
        return this.display;
    }
}

export { 
    operadores, 
    esNumero, 
    esOperador, 
    esDecimal, 
    actualizarEstadoDecimal 
};

// export default {
//     Calculadora,
//     operadores,
//     esNumero,
//     esOperador,
//     esDecimal,
//     actualizarEstadoDecimal
// };