import { periodos } from "../data/periodos.js";

export function carregarPeriodos() {
    const select = document.getElementById("periodo");

    periodos.forEach(periodo => {
        const option = document.createElement("option");

        option.value = periodo.id;
        option.textContent = periodo.nome;

        select.appendChild(option);
    });
}