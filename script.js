const periodos = {

    1: {
        id: 1,
        nome: "1° PERÍODO",
        disciplinas: [

            { id: 1, nome: "Introdução à Teologia", carga: 60 },

            { id: 2, nome: "Metodologia Científica", carga: 60 },

            { id: 3, nome: "Leitura e Produção Textual", carga: 120 },

            { id: 4, nome: "Introdução Bíblica", carga: 60 },

            { id: 5, nome: "Antigo Testamento Pentateuco", carga: 60 },

            { id: 6, nome: "Introdução a Educação a Distância", carga: 30 }

        ]
    },

    2: {
        id: 2,
        nome: "2° PERÍODO",
        disciplinas: [

            { id: 7, nome: "Teologia Sistemática - Revelação e Criação", carga: 60 },

            { id: 8, nome: "Teologia e Ecologia - Educação Ambiental e Sustentabilidade", carga: 120 },

            { id: 9, nome: "Introdução à Filosofia", carga: 30 },

            { id: 10, nome: "Novo Testamento Evangelhos e Atos", carga: 60 },

            { id: 11, nome: "Antigo Testamento Livros Históricos", carga: 60 }

        ]
    },

    3: {
        id: 3,
        nome: "3° PERÍODO",
        disciplinas: [

            { id: 12, nome: "AT. Livros Sapienciais", carga: 60 },

            { id: 13, nome: "Arqueologia e Geografia", carga: 60 },

            { id: 14, nome: "Ética e Direitos Humanos", carga: 120 },

            { id: 15, nome: "Filosofia Moderna e Contemporânea", carga: 60 },

            { id: 16, nome: "NT. Epístolas Paulinas", carga: 60 },

            { id: 17, nome: "Teologia Sistemática - Cristologia e Soteriologia", carga: 60 }

        ]
    }

};

function carregarDisciplinas() {

    const periodoSelecionado = document.getElementById("periodo").value;
    const container = document.getElementById("listaDisciplinas");

    container.innerHTML = "";

    if (!periodoSelecionado) return;

    const disciplinas = periodos[periodoSelecionado].disciplinas;

    disciplinas.forEach(disciplina => {

        const label = document.createElement("label");

        label.innerHTML = `
        <input type="checkbox" value="${disciplina.carga}">
        ${disciplina.nome} - (${disciplina.carga}h)
    `;

        container.appendChild(label);
        container.appendChild(document.createElement("br"));

    });
}

function calcularDp() {

    const periodoSelecionado = Number(document.getElementById("periodo").value);
    const semestralidade = Number(document.getElementById("semestralidade").value);
    const parcelamento = Number(document.getElementById("parcelamento").value);
    const mensalidadeAluno = Number(document.getElementById("mensalidadeAluno").value);
    const descontoAluno = Number(document.getElementById("percentualDescAluno").value);

    if (!validarCampos()) return;

    const checkboxes = document.querySelectorAll("#listaDisciplinas input:checked");

    let disciplinaCH = 0;

    checkboxes.forEach(cb => {
        disciplinaCH += Number(cb.value);
    });

    if (disciplinaCH === 0) {
        alert("Selecione pelo menos uma disciplina.");
        return;
    }

    const periodo = periodos[periodoSelecionado];

    // soma da carga horária total do período
    let cargaTotal = 0;

    for (const d in periodo.disciplinas) {
        cargaTotal += periodo.disciplinas[d].carga;
    }

    const valorHora = semestralidade / cargaTotal;

    const valorDP = valorHora * disciplinaCH;

    const parcelaDP = valorDP / parcelamento;

    const novaMensalidade = mensalidadeAluno + parcelaDP;

    document.getElementById("resPeriodo").innerText =
        "Período: " + periodo.nome;

    document.getElementById("resHoraAula").innerText =
        "Valor da hora aula: " + moeda(valorHora);

    document.getElementById("resParcelaDp").innerText =
        "Parcela Dependência: " + moeda(parcelaDP);

    document.getElementById("resNovaMensalidade").innerText =
        "Nova mensalidade: " + moeda(novaMensalidade);


    calcularSemDesconto(descontoAluno, novaMensalidade);

    // MOSTRA O RESULTADO
    document.getElementById("resultado").style.display = "block";
}

function calcularSemDesconto(percentualDesc, valorFinal) {

    const diferencaDesc = (100 - percentualDesc) / 100;
    console.log("Diferença desconto: ", diferencaDesc);

    const parcelaSemDesconto = moeda(valorFinal / diferencaDesc);

    document.getElementById("resSemDesconto").innerText =
        "Mensalidade sem desconto: " + moeda(parcelaSemDesconto);
}

// MÉTODOS AUXILIARES

function validarCampos() {

    const campos = [
        { id: "periodo", mensagem: "Selecione um período." },
        { id: "semestralidade", mensagem: "Informe a semestralidade." },
        { id: "parcelamento", mensagem: "Informe o parcelamento." },
        { id: "mensalidadeAluno", mensagem: "Informe a mensalidade do aluno." },
        { id: "percentualDescAluno", mensagem: "Informe o desconto do aluno." }
    ];

    for (const campo of campos) {

        const valor = document.getElementById(campo.id).value;

        if (!valor) {
            alert(campo.mensagem);
            document.getElementById(campo.id).focus();
            return false;
        }

    }

    return true;
}

function moeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}