import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee'

export default class EmployeesController {
  public async index ({}: HttpContextContract) {
    const employees = await Employee
      .query()
      .where('status', true);
    return employees;
  }

  public async store ({ request, response }: HttpContextContract) {
    try {
      const employeeData = request.all();

      const emailExists = await Employee.findBy('email', employeeData.email);
      if (emailExists) {
        return response.badRequest('Email informado já existe.')
      }

      const employee = await Employee.create(employeeData);
      return employee;
    } catch (error) {
      return response.badRequest('Erro ao cadastrar funcionário.')
    }
  }

  public async show ({ params }: HttpContextContract) {
    const employee = await Employee.find(params.id);
    return employee;
  }

  public async update ({ params, request, response }: HttpContextContract) {
    try {
      const employee = await Employee.findOrFail(params.id);
      const updatedData = request.all();
      employee.merge(updatedData);
      await employee.save();
      return employee;
    } catch (error) {
      return response.badRequest('Erro ao atualizar/excluir funcionário.')
    }
  }
}
