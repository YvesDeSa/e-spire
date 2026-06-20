# e-spire

## 📖 Sobre
O **e-spire** é uma API projetada para conectar pessoas através de atividades físicas e hobbies em comum, facilitando a busca por grupos específicos, como praticantes de yoga ou corrida. A plataforma é focada na experiência do usuário e na construção de comunidades, contando com integração de mapas para geolocalização de eventos, um feed de atualizações e um sistema de recomendações personalizadas.

[cite_start]Construída sob o framework NestJS[cite: 33], a aplicação visa alta escalabilidade e eficiência. [cite_start]A infraestrutura base já conta com módulos completos de autenticação e gerenciamento de usuários [cite: 28][cite_start], incluindo suporte ágil para login via Facebook[cite: 17]. [cite_start]Toda a comunicação com o banco de dados é orquestrada pelo Prisma [cite: 25][cite_start], e o ambiente de desenvolvimento está preparado para rodar via containers com Docker[cite: 24].

---

## 🏷️ Tópicos (Topics)
* **Negócio & Funcionalidades:** Busca de Grupos, Atividades Físicas (Yoga, Corrida), Integração com Mapas/Geolocalização, Feed Social, Sistema de Recomendação.
* [cite_start]**Backend Framework:** NestJS [cite: 33]
* [cite_start]**Linguagens:** TypeScript (94.6%), JavaScript (5.4%) [cite: 49]
* [cite_start]**Banco de Dados & ORM:** Prisma [cite: 25]
* [cite_start]**Infraestrutura:** Docker & Docker Compose [cite: 24]
* [cite_start]**Segurança e Acesso:** Autenticação, Gerenciamento de Usuários [cite: 28][cite_start], Facebook Login [cite: 17]

---

## 🛠️ Configuração do Projeto

### Pré-requisitos
Certifique-se de ter o **Node.js**, **npm** (ou yarn/pnpm) e o **Docker** instalados em sua máquina.

### Instalação

1. Clone o repositório:
```bash
git clone [https://github.com/YvesDeSa/e-spire.git](https://github.com/YvesDeSa/e-spire.git)
cd e-spire

```

2. Instale as dependências:

```bash
npm install

```

3. Suba os containers da aplicação (Banco de Dados, etc) via Docker:



```bash
docker-compose up -d

```

### Executando a aplicação

```bash
# modo desenvolvimento padrão
npm run start

# modo observador (watch) para desenvolvimento
npm run start:dev

# modo produção
npm run start:prod

```

---

## 👨‍💻 Contribuidor

**Yves de Sá** ([YvesDeSa](https://www.google.com/search?q=https://github.com/YvesDeSa)) 
