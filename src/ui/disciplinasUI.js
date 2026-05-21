import { buscarGrade, buscarPeriodo } from "../data/periodos.js";

export function carregarDisciplinas(gradeId, periodoId) {

    // Container onde as disciplinas são exibidas
    const container = document.getElementById("listaDisciplinas");

    // Limpa as disciplinas exibidas anteriormente
    container.innerHTML = "";

    // Sem grade selecionada não execute a função
    if (!gradeId) return;

    if (!periodoId) return;

    // Pegando o período selecionado
    const periodo = buscarPeriodo(Number(gradeId), Number(periodoId));

    // Criando os checkboxes das disciplinas
    periodo.disciplinas.forEach(disciplina => {

        const label = document.createElement("label");

        label.innerHTML = `
        <input type="checkbox" name="disciplinas" value="${disciplina.carga}" data-nome="${disciplina.nome}">
        ${disciplina.nome} - (${disciplina.carga}h)
        `;

        // Add o label(child) dentro da div container(pai)
        container.appendChild(label);
        container.appendChild(document.createElement("br"));
    });
}