import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Position from 'App/Models/Position'

export default class PositionsController {
  public async index ({}: HttpContextContract) {
    const positions = await Position
      .query()
      .where('status', true);
    return positions;
  }
  public async store ({ request, response }: HttpContextContract) {
    const name = request.input('name');
    try {
      const position = await Position.create({
        name
      });
      return position;
    } catch (error) {
      return response.badRequest('Erro ao cadastrar um cargo.')
    }
  }
  public async show ({ params }: HttpContextContract) {
    const position = await Position.find(params.id);
    return position;
  }
  public async update ({ params, request, response }: HttpContextContract) {
    try {
      const position = await Position.findOrFail(params.id);
      const updatedData = request.all();
      position.merge(updatedData);
      await position.save();
      return position;
    } catch (error) {
      return response.badRequest('Erro ao atualizar/excluir cargo.')
    }
  }
}
