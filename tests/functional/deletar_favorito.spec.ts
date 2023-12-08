import { test } from '@japa/runner'

test.group('Deletar favorito', () => {
  test('Deletar favorito existente', async ({ client }) => {
    const resposta = await client.delete('/favoritos/1')

    resposta.assertStatus(200)
  })
  //   test('Deletar favorito inexistente', async ({ client }) => {})
})
