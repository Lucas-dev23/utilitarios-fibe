import { gradesCurriculares } from "../data/periodos.js";

export function carregarGrade() {
    const select = document.getElementById("grade");

    gradesCurriculares.forEach(grades => {
        const option = document.createElement("option");

        option.value = grades.id;
        option.textContent = grades.nome;

        select.appendChild(option);
    });
}