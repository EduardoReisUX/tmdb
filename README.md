<h1 align="center">
  <img src="github/logo.svg" alt="logo" width="300px"></img>
</h1>

<p align="center">
  <a href="#ℹ-descrição">Descrição</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-pré-requisitos">Pré-requisitos</a> •
  <a href="#-como-usar">Como usar</a> •
  <a href="#-demonstração">Demonstração</a>
</p>

<p align="center">
  <img src="github/movie.png" alt="Projeto no desktop" width="100%"></img>
</p>

## ℹ Descrição

Projeto desenvolvido como [desafio da Promobit para função de Dev front-end](https://github.com/Promobit/front-end-challenge). 👨‍🚀🚀

O desafio consistia em desenvolver o layout conforme o
[design do Figma](https://www.figma.com/file/rM7WPqhLY9ObnGzSCeWLxB/Teste-Front-End) usando a API de filmes gratuita
[themoviedb](https://developers.themoviedb.org/3/getting-started/introduction),
em sua versão 3, consultando os endpoint
[GET /movie/popular](https://developers.themoviedb.org/3/movies/get-popular-movies)
e
[GET /movie/{movie_id}](https://developers.themoviedb.org/3/movies/get-movie-details)
para, respectivamente, fazer a listagem de filmes populares e obter dados específicos de um filme.

## ⚒ Tecnologias

- [**React**](https://pt-br.reactjs.org)
- [**Typescript**](https://www.typescriptlang.org)
- [**Next.js**](https://nextjs.org/)
- [**TailwindCSS**](https://tailwindcss.com/)
- [**Jest**](https://jestjs.io/pt-BR/)
- [**React Testing Library**](https://testing-library.com/)
- [**Playwright**](https://playwright.dev/)

## ⚙ Pré-requisitos

- [Git](https://git-scm.com)
- [Yarn](https://yarnpkg.com)
- Editor de código.

## 🖥 Como usar

**Clone o projeto e acesse a pasta**

```bash
$ git clone https://github.com/EduardoReisUX/tmdb.git && cd tmdb
```

**Siga os passos seguintes**

```bash
# Instale as dependências
$ yarn

# Crie um arquivo ".env.local" que será a cópia de
# ".env.example" e atribua as variáveis de ambiente
$ cp .env.example .env.local

# Verifique os testes unitários
$ yarn test
# ou
$ yarn test:watch

# Verifique os testes e2e
$ yarn test:e2e

# Inicie a aplicação na sua máquina
$ yarn dev
```

## 👀 Demonstração

<p align="center">
  <img src="github/demo.gif" alt="Demonstração do projeto"></img>
</p>

---

<p align="center">Feito com 💜 por <a href="https://github.com/EduardoReisUX">Eduardo dos Reis</a></p>
