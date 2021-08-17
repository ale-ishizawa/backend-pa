export default class AuthController {

  public async login ({ request, auth, response }) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.badRequest('Usuário ou senha inválido.')
    }
  }
}
