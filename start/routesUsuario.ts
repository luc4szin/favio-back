/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inscpfe this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inscpfe `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

const usuarios = [{ nome: 'Lucas', cpf: '11122233345', senha: 'Senha123' }]

Route.get('/usuarios', async () => {
  return usuarios
})

Route.get('/usuarios/:cpf', async ({ params, response }) => {
  let usuarioEncontrado = usuarios.find((usuario) => usuario.cpf == params.cpf)
  if (usuarioEncontrado == undefined) {
    return response.status(404)
  }
  return usuarioEncontrado
})

Route.post('/usuarios', async ({ request, response }) => {
  const { nome, cpf, senha } = request.body()
  const newUsuario = { nome, cpf, senha }
  usuarios.push(newUsuario)
  return response.status(201).send(newUsuario)
})

Route.put('/usuarios/:cpf', async ({ request, params, response }) => {
  const { nome, cpf, senha } = request.body()
  let usuarioEncontrado = usuarios.find((usuario) => usuario.cpf == params.cpf)
  if (!usuarioEncontrado) {
    return response.status(404)
  }
  usuarioEncontrado.nome = nome
  usuarioEncontrado.cpf = cpf
  usuarioEncontrado.senha = senha

  usuarios[params.cpf] = usuarioEncontrado
  return response.status(200).send(usuarioEncontrado)
})

Route.delete('/usuarios/:cpf', async ({ params, response }) => {
  let usuarioEncontrado = usuarios.find((usuario) => usuario.cpf == params.cpf)
  if (!usuarioEncontrado) {
    return response.status(404)
  }
  usuarios.splice(usuarios.indexOf(usuarioEncontrado), 1)
  return response.status(204)
})

Route.resource('Usuário', 'UsuariosController').apiOnly()
