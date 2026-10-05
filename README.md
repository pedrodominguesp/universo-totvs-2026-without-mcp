# Universo TOTVS 2026 – Demo PO UI (sem MCP)

Aplicação Angular de demonstração com um cadastro simples de **funcionários** feito com [PO UI](https://po-ui.io), a biblioteca de componentes Angular da TOTVS.

## Contexto

Este projeto faz parte de uma apresentação sobre PO UI no **Universo TOTVS 2026**. Ele é uma de duas versões de um app de exemplo:

- **Este repositório (sem MCP):** versão desenvolvida sem o apoio de um servidor MCP (Model Context Protocol).
- **Repositório irmão (com MCP):** [universo-totvs-2026-mcp](https://github.com/pedrodominguesp/universo-totvs-2026-mcp), com um cadastro de clientes feito com apoio de MCP.

A ideia é comparar o código das duas versões.

> Observação: o `.vscode/mcp.json` gerado pelo Angular CLI (servidor `angular-cli`) também está presente aqui, com o mesmo conteúdo do repositório irmão.

## Funcionalidades

O layout principal (`src/app/app.html`) usa `po-toolbar` (título "Universo TOTVS 2026") e `po-menu` com o item "Funcionários", que leva à listagem.

| Rota | Componente | Descrição |
| --- | --- | --- |
| `/` | `EmployeeListComponent` | Listagem de funcionários |
| `/employees/new` | `EmployeeFormComponent` | Formulário de novo funcionário |
| `**` | — | Qualquer outra rota redireciona para `/` |

### Listagem de funcionários (`employee-list`)

- `po-page-default` com a ação "Novo Funcionário", que navega para `/employees/new`.
- `po-table` alimentada por `p-service-api` (`https://po-sample-api.onrender.com/v1/people`), com ordenação e linhas zebradas.
- Busca em linguagem natural com IA (`p-search-ai-field`), usando o endpoint `https://po-sample-api.onrender.com/v1/ai/filter`, filtro aplicado no servidor, confiança mínima de 0.5 e timeout de 10 s. Resultado, baixa confiança (com percentual) e erro são exibidos como notificações (`PoNotificationService`).
- Colunas: ID, Nome, E-mail, Cidade e Status. O status usa um template de coluna (`p-table-column-template`) com `po-tag` colorida e ícone para Ativo, Inativo e Pendente.

### Novo funcionário (`employee-form`)

- `po-page-edit` com as ações Salvar e Cancelar.
- Campos: Nome (`po-input`, obrigatório), CPF (`po-input` com máscara `999.999.999-99`, obrigatório), Departamento (`po-combo`, obrigatório: Engenharia, Design, Gestão, Recursos Humanos, Financeiro) e Status (`po-switch`, Ativo/Inativo).
- Ao salvar, o formulário é validado (`NgForm`). Se faltar campo obrigatório, aparece um aviso. Se estiver válido, os dados vão para o console, uma notificação de sucesso é exibida e o app volta para a listagem. Não existe chamada real de API para gravar.

## Tecnologias

Versões resolvidas no `package-lock.json`:

- Angular 21.2 (`@angular/core` 21.2.21, `@angular/cli` e `@angular/build` 21.2.22), componentes standalone
- PO UI: `@po-ui/ng-components` 21.30.0 e tema `@po-ui/style` 21.30.0 (`po-theme-default.min.css`)
- TypeScript 5.9.3
- RxJS 7.8.2 e Zone.js 0.15.1
- Testes unitários com Vitest 4.1.11 e jsdom (builder `@angular/build:unit-test`)
- Prettier 3

## Pré-requisitos

- Node.js `^20.19.0`, `^22.12.0` ou `>=24.0.0` (exigido pelo Angular 21)
- npm (o `package.json` declara `packageManager: npm@12.0.2`)
- Acesso à internet: a tabela e a busca por IA consomem a API pública `po-sample-api.onrender.com`

## Como instalar e rodar

```bash
npm install
npm start          # ng serve, em http://localhost:4200/
```

Outros scripts:

```bash
npm run build      # ng build (configuração de produção, saída em dist/)
npm run watch      # ng build --watch --configuration development
npm test           # ng test (Vitest)
```

## Estrutura de pastas

```text
.
├── .vscode/                  # launch, tasks, extensões e mcp.json padrão do Angular CLI
├── public/                   # favicon
├── src/
│   ├── index.html
│   ├── main.ts
│   ├── styles.css
│   └── app/
│       ├── app.ts / app.html # layout com po-toolbar e po-menu
│       ├── app.config.ts     # router, HttpClient e PoHttpRequestModule
│       ├── app.routes.ts
│       ├── app.spec.ts
│       ├── employee-list/    # listagem de funcionários
│       └── employee-form/    # formulário de novo funcionário
├── angular.json
└── package.json
```
