import { carregarDisciplinas } from "../ui/disciplinasUI.js";
import { validarCampos } from "../utils/validarCampos.js";
import { valorNumero } from "../utils/domUtils.js";
import { moeda } from "../utils/moeda.js";
import { obterDisciplinasSelecionadas } from "../utils/disciplinasSelecionadas.js";
import { buscarPeriodo } from "../data/periodos.js";
import { calcularSemDesconto } from "../utils/calculos.js";

document.addEventListener("DOMContentLoaded", () => {

    const selectPeriodo = document.getElementById("periodo");
    const btnCalcular = document.getElementById("btnCalcularAproveitamento");

    selectPeriodo.addEventListener("change", () => {
        carregarDisciplinas(selectPeriodo.value);
    });

    btnCalcular.addEventListener("click", calcularAproveitamento);
});

function calcularAproveitamento() {

    if (!validarCampos()) return;

    const periodoId = valorNumero("periodo");
    const semestralidade = valorNumero("semestralidade");
    const parcelamento = valorNumero("parcelamento");
    const mensalidadeAluno = valorNumero("mensalidadeAluno");
    const desconto = valorNumero("percentualDescAluno");

    const { cargaTotal, nomes } = obterDisciplinasSelecionadas();

    if (cargaTotal === 0) {
        alert("Selecione pelo menos uma disciplina.");
        return;
    }

    const periodo = buscarPeriodo(periodoId);

    const chTotal = periodo.disciplinas
        .reduce((total, d) => total + d.carga, 0);

    const valorHora = semestralidade / chTotal;
    console.log("Hora aula: ", valorHora);

    const valorDisciplina = valorHora * cargaTotal;
    console.log("Valor disciplina: ", valorDisciplina);

    const parcelaAP = valorDisciplina / parcelamento;
    console.log("Parcela com eliminções de disciplina: ", parcelaAP);

    const mensalidadeSemDesconto =
        calcularSemDesconto(desconto, mensalidadeAluno);
    console.log("Mensalidade sem desconto: ", mensalidadeSemDesconto);

    const novaMensalidadeSemDesconto =
        mensalidadeSemDesconto - parcelaAP;
    console.log("Nova mensalidade com eliminação e sem desconto: ", novaMensalidadeSemDesconto);

    const novaMensalidade =
        novaMensalidadeSemDesconto * (1 - desconto / 100);
    console.log("Nova mensalidade com desconto aplicado: ", novaMensalidade);

    document.getElementById("resPeriodo").innerText = 
        "Período: " + periodo.nome;

    document.getElementById("resDisciplinas").innerText =
        "Disciplinas: " + nomes.join(", ");

    document.getElementById("resHoraAula").innerText =
        "Hora aula: " + moeda(valorHora);

    document.getElementById("resParcelaAp").innerText =
        "Parcela com eliminações: " + moeda(parcelaAP);

    document.getElementById("resNovaMensalidade").innerText =
        "Nova mensalidade: " + moeda(novaMensalidade);

    document.getElementById("resSemDesconto").innerText =
        "Mensalidade sem desconto: " + moeda(novaMensalidadeSemDesconto);

    // Mostra o resultado
    document.getElementById("resultado").style.display = "block";
}