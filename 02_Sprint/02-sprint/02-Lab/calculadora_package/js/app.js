
import { Calculadora } from '../../node_modules/@gonztd/calculadora/main.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const valor = document.querySelectorAll('.value');
    const display = document.querySelector('.show');
    const resultado = document.querySelector('.signoEqual');
    const limpiar = document.querySelector('.clean');
  
    const calculadora = new Calculadora();

    valor.forEach((num) => {
        num.addEventListener('click', (e) => {
            const digito = e.target.textContent;            
            const nuevoDisplay = calculadora.manejarEntrada(digito);
            display.textContent = nuevoDisplay;
        });
    });

    resultado.addEventListener('click', () => {
        const resultadoCalculo = calculadora.calcular();
        display.textContent = resultadoCalculo;
    });

    limpiar.addEventListener('click', () => {
        const displayLimpio = calculadora.limpiar();
        display.textContent = displayLimpio;
    });
});