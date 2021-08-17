import { DateTime } from 'luxon'
import { BaseModel, column , belongsTo, BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class UserType extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
