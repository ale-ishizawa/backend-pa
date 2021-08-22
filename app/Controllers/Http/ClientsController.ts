import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'

export default class ClientsController {
  public async index({}: HttpContextContract) {
    const clients = await Client.query().where('status', true)
    return clients
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const clientData = request!.only(['cpfCnpj', 'email', 'site', 'phone', 'description', 'name'])

      const emailExists = await Client.findBy('email', clientData.email)
      if (emailExists) {
        return response.badRequest('Email informado já existe.')
      }

      const client = await Client.create(clientData)
      return client
    } catch (error) {
      return response.badRequest('Erro ao cadastrar cliente.')
    }
  }

  public async show({ params }: HttpContextContract) {
    const client = await Client.find(params.id)
    return client
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const client = await Client.findOrFail(params.id)
      const updatedData = request.all()
      client.merge(updatedData)
      await client.save()
      return client
    } catch (error) {
      return response.badRequest('Erro ao atualizar/excluir cliente.')
    }
  }
}
