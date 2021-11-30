import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersController from './UsersController'

export default class AuthController {
  public async login({ request, auth, response }) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      const user = await UsersController.getByEmail(email)

      return {
        token,
        user,
      }
    } catch {
      return response.badRequest('Usuário ou senha inválido.')
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.status(200)
  }
}
