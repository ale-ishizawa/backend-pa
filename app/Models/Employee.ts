import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Sector from './Sector'
import Position from './Position'
import Client from './Client'
import Manager from './Manager'

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public status: boolean

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public discProfile: string

  @column()
  public urlPhoto: string

  @column()
  public birth: DateTime

  @column()
  public admission: DateTime

  @column()
  public resignation: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public sectorId: number

  @column()
  public positionId: number

  @column()
  public clientId: number

  @hasOne(() => Sector)
  public sector: HasOne<typeof Sector>

  @hasOne(() => Position)
  public position: HasOne<typeof Position>

  @hasOne(() => Client)
  public client: HasOne<typeof Client>

  @belongsTo(() => Manager)
  public manager: BelongsTo<typeof Manager>
}
