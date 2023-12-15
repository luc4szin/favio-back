import { test } from '@japa/runner'

test.group('Atualizar favorito', () => {
  test('atualizar favorito', async ({ client }) => {
    const resposta = await client.put('/favoritos/1')

    resposta.assertStatus(200)
  })
})
