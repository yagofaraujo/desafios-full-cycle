# Desafio Docker - Node & Nginx

Detalhes: utilizar o docker compose para subir uma aplicação utilizando nginx como proxy reverso, a fim de quando houver uma chamada na porta 8080 o nginx chamar uma aplicação em **node** que adicionará um registro de **nome** na tabela **people** em um banco de dados **mysql** e retornar `<h1>Full Cycle Rocks!</h1>` com a listagem dos registros presentes na tabela.

### Como executar:
- Rode o comando `docker compose up -d`
- Aguarde os containers inicializarem
  - Você pode acompanhar se a aplicação já está rodando através do comando: `docker logs -f app`
- Acesse o endereço exposto pelo **nginx**:[http://localhost:8080](http://localhost:8080)
- Aproveite a aplicação! 😁
  - A cada acesso ao endereço será gerado e incluído um nome aleatório na lista de nomes