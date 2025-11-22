#Zoo Management

Sistema simples para gerenciamento de animais e cuidados de um zoológico.  
Desenvolvido em **React (Frontend)**, **.NET Web API (Backend)** e **SQL Server (Banco de dados)**

---

## 🔧 Como Executar o Projeto

### 🗄️ 1) Pré-Requisitos
Antes de começar, tenha instalado:

- **.NET SDK 8+**
- **Node.js (versão LTS)**
- **SQL Server + SSMS (ou Azure Data Studio)**

---

Clone o projeto: 

**por HTTPS**

```bash
 https://github.com/matheuskormann/zooManagement.git
```
  **por SSH**
```bash
 git@github.com:matheuskormann/zooManagement.git
```

```bash
cd zooManagement
```

## 💻 Rodando o Back-end
Acesse a pasta da API:

```bash
cd ZooApi
```

-Configure a string de conexão no appsettings.json ou no ambiente de configuração.
-Execute a migração do banco (se aplicável).

-Inicie a API:
# Inicie a API:
```bash
dotnet run
```

## ▶️ Rodando o Front-end
saia da pasta do Back-end
```bash
cd .
```
# Acesse a pasta do front-end:
```bash
cd zoofront
```
# Iniciando o servidor
```bash
 npm start
```

