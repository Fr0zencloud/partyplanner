'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ParticipateSchema extends Schema {
  up () {
    this.create('participates', (table) => {
      table.increments()
      table.integer('user_id')
      table.integer('meeting_id')
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.foreign('meeting_id').references('meetings.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('participates')
  }
}

module.exports = ParticipateSchema
