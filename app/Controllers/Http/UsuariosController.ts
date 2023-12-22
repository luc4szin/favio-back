import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import { DateTime } from 'luxon'

export default class UsuariosController {
  public async index({}: HttpContextContract) {
    return Usuario.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const { nome, cpf, senha } = request.body()
    const newUsuario = { nome, cpf, senha }
    Usuario.create(newUsuario)
    return response.status(201).send(newUsuario)
  }

  public async show({ params, response }: HttpContextContract) {
    let UsuarioEncontrado = Usuario.findByOrFail('id', params.id)
    if (UsuarioEncontrado == undefined) {
      return response.status(404)
    }
    return UsuarioEncontrado
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { nome, cpf, senha } = request.body()
    let UsuarioEncontrado = await Usuario.findByOrFail('id', params.id)
    if (!UsuarioEncontrado) {
      return response.status(404)
    }
    UsuarioEncontrado.nome = nome
    UsuarioEncontrado.cpf = cpf
    UsuarioEncontrado.senha = senha
    ;(await UsuarioEncontrado).save()
    ;(await UsuarioEncontrado).merge({ updatedAt: DateTime.local() })
    return response.status(200).send(UsuarioEncontrado)
  }

  public async destroy({ params, response }: HttpContextContract) {
    let UsuarioEncontrado = await Usuario.findByOrFail('id', params.id)
    if (!UsuarioEncontrado) {
      return response.status(404)
    }
    UsuarioEncontrado.delete()
    return response.status(204)
  }
}
