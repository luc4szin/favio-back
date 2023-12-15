import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

let favoritos = [{ id: 1, nome: 'Google', url: 'https://www.google.com.br', importante: true }]

export default class FavoritosController {
  public async index({}: HttpContextContract) {
    return favoritos
  }

  public async store({ request, response }: HttpContextContract) {
    const { nome, url, importante } = request.body()
    const newFavorito = { id: favoritos.length + 1, nome, url, importante }
    favoritos.push(newFavorito)
    return response.status(201).send(newFavorito)
  }

  public async show({ params, response }: HttpContextContract) {
    let favoritoEncontrado = favoritos.find((favorito) => favorito.id == params.id)
    if (favoritoEncontrado == undefined) {
      return response.status(404)
    }
    return favoritoEncontrado
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { nome, url, importante } = request.body()
    let favoritoEncontrado = favoritos.find((favorito) => favorito.id == params.id)
    if (!favoritoEncontrado) {
      return response.status(404)
    }
    favoritoEncontrado.nome = nome
    favoritoEncontrado.url = url
    favoritoEncontrado.importante = importante

    favoritos[params.id] = favoritoEncontrado
    return response.status(200).send(favoritoEncontrado)
  }

  public async destroy({ params, response }: HttpContextContract) {
    let favoritoEncontrado = favoritos.find((favorito) => favorito.id == params.id)
    if (!favoritoEncontrado) {
      return response.status(404)
    }
    favoritos.splice(favoritos.indexOf(favoritoEncontrado), 1)
    return response.status(204)
  }
}
