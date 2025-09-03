function celsiusAFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitACelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function convertir() {
    const valor = parseFloat(document.getElementById("temperatura").value);
    const escala = document.getElementById("escala").value;
    const resultadoDiv = document.getElementById("resultado");

    if (isNaN(valor)) {
        resultadoDiv.innerHTML = "Por favor, ingresa un número válido.";
        return;
    }

    let resultado = "";
    if (escala === "celsius") {
        resultado = `${valor} °C = ${celsiusAFahrenheit(valor).toFixed(2)} °F`;
    } else {
        resultado = `${valor} °F = ${fahrenheitACelsius(valor).toFixed(2)} °C`;
    }

    resultadoDiv.innerHTML = resultado;
}
