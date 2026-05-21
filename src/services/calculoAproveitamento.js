import { carregarGrade } from "../ui/gradeUI.js";
import { carregarPeriodos } from "../ui/periodosUI.js";
import { carregarDisciplinas } from "../ui/disciplinasUI.js";
import { validarCampos } from "../utils/validarCampos.js";
import { moeda } from "../utils/moeda.js";
import { mostrarNotificacao } from "../utils/notificacao.js";
import { buscarPeriodo, calcularCHTotalPeriodo } from "../data/periodos.js";

// "Escutando" eventos no html
document.addEventListener("DOMContentLoaded", () => {

    carregarGrade();

    const form = document.getElementById("formAproveitamento");

    const selectGrade = document.getElementById("grade");

    selectGrade.addEventListener("change", () => {

        //Limpando disciplinas mostradas anteriormente
        document.getElementById("listaDisciplinas").innerHTML = "";

        //Limpando o resultado anterior
        document.getElementById("resultado").style.display = "none";

        carregarPeriodos(selectGrade.value);
    });

    const selectPeriodo = document.getElementById("periodo");

    selectPeriodo.addEventListener("change", () => {
        carregarDisciplinas(selectGrade.value, selectPeriodo.value);
        
        //Limpando o resultado anterior
        document.getElementById("resultado").style.display = "none";
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita a página de recarregar após cálculo
        calcularAproveitamento(form)
    });
});

function calcularAproveitamento(form) {

    const formData = new FormData(form);

    const grade = Number(formData.get("grade"));
    const periodo = Number(formData.get("periodo"));
    const semestralidade = Number(formData.get("semestralidade"));
    const parcelamento = Number(formData.get("parcelamento"));
    const desconto = Number(formData.get("percentualDescAluno"));
    const disciplinasCH = formData.getAll("disciplinas").map(Number);

    if (!validarCampos()) return;

    if (disciplinasCH.length === 0) {
        mostrarNotificacao("Selecione pelo menos uma disciplina.", "danger");
        return;
    }

    const disciplinasCHTotal = disciplinasCH.reduce((total, value) => total + value, 0);

    const nomesDisciplinas = Array.from(
        document.querySelectorAll("#listaDisciplinas input:checked")
    ).map(cb => cb.dataset.nome);

    const chTotal = calcularCHTotalPeriodo(grade, periodo);

    const valorHora = semestralidade / chTotal;

    const valorDisciplina = valorHora * disciplinasCHTotal;

    const parcelaAP = valorDisciplina / parcelamento;

    const mensalidadeSemDesconto = semestralidade / parcelamento;

    const novaMensalidadeSemDesconto = mensalidadeSemDesconto - parcelaAP;

    // Aplicando desconto
    const novaMensalidade = novaMensalidadeSemDesconto * (1 - desconto / 100);

    mostrarLogs({
        disciplinasCHTotal,
        chTotal,
        valorHora,
        valorDisciplina,
        parcelaAP,
        mensalidadeSemDesconto,
        novaMensalidadeSemDesconto,
        novaMensalidade
    });

    document.getElementById("resPeriodo").innerText =
        "Período: " + buscarPeriodo(grade, periodo).nome;

    document.getElementById("resDisciplinas").innerText =
        "Disciplinas: " + nomesDisciplinas.join(", ");

    document.getElementById("resHoraAula").innerText =
        "Hora aula: " + moeda(valorHora);

    document.getElementById("resParcelaAp").innerText =
        "Parcela com eliminações: " + moeda(parcelaAP);

    document.getElementById("resNovaMensalidade").innerText =
        "Nova mensalidade: " + moeda(novaMensalidade);

    document.getElementById("resSemDesconto").innerText =
        "Mensalidade integral: " + moeda(novaMensalidadeSemDesconto);

    // Mostra o resultado
    document.getElementById("resultado").style.display = "block";
}

function mostrarLogs({
    disciplinasCHTotal,
    chTotal,
    valorHora,
    valorDisciplina,
    parcelaAP,
    mensalidadeSemDesconto,
    novaMensalidadeSemDesconto,
    novaMensalidade
}) {

    console.group("📊 Cálculo de Aproveitamento", new Date());

    console.log("Carga total das disciplinas:", disciplinasCHTotal);
    console.log("Carga total do período:", chTotal);
    console.log("Hora aula:", valorHora);
    console.log("Valor disciplina:", valorDisciplina);
    console.log("Parcela com eliminação de disciplinas:", parcelaAP);
    console.log("Mensalidade sem desconto:", mensalidadeSemDesconto);
    console.log("Nova mensalidade sem desconto:", novaMensalidadeSemDesconto);
    console.log("Nova mensalidade com desconto:", novaMensalidade);

    console.groupEnd();
}