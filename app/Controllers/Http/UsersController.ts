import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.query().where('status', true)
    return users
  }
  public async store({ request, response }: HttpContextContract) {
    try {
      let userData = request.only(['email', 'password', 'userTypeId', 'name'])

      //Verify if email already exists
      const emailExists = await User.findBy('email', userData.email)
      if (emailExists) {
        return response.badRequest('Email informado já existe.')
      }
      const user = await User.create(userData)
      return user
    } catch (error) {
      return response.badRequest('Erro ao cadastrar usuário.' + error)
    }
  }
  public async show({ params }: HttpContextContract) {
    const user = await User.find(params.id)
    return user
  }
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      const updatedData = request.all()
      user.merge(updatedData)
      await user.save()
      return user
    } catch (error) {
      return response.badRequest('Erro ao atualizar/excluir usuário.')
    }
  }

  public static async getByEmail(email) {
    const user = await User.findBy('email', email)
    return user
  }
}
