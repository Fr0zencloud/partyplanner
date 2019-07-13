'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InvitationsSchema extends Schema {
  up () {
    this.create('invitations', (table) => {
      table.increments()      
      table.integer('user_id')
      table.integer('meeting_id')
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.foreign('meeting_id').references('meetings.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('invitations')
  }
}

module.exports = InvitationsSchema
