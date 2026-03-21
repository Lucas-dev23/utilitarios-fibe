import { cursos } from "../data/cursos.js";
import { validarCampos } from "../utils/validarCampos.js";
import { valorNumero } from "../utils/domUtils.js";
import { moeda } from "../utils/moeda.js";

let mensagemGerada = "";

document.addEventListener("DOMContentLoaded", () => {

    carregarCursos();
    carregarParcelas();

    const botaoRenegociacao = document.getElementById("btnCalcularRenegociacao");
    const campoParcelas = document.getElementById("campoParcelas");
    const botaoCopiarMensagem = document.getElementById("copiarMensagem");

    botaoRenegociacao.addEventListener("click", () => {
        calcularRenegociacao();
    });

    campoParcelas.addEventListener("click", () => {
        toggleDropdown();
    });

    botaoCopiarMensagem.addEventListener("click", () => {
        copiarMensagem();
    })
});

function carregarCursos() {
    const select = document.getElementById("curso");

    // limpa opções (mantém a primeira)
    select.innerHTML = `<option value="">Selecione o curso</option>`;

    cursos.forEach(curso => {
        select.innerHTML += `
            <option value="${curso.id}">
                ${curso.nome}
            </option>
        `;
    });
}

function carregarParcelas(maxParcelas = 12) {
    const container = document.getElementById("dropdownParcelas");

    container.innerHTML = "";

    for (let i = 1; i <= maxParcelas; i++) {
        container.innerHTML += `
            <div class="form-check">
                <input class="form-check-input parcela-checkbox" 
                       type="checkbox" 
                       value="${i}" 
                       id="p${i}" 
                       name="parcelas[]">

                <label class="form-check-label" for="p${i}">
                    ${i}x
                </label>
            </div>
        `;
    }
}

function toggleDropdown() {
    document.getElementById("dropdownParcelas").classList.toggle("d-none");
}

function obterParcelasSelecionadas() {
    const checkboxes = document.querySelectorAll(".parcela-checkbox:checked");

    const valores = [];

    checkboxes.forEach(cb => {
        valores.push(Number(cb.value));
    });

    return valores;
}

function calcularRenegociacao() {

    if (!validarCampos()) return;

    const selectCurso = document.getElementById("curso");
    const cursoNome = selectCurso.options[selectCurso.selectedIndex].text;
    const divida = valorNumero("divida");
    const desconto = valorNumero("percentualDescAluno");
    const parcelas = obterParcelasSelecionadas();

    if (parcelas.length === 0) {
        alert("Selecione pelo menos uma parcela");
        return;
    }

    const dividaComDesconto = divida * (1 - desconto / 100);

    mensagemGerada = gerarMensagem({
        cursoNome,
        divida,
        desconto,
        parcelas
    });

    const resultadoDiv = document.getElementById("resultado");
    const lista = resultadoDiv.querySelector(".list-group");

    lista.innerHTML = "";

    // gera resultado para cada parcela
    parcelas.forEach(p => {

        const valorParcela = dividaComDesconto / p;

        lista.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
    
            <div>
                <div class="">${p}x de ${moeda(valorParcela)}</div>
            </div>

            <div class="text-end small text-muted">
                Tabela de preço<br>
                ${moeda(valorParcela * 2)}
            </div>

        </li>
        `;
    });

    // mostra resultado
    resultadoDiv.style.display = "block";
    
    // Fecha o dropdown parcelas
    document.getElementById("dropdownParcelas").classList.add("d-none");

    console.log({
        dividaComDesconto,
    })
}

function gerarMensagem({ cursoNome, divida, desconto, parcelas }) {

    const dividaComDesconto = divida * (1 - desconto / 100);

let mensagem = `Verificamos que há um valor em aberto referente ao seu curso de ${cursoNome}.
Pensando em ajudá-lo(a) a regularizar sua situação acadêmica, conseguimos uma condição especial de negociação para você.

💰 Valor original: ${moeda(divida)}
🎁 Desconto de ${desconto}%: ${moeda(dividaComDesconto)}

para quitação

Você pode escolher a forma que ficar melhor:

`;

    parcelas.forEach((p, index) => {
        const valorParcela = dividaComDesconto / p;

        mensagem += `✔ ${p}x de ${moeda(Number(valorParcela.toFixed(2)))}`;

        if (index < parcelas.length - 1) {
            mensagem += `\nou\n`;
        }
    });

mensagem += `

Assim conseguimos regularizar seu vínculo acadêmico. 

Qual dessas opções fica melhor para você? 😊`;

    return mensagem;
}

function copiarMensagem() {
    navigator.clipboard.writeText(mensagemGerada);
    alert("Mensagem copiada!");
}