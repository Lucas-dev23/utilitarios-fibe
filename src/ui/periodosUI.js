import { buscarGrade } from "../data/periodos.js";

export function carregarPeriodos(gradeId) {

    const select = document.getElementById("periodo");

    select.innerHTML = `<option value="">Selecione</option>`;

    if (!gradeId) {
        select.disabled = true; 
        return;
    }

    const grade = buscarGrade(Number(gradeId));

    if (!grade) {
        select.disabled = true;
        return;
    };

    select.disabled = false;

    grade.periodos.forEach(periodo => {

        const option = document.createElement("option");

        option.value = periodo.id;
        option.textContent = periodo.nome;

        select.appendChild(option);
    });
}