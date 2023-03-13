# CaseFullstack

## Desenvolvimento de um CRUD
### Clientes e Usuarios
* create
* read
* update
* delete

Desenvolvido com tecnologia de microsserviços com `docker`, linguagem de programação `PHP8`, `REACT` para frontend e `SGBD MySQL`

Para executar precisamos ter o `docker` e `docker-compose` instalado.

_referência para instalação: Vc pode ver um artigo de como instalar [aqui](https://support.netfoundry.io/hc/en-us/articles/360057865692-Installing-Docker-and-docker-compose-for-Ubuntu-20-04)_

### Baixar o projeto e executar
```
git clone git@github.com:willallves/CaseFullstack.git
cd CaseFullstack

docker-compose up -d
```

Docker compose vai fazer build de uma imagem com php8 e sgbd mysql: 5.7 e executar em containers tudo isso em background,
* api ouvindo na porta `8080` (http://localhost:8080/backend/api/)
* db ouvindo na porta `3306`

### Com backend up vamos executar o frontend
```
cd frontend
npm install && npm start
```
* frontend ouvindo na porta `3000` (http://localhost:3000/)


Testamos algumas versões do node mas a que melhor rodou foi a v16.0.0
Segui o guia e instalei o nvm facilitou muito escolher a melhor versão, [aqui](https://github.com/nvm-sh/nvm) nesse tutorial tem tudo para conhecer e brincar a vontade.

* _Projeto baseado em artigos e tutoriais encontrados na internet_