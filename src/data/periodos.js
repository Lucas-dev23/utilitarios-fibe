export const periodos = [
    {
        id: 1,
        nome: "1° Período",
        disciplinas: [
            { id: 1, nome: "Introdução à EAD - Extensão", carga: 80 },
            { id: 2, nome: "Metodologia Científica", carga: 80 },
            { id: 3, nome: "Introdução aos Est. Teol. e Bíblicos", carga: 80 },
        ]
    },
    {
        id: 2,
        nome: "2° Período",
        disciplinas: [
            { id: 4, nome: "Leitura e Prod. Textual - Extensão", carga: 80 },
            { id: 5, nome: "AT - Pentateuco e Históricos", carga: 80 },
            { id: 6, nome: "NT - Evangelhos e Atos", carga: 80 },
        ]
    },
    {
        id: 3,
        nome: "3° Período",
        disciplinas: [
            { id: 7, nome: "AT - Livros Sapienciais", carga: 80 },
            { id: 8, nome: "NT - Epistolas Paulinas", carga: 80 },
            { id: 9, nome: "Introdução a Filo. Ant. e Med.", carga: 80 },
            { id: 10, nome: "Arq., Geog. Bíblica e Educação Ambiental - Etensão", carga: 80 },
        ]
    },
    {
        id: 4,
        nome: "4º Período",
        disciplinas: [
            { id: 11, nome: "NT - Heb., Ger. e Apoc", carga: 80 },
            { id: 12, nome: "Diálogos em Psicologia e Min. Pastoral", carga: 80 },
            { id: 13, nome: "Hebraico Instrumental - Extensão", carga: 80 },
            { id: 14, nome: "Sistemática - Revelação e Criação", carga: 80 },
            { id: 15, nome: "Introdução a Filo. Mod. e Cont.", carga: 80 },
        ]
    },
    {
        id: 5,
        nome: "5º Período",
        disciplinas: [
            { id: 16, nome: "Grego Instrumental - Extensão", carga: 80 },
            { id: 17, nome: "Dial. em Teol. Armin. e Mov. Pent. e Carismático", carga: 80 },
            { id: 18, nome: "Sistemática - Cristologia e Soteriologia", carga: 80 },
            { id: 19, nome: "Hist. da Igreja Ant. e Med.", carga: 80 },
        ]
    },
    {
        id: 6,
        nome: "6º Período",
        disciplinas: [
            { id: 20, nome: "Hist. da Igreja Mod. e Cont.", carga: 80 },
            { id: 21, nome: "Sistemática - Pneumatologia e Eclesiologia", carga: 80 },
            { id: 22, nome: "Supervisão de Estágio II", carga: 80 },
            { id: 23, nome: "Dial. em Teol. Pública e da Missão - Cultura Afro-Brasileira, Africana e Indigena - Extensão", carga: 80 },
        ]
    },
    {
        id: 7,
        nome: "7º Período",
        disciplinas: [
            { id: 24, nome: "Metodologia Exagética e Hermenêutica", carga: 80 },
            { id: 25, nome: "Sistemática - Hamartiologia e Antropologia", carga: 80 },
            { id: 26, nome: "TCC 1", carga: 80 },
            { id: 27, nome: "Teologia Contemporânea - Direitos Humanos e Relações Étinico-Raciais - Extensão", carga: 80 },
        ]
    },
    {
        id: 8,
        nome: "8º Período",
        disciplinas: [
            { id: 28, nome: "Sistemática - Escatologia", carga: 80 },
            { id: 29, nome: "Homilética - Extensão", carga: 80 },
            { id: 30, nome: "TCC 2", carga: 80 },
            { id: 31, nome: "Optativa", carga: 80 }
        ]
    }
];

export function buscarPeriodo(id) {
    return periodos.find(p => p.id === id);
}

export function calcularCHTotalPeriodo(id) {
    const periodo = buscarPeriodo(id);
    
    return periodo.disciplinas.reduce((total, d) => total + d.carga, 0);
}