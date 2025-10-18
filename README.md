# Automação Web com Cypress

Este projeto contém testes automatizados de interface web utilizando Cypress, focando no site [Automation Exercise](https://automationexercise.com/) e [DevFinance](https://devfinance-agilizei.netlify.app/).

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
4. Selecione o arquivo de teste que deseja executar

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
│   │   ├── using-testcraft.cy.js
│   ├── fixtures/              # Arquivos de dados para testes
│   ├── support/               # Comandos customizados e configurações
│   │   ├── pageObject/       # Page Objects para os testes
│   │   │   ├── modalPage.js
│   └── reports/              # Relatórios gerados pelos testes
├── .github/
│   └── workflows/            # Configurações do GitHub Actions
│       └── main.yml         # Pipeline de CI/CD
├── cypress.config.js         # Configuração do Cypress
└── package.json             # Dependências e scripts
```

## Configurações Principais

### GitHub Actions Pipeline

O projeto utiliza GitHub Actions para CI/CD com as seguintes características:

- **Triggers**: 
  - Push na branch main
  - Execução manual (workflow_dispatch)

- **Configurações de Relatório**:
  - Geração automática de relatórios HTML
  - Upload de artefatos (vídeos, screenshots e relatórios)
  - Publicação no GitHub Pages

### Cypress Reporter

Utilizamos o Cypress Mochawesome Reporter com as seguintes configurações:

```javascript
reporter: 'cypress-mochawesome-reporter',
reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Test Results',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
}
```

### Page Objects

O projeto utiliza o padrão Page Object para melhor organização e manutenção dos testes:

- Separação de responsabilidades
- Reutilização de código
- Manutenção simplificada
- Melhor legibilidade dos testes

### BrowserStack Integration

O projeto está integrado com o BrowserStack para testes em múltiplos navegadores e sistemas operacionais:

#### Configurações Disponíveis:

```javascript
{
    "browsers": [
        {
            "browser": "chrome",
            "os": "Windows 10",
            "versions": ["latest", "latest-1"]
        },
        {
            "browser": "firefox",
            "os": "Windows 10",
            "versions": ["latest", "latest-1"]
        }
    ]
}
```

#### Execução de Testes no BrowserStack:

Para executar os testes no BrowserStack:

```bash
npx browserstack-cypress run
```

Para executar um teste específico:

```bash
npx browserstack-cypress run --spec "cypress/e2e/nome-do-teste.cy.js"
```

#### Recursos do BrowserStack:

- Testes em múltiplos navegadores
- Testes em diferentes sistemas operacionais
- Capturas de tela automáticas
- Gravação de vídeo dos testes
- Dashboard de resultados
- Integração com CI/CD

Para acessar os resultados dos testes:
1. Acesse o [BrowserStack Dashboard](https://automate.browserstack.com/)
2. Navegue até "Cypress Tests"
3. Visualize os resultados, screenshots e vídeos

## Visualização dos Resultados

### GitHub Actions

Os resultados dos testes podem ser visualizados:

1. Na aba "Actions" do repositório
2. No GitHub Pages do projeto
3. Nos artefatos gerados após cada execução

### Relatórios Locais

Após executar os testes localmente, os relatórios podem ser encontrados em:

```
cypress/reports/
```

## Recursos

- [Documentação do Cypress](https://docs.cypress.io/)
- [Site Automation Exercise](https://automationexercise.com/)
- [DevFinance](https://devfinance-agilizei.netlify.app/)
- [BrowserStack para Cypress](https://www.browserstack.com/docs/automate/cypress)
- [BrowserStack Dashboard](https://automate.browserstack.com/)
