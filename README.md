# desafio-frontend-kanban

![kanban](https://user-images.githubusercontent.com/48847394/169169846-1776d112-1081-4889-8fb3-5b817743750d.gif)

## Index

- [Desafio Frontend Kanban](#desafio-frontend-kanban)
- [Descrição](#desafio)
- [Requisitos](#r)
- [Instalação](#instalacao)
- [Rotas](#rotas-da-aplicacao)
- [Bibliotecas](#bibliotecas-utilizadas)
- [Duvidas](#duvidas)
- [Observacoes](#observacoes)

## Desafio

Construir um frontend (neste caso utilizei React.js + TypeScript) de um quadro Kanban. O quadro deverá ser capaz de criar tarefas (diretamente na coluna To Do), onde cada card deverá conter botões para movê-los entre as colunas conforme a necessidade, para editar o mesmo e para visualizar.

## Requisitos

- [x] A API que provemos deve ser usada para persistência dos cards (ela trabalha com persistência em memória) e não deve ser alterada.

- [x] A interface gráfica será apenas uma tela, nela deve haver três colunas chamadas "To do", "Doing" e "Done".

- [x] Os cards deve ser listados nessas colunas de acordo com o valor do campo lista presente no card. Os valores de lista devem ser "ToDo", "Doing" e "Done", respectivamente.

- [x] Deve haver um local que permita criar um card passando valores para o titulo e conteudo, deve haver um botão para adicionar o card.

- [x] Um novo card deve sempre cair na lista "To Do" após persistido na API.

- [x] O card deverá ter dois modos: Visualização e Edição.

- [x] No modo de visualização o card terá um cabeçalho com seu título, o conteúdo e 4 botões.

- [ ] O conteudo do card pode ser markdown, utilize uma biblioteca para renderizá-lo no modo de visualização (recomendamos uma combinação de dompurify e marked). Lembre-se de estilizar o html resultante do parse do markdown... [Se quiser usar highlight para campos de código no markdown será um diferencial].

- [x] Um dos botões do card deverá excluí-lo (persistindo pela API), outro colocá-lo em modo de edição.

- [x] Os dois outros botões devem mudar o card para a lista anterior (se houver) ou para a lista seguinte (se houver). A decisão de desabilitar, esconder ou apenas não gerar o evento desses botões quando não houver a proxima lista ou a anterior é sua.

- [x] No modo de edição, o card conterá um input para o titulo, um textarea para o conteudo e dois botões.

- [x] No modo de edição, um dos botões cancela a edição, quando precionado os campos devem ser resetados para o valor atual e voltar o card ao modo de visualização.

- [x] O outro botão salva o card, persistindo as informações pela API. Também volta ao modo de visualização em seguida.

- [x] Toda decisão de visual, de UI e UX é sua. Apenas utilize uma única tela.

- [x] Se estiver usando REACT priorize componentes funcionais e hooks.

- [x] O projeto deve ser colocado em um repositório GITHUB ou equivalente, estar público, e conter um readme.md que explique em detalhes qualquer comando ou configuração necessária para fazer o projeto rodar.

- [x] A entrega será apenas a URL para clonarmos o repositório.

## Instalação

### Primeiro, instale as dependencias do backend e execute-o:

```bash
    $ cd ./BACK
    $ npm install
    $ npm run dev
```

### Agora instale as dependencias do frontend e execute-o:

```bash
    $ cd ./frontend
    $ yarn install
    $ yarn dev
```

### Caso queira executar ambos dentro de um container, na pasta raiz do projeto

#### Requisitos

- Docker 20.10.14+
- Docker-compose 1.29.2+

#### Execute o container

```bash
    $ docker-compose -f docker-compose.dev.yml --env-file ./BACK/.env up -d
```

#### A aplicação estará disponível em [`http://localhost:3000`](http://localhost:3000)

### PS.: Os containers a cima serão executados em desenvolvimento. Para criar os containers de produção, utilize o comando:

```bash
    $ docker-compose --env-file ./BACK/.env up -d
```

#### Acesse a aplicação em [`http://localhost`](http://localhost)

## Rotas da aplicacao

- `/` - Página inicial com formulário de login
- `/dashboard` - Página para utilização do quadro Kanban
- Toda e qualquer rota além das mencionadas serão redirecionadas para a página de login `/`.

## Bibliotecas utilizadas

- `Axios` - para realizar as requisições HTTP ao backend
- `Random Color` - para gerar cores aleatórias para cada card
- `React Router` - para separar e autenticar as rotas de login e dashboard
- `React Use` - para utilizar hooks como `useLocalStorage`
- `Styled Components` - para criar alguns componentes customizados
- `Eslint` e `Prettier` - para realizar o lint e format do código

## Duvidas

- O requisito `O conteudo do card pode ser markdown ...` não foi totalmente claro se era obrigatoriamente para renderizar um markdown ou não. Acabei optando por um modal para a visualização e edição do card.

## Observacoes

- A utilização da biblioteca `random-color` tornou possível uma variação de cores para os cards, tornando-os mais agradáveis. Porém, a cada requisição à api - mover de coluna, atualizar dados, visualizar card, apagar card -, as cores são geradas novamente. Em específico o caso de visualizar, a cor é gerada apenas para o card em questão, mas nos outros casos, todas as cores são recriadas. Não tive muita ideia de como corrigir este bug.

- Foi tentado utilizar `react-hook-form` para gerenciar os formulários de login e criação de card, mas alguns erros estavam surgindo e não pude encontrar uma solução mais eficiente.

- Estou utilizando `localStorage` ao invés de `sessionStorage` apenas por motivos de simplicidade.

- Tentei utilizar o sistema de proxy do nginx para realizar as requisições ao backend através do nome do service do docker do backend (ex. `http://backend/api`), mas por alguma razão todas as requisições retornavam `401`, até mesmo a de login, que estava ainda pedindo um token para realizar o login.

- `IMPORTANTE`: Como conversado com a recrutadora, perguntei se eu era permitido utilizar uma rota diferente para o login e outra para o dashboard do kanban, e me foi passado que sim, por isso a utilização do `react-router`.

- Adoraria poder conversar sobre a aplicação com vocês, explicar o motivo de algumas coisas e perguntar o que acharam, o que mudariam etc...
