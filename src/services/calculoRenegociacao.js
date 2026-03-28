import { carregarCursos } from "../ui/cursosUI.js";
import { carregarParcelas } from "../ui/parcelasUI.js";
import { validarCampos } from "../utils/validarCampos.js";
import { moeda } from "../utils/moeda.js";
import { mostrarNotificacao } from "../utils/notificacao.js";

let mensagemGerada = "";

// "Escutando" eventos no html
document.addEventListener("DOMContentLoaded", () => {

    carregarCursos();
    carregarParcelas();

    const form = document.getElementById("formRenegociacao");
    const campoParcelas = document.getElementById("campoParcelas");
    const botaoCopiarMensagem = document.getElementById("copiarMensagem");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita a página de recarregar após cálculo
        calcularRenegociacao(form);
    });

    campoParcelas.addEventListener("click", () => {
        toggleDropdown();
    });

    botaoCopiarMensagem.addEventListener("click", () => {
        copiarMensagem(form);
    })
});

function toggleDropdown() {
    document.getElementById("dropdownParcelas").classList.toggle("d-none");
}

function calcularRenegociacao(form) {

    const formData = new FormData(form);

    const cursoNome = formData.get("curso");
    const divida = Number(formData.get("divida"));
    const desconto = Number(formData.get("percentualDescAluno"));
    const parcelas = formData.getAll("parcelas[]").map(Number);

    if (!validarCampos()) return;

    if (parcelas.length === 0) {
        mostrarNotificacao("Selecione pelo menos uma parcela", "danger");
        return;
    }

    const dividaComDesconto = divida * (1 - desconto / 100);

    mensagemGerada = gerarMensagem({
        cursoNome,
        divida,
        dividaComDesconto,
        desconto,
        parcelas
    });

    const resultadoDiv = document.getElementById("resultado");
    const lista = resultadoDiv.querySelector(".list-group");

    lista.innerHTML = "";

    // ==============================
    // Dívida com desconto
    // ==============================
    const itemTotal = document.createElement("li");
    itemTotal.className = "list-group-item d-flex justify-content-between align-items-center";

    const esquerdaTotal = document.createElement("div");
    esquerdaTotal.innerHTML = `
    <strong>Dívida com desconto:</strong> 
    ${moeda(dividaComDesconto)}
`;

    itemTotal.appendChild(esquerdaTotal);
    lista.appendChild(itemTotal);

    // ==============================
    // 🔹 Parcelas
    // ==============================
    parcelas.forEach(p => {

        const valorParcela = dividaComDesconto / p;

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        // lado esquerdo
        const esquerda = document.createElement("div");
        esquerda.innerHTML = `
        ${p}x de ${moeda(valorParcela)}
    `;

        // lado direito
        const direita = document.createElement("div");
        direita.className = "text-end small text-muted";
        direita.innerHTML = `
        Tabela de preço<br>
        ${moeda(valorParcela * 2)}
    `;

        li.appendChild(esquerda);
        li.appendChild(direita);

        lista.appendChild(li);
    });

    // mostra resultado
    resultadoDiv.style.display = "block";

    // Fecha o dropdown parcelas
    document.getElementById("dropdownParcelas").classList.add("d-none");

    console.log({
        dividaComDesconto,
    })
}

function gerarMensagem({ cursoNome, divida, dividaComDesconto, desconto, parcelas }) {

    let mensagem = `Verificamos que há um valor em aberto referente ao seu curso de ${cursoNome}.
Pensando em ajudá-lo(a) a regularizar sua situação acadêmica, conseguimos uma condição especial de negociação para você.

💰 Valor original: ${moeda(divida)}
🎁 Desconto de ${desconto}%: ${moeda(dividaComDesconto)}

para quitação

Você pode escolher a forma que ficar melhor:

`;

    parcelas.forEach((p, index) => {
        const valorParcela = dividaComDesconto / p;

        mensagem += `✔ ${p}x de ${moeda(valorParcela)}`;

        if (index < parcelas.length - 1) {
            mensagem += `\nou\n`;
        }
    });

    mensagem += `

Assim conseguimos regularizar seu vínculo acadêmico. 

Qual dessas opções fica melhor para você? 😊`;

    return mensagem;
}

function copiarMensagem(form) {
    navigator.clipboard.writeText(mensagemGerada);
    mostrarNotificacao("Mensagem copiada!", "success");

    resetarFormulario(form);
}

function resetarFormulario(form) {
    form.reset();

    // limpa checkboxes manualmente (não estão dentro de input padrão)
    const checkboxes = document.querySelectorAll(".parcela-checkbox");
    checkboxes.forEach(cb => cb.checked = false);

    // esconde resultado
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.style.display = "none";

    // limpa lista
    const lista = resultadoDiv.querySelector(".list-group");
    lista.innerHTML = "";

    mensagemGerada = "";
}