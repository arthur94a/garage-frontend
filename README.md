# Garage FIPE Frontend

Aplicação web em React + TypeScript para consulta de veículos na tabela FIPE, autenticação de usuários e gerenciamento da garagem pessoal (salvar, listar e remover veículos).

## Tecnologias

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Axios
- ESLint

## Pré-requisitos

Antes de iniciar, tenha instalado na sua máquina:

- Node.js 18 ou superior
- npm (normalmente já vem com o Node)

## Instalação e configuração local

1. Entre na pasta do frontend:

	cd garage-frontend

2. Instale as dependências:

	npm install

3. Garanta que a API backend esteja em execução em:

	http://localhost:8000

	Observação:
	o frontend está configurado para consumir esse endereço em src/configs/axiosApi.tsx.

4. Inicie o ambiente de desenvolvimento:

	npm run dev

5. Abra no navegador o endereço exibido no terminal (geralmente):

	http://localhost:5173

## Scripts disponíveis

- npm run dev: inicia o servidor de desenvolvimento com hot reload.
- npm run build: gera o build de produção.
- npm run preview: executa localmente o build de produção.
- npm run lint: executa verificação de lint no projeto.

## Estrutura principal

- src/components: componentes visuais e de fluxo (login, busca, garagem, cards etc.).
- src/context: contexto global de usuário e autenticação.
- src/configs: configuração de cliente HTTP (Axios).
- src/helpers: funções utilitárias.

## Fluxo básico de uso

1. O usuário pode criar conta ou fazer login.
2. Após autenticado, pode buscar veículos por tipo, marca, modelo e ano.
3. O veículo selecionado pode ser salvo na garagem.
4. A garagem lista os veículos salvos e permite removê-los.

## Observações

- Se houver erro de conexão, confirme se a API backend está ativa na porta 8000.
- Em ambientes diferentes, ajuste a baseURL de src/configs/axiosApi.tsx conforme necessário.