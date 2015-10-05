# Bibliotecas utilizadas (open-source)

## Backend

* restify - Camada REST para recebimento das requisições XML.
* chokidar - Watcher para monitoramento do diretório de personagens.
* mongoose - ORM para MongoDB
* js2xmlparser - Converter de JSON para XML
* xml2js - Converter de XML para JSON
* [tests] q - Biblioteca que facilita o uso de promises. Utilizado para lidar com requisições assíncrona nos testes
* [tests] jasmine - Framework de testes

## Frontend

* AngularJS
* Bootstrap

## Estrutura

* backend - APIs e processador de arquivos
* frontend - Cliente web para visualização dos dados processados

# Como rodar
* **servidor backend**: node index.js
* **testes backend**: npm test
* **frontend**: npm start

# Melhorias
* Trabalhar com streams, evitando ler o json/xml direto na memória
* Implementar os filtros no backend através da API
* Pensando em um cenário mais amplo, estruturar os dados permitindo buscas mais eficientes e complexas