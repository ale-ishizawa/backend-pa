import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Employees extends BaseSchema {
  protected tableName = 'employees'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 60).notNullable()
      table.boolean('status').notNullable().defaultTo(true)
      table.string('email', 120).notNullable()
      table.timestamp('birth', { useTz: false })
      table.timestamp('admission', { useTz: false })
      table.timestamp('resignation', { useTz: false })
      table.string('url_photo', 255)
      table.string('disc_profile', 1).nullable()
      table.integer('sector_id').unsigned().references('sectors.id').notNullable()
      table.integer('position_id').unsigned().references('positions.id').notNullable()
      table.integer('client_id').unsigned().references('clients.id').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
