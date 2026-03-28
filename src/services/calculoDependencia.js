import { carregarPeriodos } from "../ui/periodosUI.js";
import { carregarDisciplinas } from "../ui/disciplinasUI.js";
import { validarCampos } from "../utils/validarCampos.js";
import { moeda } from "../utils/moeda.js";
import { buscarPeriodo, calcularCHTotalPeriodo } from "../data/periodos.js";
import { calcularSemDesconto } from "../utils/calculos.js";
import { mostrarNotificacao } from "../utils/notificacao.js";

// "Escutando" eventos no html
document.addEventListener("DOMContentLoaded", () => {

    carregarPeriodos();

    const form = document.getElementById("formDependencia");
    const selectPeriodo = document.getElementById("periodo");

    selectPeriodo.addEventListener("change", () => {
        carregarDisciplinas(selectPeriodo.value);
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita a página de recarregar após cálculo
        calcularDependencia(form)
    });
});

function calcularDependencia(form) {

    const formData = new FormData(form);

    const periodo = Number(formData.get("periodo"));
    const semestralidade = Number(formData.get("semestralidade"));
    const parcelamento = Number(formData.get("parcelamento"));
    const mensalidadeAluno = Number(formData.get("mensalidadeAluno"));
    const desconto = Number(formData.get("percentualDescAluno"));
    const cargaHoraria = formData.getAll("disciplinas").map(Number);

    if (!validarCampos()) return;

    if (cargaHoraria.length === 0) {
        mostrarNotificacao("Selecione pelo menos uma disciplina", "danger");
        return;
    }

    const cargaTotal = cargaHoraria.reduce((total, value) => total + value, 0);

    const nomesDisciplinas = Array.from(
        document.querySelectorAll("#listaDisciplinas input:checked")
    ).map(cb => cb.dataset.nome);

    const chTotal = calcularCHTotalPeriodo(periodo);

    const valorHora = semestralidade / chTotal;

    const valorDP = valorHora * cargaTotal;

    const parcelaDP = valorDP / parcelamento;

    const novaMensalidade = mensalidadeAluno + parcelaDP;

    const mensalidadeSemDesconto = calcularSemDesconto(desconto, novaMensalidade);

    mostrarLogs({
        cargaTotal,
        chTotal,
        valorHora,
        valorDP,
        parcelaDP,
        novaMensalidade,
        mensalidadeSemDesconto
    });

    document.getElementById("resPeriodo").innerText =
        "Período: " + buscarPeriodo(periodo).nome;

    document.getElementById("resDisciplinas").innerText =
        "Disciplinas: " + nomesDisciplinas.join(", ");

    document.getElementById("resHoraAula").innerText =
        "Hora aula: " + moeda(valorHora);

    document.getElementById("resParcelaDp").innerText =
        "Parcela Dependência: " + moeda(parcelaDP);

    document.getElementById("resNovaMensalidade").innerText =
        "Nova mensalidade: " + moeda(novaMensalidade);

    document.getElementById("resSemDesconto").innerText =
        "Valor na tabela de preço: " + moeda(mensalidadeSemDesconto);

    // Mostra o resultado
    document.getElementById("resultado").style.display = "block";
}

function mostrarLogs({
    cargaTotal,
    chTotal,
    valorHora,
    valorDP,
    parcelaDP,
    novaMensalidade,
    mensalidadeSemDesconto
}) {

    console.group("📊 Cálculo de Dependência", new Date());

    console.log("Carga das disciplinas selecionadas:", cargaTotal);
    console.log("Carga total do período:", chTotal);
    console.log("Hora aula:", valorHora);
    console.log("Valor disciplina:", valorDP);
    console.log("Parcela com dependência:", parcelaDP);
    console.log("Nova mensalidade:", novaMensalidade);
    console.log("Mensalidade sem desconto:", mensalidadeSemDesconto);

    console.groupEnd();
}