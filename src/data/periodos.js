export const periodos = [
    {
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
    {
        id: 2,
        nome: "2° PERÍODO",
        disciplinas: [
            { id: 7, nome: "Teologia Sistemática - Revelação e Criação", carga: 60 },
            { id: 8, nome: "Teologia e Ecologia", carga: 120 },
            { id: 9, nome: "Introdução à Filosofia", carga: 30 },
            { id: 10, nome: "Novo Testamento Evangelhos e Atos", carga: 60 },
            { id: 11, nome: "Antigo Testamento Livros Históricos", carga: 60 }
        ]
    },
    {
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
];

export function buscarPeriodo(id) {
    return periodos.find(p => p.id === id);
}