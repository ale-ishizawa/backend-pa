import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index({}: HttpContextContract) {
    const categories = await Category.query().where('status', true)
    return categories
  }
  public async store({ request, response }: HttpContextContract) {
    const name = request.input('name')
    try {
      const category = await Category.create({
        name,
      })
      return category
    } catch (error) {
      return response.badRequest('Erro ao cadastrar uma categoria de pergunta.')
    }
  }

  public async show({ params }: HttpContextContract) {
    const category = await Category.find(params.id)
    return category
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const category = await Category.findOrFail(params.id)
      const updatedData = request.all()
      category.merge(updatedData)
      await category.save()
      return category
    } catch (error) {
      return response.badRequest('Erro ao atualizar/excluir categoria.')
    }
  }

  public async updateMany({ request, response }: HttpContextContract) {
    try {
      const categories = request.input('ids')
      const update = await Category.query().whereIn('id', categories).update({ status: false })
      return response.status(201).send({ success: true })
    } catch (error) {
      return response.badRequest('Erro ao excluir categorias.')
    }
  }
}
