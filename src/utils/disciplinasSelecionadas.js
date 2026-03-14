export function obterDisciplinasSelecionadas() {

    const checkboxes = document.querySelectorAll("#listaDisciplinas input:checked");

    let cargaTotal = 0;
    let nomes = [];

    checkboxes.forEach(cb => {
        cargaTotal += Number(cb.value);
        nomes.push(cb.dataset.nome);
    });

    return { cargaTotal, nomes };
}