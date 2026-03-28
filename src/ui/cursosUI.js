import { cursos } from "../data/cursos.js";

export function carregarCursos() {
    const select = document.getElementById("curso");

    // limpa opções (mantém a primeira)
    select.innerHTML = `<option value="">Selecione o curso</option>`;

    cursos.forEach(curso => {
        select.innerHTML += `
            <option value="${curso.nome}">
                ${curso.nome}
            </option>
        `;
    });
}