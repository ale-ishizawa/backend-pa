import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Manager from 'App/Models/Manager'

export default class ManagersController {
  public async index({}: HttpContextContract) {
    const managers = await Manager.all()
    return managers
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const managerData = request.all()
      const manager = await Manager.create(managerData)
      return manager
    } catch (error) {
      return response.badRequest('Erro ao cadastrar gerente.')
    }
  }

  public async show({ params }: HttpContextContract) {
    const manager = await Manager.find(params.id)
    return manager
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const manager = await Manager.findOrFail(params.id)
      await manager.delete()
      return response.status(204)
    } catch (error) {
      return response.badRequest('Erro ao excluir gerente.')
    }
  }
}
