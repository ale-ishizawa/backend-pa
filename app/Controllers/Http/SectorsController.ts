import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sector from 'App/Models/Sector'

export default class SectorsController {
  public async index({}: HttpContextContract) {
    const sectors = await Sector.query().where('status', true)
    return sectors
  }

  public async store({ request, response }: HttpContextContract) {
    const name = request.input('name')
    try {
      const sector = await Sector.create({
        name,
      })
      return sector
    } catch (error) {
      return response.badRequest('Erro ao cadastrar um setor.')
    }
  }

  public async show({ params }: HttpContextContract) {
    const sector = await Sector.find(params.id)
    return sector
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const sector = await Sector.findOrFail(params.id)
      const updatedData = request.all()
      sector.merge(updatedData)
      await sector.save()
      return sector
    } catch (error) {
      return response.badRequest('Erro ao atualizar/excluir setor.')
    }
  }

  public async updateMany({ request, response }: HttpContextContract) {
    try {
      const sectors = request.input('ids')
      const update = await Sector.query().whereIn('id', sectors).update({ status: false })
      return response.status(201).send({ success: true })
    } catch (error) {
      return response.badRequest('Erro ao atualizar/excluir setor.')
    }
  }
}
