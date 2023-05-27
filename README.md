# API desenvolvida na palestra sobre desenvolvimento backend com JavaScript

## Passo a passo de como configurar um projeto do zero

- Instale o [Node](https://nodejs.org/en)
- Crie um diretório e acesse ele pelo terminal
- Execute os seguintes comandos

### Com o npm/npx :

- `npm init y` --> cria o package.json
- `npm i -D typescript` --> adiciona o typescript
- `npx tsc --init` --> cria o arquivo tsconfig.json
- `npm i express pg cors` --> depêndencias utilizadas para a construção da api e conexão com o banco de dados
- `npm i -D @types/express @types/pg @types/cors` --> adiciona a tipagem das dependências
- `npm i -D ts-node-dev` --> transpilador do typescript para rodar o projeto

### tsconfig e package.json

- No tsconfig.json, adicione as propriedades `"rootDir": "./src"` e `"outDir": "./dist"`
- No `package.json`, dentro do objeto `"scripts"`, adicione:
`"dev": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts", "build": "tsc",` 

### Diretórios e arquivos

- Crie a pasta `src` e o arquivo `server.ts` dentro dela
- Crie a pasta dist
- Começe a implementar seu código no `server.ts`
- Para rodar o projeto: `npm run dev`
- Para gerar o build: `npm run build`

## Para quem quiser clonar esse repositório e testar/implementar mais coisas

- Tenha o [Node](https://nodejs.org/en) instalado previamente
- Depois de clonar, abra o diretório do projeto no terminal e execute `npm install`
- Crie a pasta `dist`
- Para rodar o projeto: `npm run dev`
- Para gerar o build: `npm run build`