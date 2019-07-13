'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MeetingsSchema extends Schema {
  up () {
    this.create('meetings', (table) => {
      table.increments()
      table.string('name')
      table.string('description')
      table.integer('user_id')
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.string('tag')
      table.datetime('start_date')
      table.datetime('end_date')
      table.string('address')
      table.integer('plz')
      table.timestamps()
    })
  }

  down () {
    this.drop('meetings')
  }
}

module.exports = MeetingsSchema
