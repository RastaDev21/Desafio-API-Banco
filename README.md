Desafio de Criação de API: Sistema Bancário com Node.js e Express
Introdução
Neste desafio, você será responsável por criar uma API backend utilizando Node.js e Express, seguindo as boas práticas aprendidas na Rocketseat. O objetivo é construir uma API para gerenciar contas bancárias, permitindo o cadastro de clientes, a realização de operações financeiras básicas e a consulta de informações sobre as contas.

Requisitos do Desafio
Você deverá criar uma API RESTful que permita as seguintes operações:

1. Cadastro de Cliente
Endpoint: POST /clientes
Descrição: Este endpoint será usado para criar um novo cliente e sua conta associada.
Dados necessários:
nome: Nome completo do cliente.
cpf: Cadastro de Pessoa Física (CPF) do cliente (único).
rg: Registro Geral (RG) do cliente.
dataNascimento: Data de nascimento do cliente.
Resposta: Deverá retornar os dados do cliente criado, incluindo o número da conta gerado automaticamente.
2. Ver Saldo
Endpoint: GET /contas/:numeroConta/saldo
Descrição: Este endpoint permitirá ao cliente consultar o saldo atual da sua conta.
Dados necessários: Apenas o número da conta é necessário.
Resposta: Deverá retornar o saldo atual da conta.
3. Adicionar Dinheiro
Endpoint: POST /contas/:numeroConta/depositar
Descrição: Este endpoint permitirá ao cliente adicionar dinheiro à sua conta.
Dados necessários:
valor: Valor a ser depositado na conta.
Resposta: Deverá retornar o novo saldo da conta após o depósito.
4. Retirar Dinheiro
Endpoint: POST /contas/:numeroConta/retirar
Descrição: Este endpoint permitirá ao cliente retirar dinheiro da sua conta.
Dados necessários:
valor: Valor a ser retirado da conta.
Regras: Não permitir retirada se o saldo for insuficiente.
Resposta: Deverá retornar o novo saldo da conta após a retirada.
Funcionalidades Extras
Para tornar o desafio mais interessante, você pode adicionar as seguintes funcionalidades:

5. Histórico de Transações
Endpoint: GET /contas/:numeroConta/historico
Descrição: Este endpoint permitirá ao cliente visualizar o histórico de todas as transações realizadas na conta (depósitos, retiradas).
Resposta: Deverá retornar uma lista das transações, incluindo data, tipo (depósito/retirada), e valor.
6. Transferência Entre Contas
Endpoint: POST /contas/transferir
Descrição: Este endpoint permitirá ao cliente transferir dinheiro de sua conta para outra conta no banco.
Dados necessários:
numeroContaDestino: Número da conta de destino.
valor: Valor a ser transferido.
Regras: Não permitir transferência se o saldo for insuficiente.
Resposta: Deverá retornar o novo saldo da conta após a transferência.
7. Encerramento de Conta
Endpoint: DELETE /contas/:numeroConta
Descrição: Este endpoint permitirá ao cliente encerrar sua conta.
Regras: Só permitir o encerramento se o saldo for zero.
Resposta: Confirmação de encerramento da conta.
