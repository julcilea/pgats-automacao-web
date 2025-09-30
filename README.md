# Automação Web com Cypress

Este projeto contém testes automatizados de interface web utilizando Cypress, focando no site [Automation Exercise](https://automationexercise.com/).

## Pré-requisitos

- Node.js (versão 12 ou superior)
- npm (Node Package Manager)

## Instalação

1. Clone este repositório:
```bash
git clone https://github.com/julcilea/pgats-automacao-web.git
cd pgats-automacao-web
```

2. Instale as dependências:
```bash
npm install
```

## Executando os Testes

### Modo Interativo (Cypress Test Runner)

Para abrir o Cypress em modo interativo:
```bash
npx cypress open
```

No Test Runner:
1. Selecione "E2E Testing"
2. Escolha um navegador
3. Clique em "Start E2E Testing"
4. Selecione o arquivo de teste que deseja executar (ex: `automation-exercise.cy.js`)

### Modo Headless (Linha de Comando)

Para executar todos os testes em modo headless:
```bash
npx cypress run
```

Para executar um arquivo específico:
```bash
npx cypress run --spec "cypress/e2e/automation-exercise.cy.js"
```

## Estrutura do Projeto

```
├── cypress/
│   ├── e2e/                    # Arquivos de teste
│   │   ├── automation-exercise.cy.js
│   ├── fixtures/              # Arquivos de dados para testes
│   └── support/               # Comandos customizados e configurações
├── cypress.config.js          # Configuração do Cypress
└── package.json              # Dependências e scripts
```

## Recursos

- [Documentação do Cypress](https://docs.cypress.io/)
- [Site Automation Exercise](https://automationexercise.com/)
