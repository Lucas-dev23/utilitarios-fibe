import { carregarDisciplinas } from "../ui/disciplinasUI.js";
import { validarCampos } from "../utils/validarCampos.js";
import { valorNumero } from "../utils/domUtils.js";
import { moeda } from "../utils/moeda.js";
import { obterDisciplinasSelecionadas } from "../utils/disciplinasSelecionadas.js";
import { buscarPeriodo } from "../data/periodos.js";
import { calcularSemDesconto } from "../utils/calculos.js";

document.addEventListener("DOMContentLoaded", () => {

    const selectPeriodo = document.getElementById("periodo");
    const btnCalcular = document.getElementById("btnCalcular");

    selectPeriodo.addEventListener("change", () => {
        carregarDisciplinas(selectPeriodo.value);
    });

    btnCalcular.addEventListener("click", calcularDependencia);
});

function calcularDependencia() {

    if (!validarCampos()) return;

    const periodoId = valorNumero("periodo");
    const semestralidade = valorNumero("semestralidade");
    const parcelamento = valorNumero("parcelamento");
    const mensalidadeAluno = valorNumero("mensalidadeAluno");
    const desconto = valorNumero("percentualDescAluno");

    const { cargaTotal, nomes } = obterDisciplinasSelecionadas();

    if (cargaTotal === 0) {
        alert("Selecione pelo menos uma disciplina");
        return;
    }

    const periodo = buscarPeriodo(periodoId);

    const chTotal = periodo.disciplinas
        .reduce((total, d) => total + d.carga, 0);

    const valorHora = semestralidade / chTotal;
    console.log("Hora aula: ", valorHora);

    const valorDP = valorHora * cargaTotal;
    console.log("Valor disciplina: ", valorDP);

    const parcelaDP = valorDP / parcelamento;
    console.log("Parcela com dependência: ", parcelaDP);

    const novaMensalidade = mensalidadeAluno + parcelaDP;
    console.log("Nova mensalidade da dependência com desconto: ", novaMensalidade);

    const mensalidadeSemDesconto = calcularSemDesconto(desconto, novaMensalidade);
    console.log("Mensalidade sem desconto aplicado: ", mensalidadeSemDesconto);

    document.getElementById("resPeriodo").innerText =
        "Período: " + periodo.nome;

    document.getElementById("resDisciplinas").innerText =
        "Disciplinas: " + nomes.join(", ");

    document.getElementById("resHoraAula").innerText =
        "Hora aula: " + moeda(valorHora);

    document.getElementById("resParcelaDp").innerText =
        "Parcela Dependência: " + moeda(parcelaDP);

    document.getElementById("resNovaMensalidade").innerText =
        "Nova mensalidade: " + moeda(novaMensalidade);

    document.getElementById("resSemDesconto").innerText =
        "Mensalidade sem desconto: " + moeda(mensalidadeSemDesconto);

    // Mostra o resultado
    document.getElementById("resultado").style.display = "block";
}