import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserType from 'App/Models/UserType'

export default class UserTypesController {
  public async index ({ params }: HttpContextContract) {
    const userTypes = await UserType
      .query()
      .where('status', true);
    return userTypes;
  }
  public async store ({ request, response }: HttpContextContract) {
    const userTypeData = request.all();
    try {
      const userType = await UserType.create(userTypeData);
      return userType;
    } catch (error) {
      return response.badRequest('Erro ao cadastrar tipo de usuário.');
    }
  }
  public async show ({ params }: HttpContextContract) {
    const userType = await UserType.find(params.id);
    return userType;
  }
  public async update ({ params, request, response }: HttpContextContract) {
    try {
      const userType = await UserType.findOrFail(params.id);
      const updatedData = request.all();
      userType.merge(updatedData);
      await userType.save();
      return userType;
    } catch (error) {
      return response.badRequest('Erro ao atualizar/excluir tipo de usuário.')
    }
  }
}
