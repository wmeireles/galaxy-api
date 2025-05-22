# 🌌 Galaxy API - BackEnd Fusion Challenge

Esta é uma API RESTful desenvolvida para o desafio **BackEnd Fusion**, onde criamos e gerenciamos uma galáxia inspirada no universo de **Star Wars**. A aplicação permite CRUD completo de planetas, sistemas estelares, personagens e naves espaciais, com autenticação JWT e controle de permissão por afiliação (Jedi, Sith, Rebelde, Admin).

---

## 🚀 Tecnologias Utilizadas

* **Node.js** com **Express**
* **TypeScript**
* **Prisma ORM** + SQLite
* **JWT** para autenticação
* **Postman** para testes

---

## 🔧 Instalação e Execução

```bash
git clone https://github.com/wmeireles/galaxy-api.git
cd galaxy-api
npm install
npx prisma migrate dev --name init
npx ts-node-dev src/app.ts
```

Crie um arquivo `.env` com:

```env
JWT_SECRET=sua_chave_secreta
```

---

## 📦 Endpoints REST

### 🔐 Autenticação

* `POST /auth/login` - Gera token JWT (usuário fictício retornado direto no código)

### 🌍 Planetas

* `POST /planets`
* `GET /planets`
* `GET /planets/:id`
* `PUT /planets/:id`
* `DELETE /planets/:id`

### ✨ Sistemas Estelares

* `POST /star-systems`
* `GET /star-systems`
* `GET /star-systems/:id`
* `PUT /star-systems/:id`
* `DELETE /star-systems/:id`

### 🧙 Personagens

* `POST /characters`
* `GET /characters`
* `GET /characters/:id`
* `PUT /characters/:id`
* `DELETE /characters/:id`

### 🚀 Naves Espaciais

* `POST /spaceships`
* `GET /spaceships`
* `GET /spaceships/:id`
* `PUT /spaceships/:id`
* `DELETE /spaceships/:id`

---

## 🏡 Controle de Acesso

* Apenas **usuários autenticados** com afiliação adequada (Jedi, Rebelde, Admin) podem **criar, atualizar e excluir**.
* Todas as rotas são protegidas com `Bearer Token` JWT no header:

```
Authorization: Bearer seu_token
```

---

## 📚 Documentação (Opcional)

Coleção pronta para importar no Postman:
[Download Galaxy-API.postman\_collection.json](./Galaxy-API.postman_collection.json)

---

## 📦 Futuro (Extras do desafio)

* [ ] Deploy gratuito (Railway ou Render)
* [ ] Swagger para documentação interativa
* [ ] Logs e monitoramento com Winston

---

## 📚 Licença

MIT License.

---

Desenvolvido com ❤️ por Willian Meireles para o **BackEnd Fusion Challenge**
