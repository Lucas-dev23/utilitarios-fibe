import { carregarGrade } from "../ui/gradeUI.js";
import { carregarPeriodos } from "../ui/periodosUI.js";
import { carregarDisciplinas } from "../ui/disciplinasUI.js";
import { validarCampos } from "../utils/validarCampos.js";
import { moeda } from "../utils/moeda.js";
import { buscarPeriodo, calcularCHTotalPeriodo } from "../data/periodos.js";
import { calcularSemDesconto } from "../utils/calculos.js";
import { mostrarNotificacao } from "../utils/notificacao.js";

// "Escutando" eventos no html
document.addEventListener("DOMContentLoaded", () => {

    carregarGrade();

    const form = document.getElementById("formDependencia");

    const selectGrade = document.getElementById("grade");

    selectGrade.addEventListener("change", () => {

        // Limpando as disciplinas anteriores
        document.getElementById("listaDisciplinas").innerHTML = "";

        // Limpando o cálculo anterior
        document.getElementById("resultado").style.display = "none";

        carregarPeriodos(selectGrade.value);
    });

    const selectPeriodo = document.getElementById("periodo");

    selectPeriodo.addEventListener("change", () => {
        carregarDisciplinas(selectGrade.value, selectPeriodo.value);

        // Limpando o cálculo anterior
        document.getElementById("resultado").style.display = "none";
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita a página de recarregar após cálculo
        calcularDependencia(form)
    });
});

function calcularDependencia(form) {

    const formData = new FormData(form);

    const grade = Number(formData.get("grade"));
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

    const chTotal = calcularCHTotalPeriodo(grade, periodo);

    const valorHora = semestralidade / chTotal;

    const valorDP = valorHora * cargaTotal;

    const parcelaDP = valorDP / parcelamento;

    const mensalidadeSemDesconto = semestralidade / parcelamento;

    const novaMensalidadeSemDesconto = mensalidadeSemDesconto + parcelaDP;

    // Aplicando desconto
    const novaMensalidade = novaMensalidadeSemDesconto * (1 - desconto / 100);

    mostrarLogs({
        cargaTotal,
        chTotal,
        valorHora,
        valorDP,
        parcelaDP,
        mensalidadeSemDesconto,
        novaMensalidadeSemDesconto
    });

    document.getElementById("resPeriodo").innerText =
        "Período: " + buscarPeriodo(grade, periodo).nome;

    document.getElementById("resDisciplinas").innerText =
        "Disciplinas: " + nomesDisciplinas.join(", ");

    document.getElementById("resHoraAula").innerText =
        "Hora aula: " + moeda(valorHora);

    document.getElementById("resParcelaDp").innerText =
        "Valor da(s) disciplina(s) em depenência: " + moeda(parcelaDP);

    document.getElementById("resNovaMensalidade").innerText =
        "Nova Mensalidade sem Desconto: " + moeda(novaMensalidadeSemDesonto);

    document.getElementById("resSemDesconto").innerText =
        "Mensalidade com desconto: " + moeda(novaMensalidade);

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
    console.log("Mensalidade sem Desconto:", mensalidadeSemDesconto);
    console.log("Nova Mensalidade com Dependência:", novaMensalidadeSemDesonto);

    console.groupEnd();
}
