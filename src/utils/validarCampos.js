export function validarCampos() {

    const campos = [
        { id: "periodo", mensagem: "Selecione um período." },
        { id: "semestralidade", mensagem: "Informe a semestralidade." },
        { id: "parcelamento", mensagem: "Informe o parcelamento." },
        { id: "mensalidadeAluno", mensagem: "Informe a mensalidade do aluno." },
        { id: "percentualDescAluno", mensagem: "Informe o desconto do aluno." }
    ];

    for (const campo of campos) {

        const elemento = document.getElementById(campo.id);

        // se o campo não existir na página, ignora
        if (!elemento) continue;

        const valor = document.getElementById(campo.id).value;

        if (!valor) {
            alert(campo.mensagem);
            return false;
        }

    }

    return true;
}