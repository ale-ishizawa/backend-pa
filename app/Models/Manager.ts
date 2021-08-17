import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Employee from './Employee'

export default class Manager extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public employeeId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Employee)
  public employee: HasOne<typeof Employee>
}
