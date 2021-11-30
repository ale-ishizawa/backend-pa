import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee'
import Database from '@ioc:Adonis/Lucid/Database'

export default class EmployeesController {
  public async index({}: HttpContextContract) {
    const response = await Database.from('employees')
      .join('sectors', 'employees.sector_id', '=', 'sectors.id')
      .join('positions', 'employees.position_id', '=', 'positions.id')
      .select('employees.*')
      .select('positions.name as positionName')
      .select('sectors.name as sectorName')
      .where('employees.status', true)
    return response
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const employeeData = request.all()

      const emailExists = await Employee.findBy('email', employeeData.email)
      if (emailExists) {
        return response.badRequest('Email informado já existe.')
      }

      const employee = await Employee.create({ ...employeeData })
      return employee
    } catch (error) {
      return response.badRequest('Erro ao cadastrar funcionário.')
    }
  }

  public async show({ params }: HttpContextContract) {
    const employee = await Employee.find(params.id)
    return employee
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const employee = await Employee.findOrFail(params.id)
      const updatedData = request.all()
      employee.merge(updatedData)
      await employee.save()
      return employee
    } catch (error) {
      return response.badRequest('Erro ao atualizar/excluir funcionário.')
    }
  }

  public async updateMany({ request, response }: HttpContextContract) {
    try {
      const employees = request.input('ids')
      await Employee.query().whereIn('id', employees).update({ status: false })
      return response.status(201).send({ success: true })
    } catch (error) {
      return response.badRequest('Erro ao excluir funcionários.')
    }
  }

  public async getProfilesDisc({}: HttpContextContract) {
    const employees = await Database.rawQuery(
      `
      SELECT
      SUM(case when employees.disc_profile = 'D' THEN 1 ELSE 0 END) as d,
      SUM(case when employees.disc_profile = 'I' THEN 1 ELSE 0 END) as i,
      SUM(case when employees.disc_profile = 'S' THEN 1 ELSE 0 END) as s,
      SUM(case when employees.disc_profile = 'C' THEN 1 ELSE 0 END) as c
  FROM employees
    WHERE employees.status = true;
    `
    ).then((result) => result.rows)

    return employees
  }
}
