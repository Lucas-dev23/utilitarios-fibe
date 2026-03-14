export function calcularSemDesconto(percentualDesc, valorComDesconto) {

    const fator = (100 - percentualDesc) / 100;

    return valorComDesconto / fator;
}