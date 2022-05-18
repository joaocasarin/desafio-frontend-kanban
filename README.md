# desafio-frontend-kanban

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

- [-] O projeto deve ser colocado em um repositório GITHUB ou equivalente, estar público, e conter um readme.md que explique em detalhes qualquer comando ou configuração necessária para fazer o projeto rodar.

- [-] A entrega será apenas a URL para clonarmos o repositório.
