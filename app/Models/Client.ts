import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Employee from './Employee'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public status: boolean

  @column()
  public name: string

  @column()
  public cpfCnpj: string

  @column()
  public email: string

  @column()
  public site: string

  @column()
  public phone: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Employee)
  public employee: BelongsTo<typeof Employee>
}
