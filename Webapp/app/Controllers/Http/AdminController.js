'use strict'

const User = use('App/Models/User')
const Database = use('Database')

class AdminController {
    async index({ view }) {
        return view.render('admin.index')
    }

    async usermanage({ view }) {
        const users = (await User.all()).toJSON()

        return view.render('admin.usermanage', {
            users: users,
        })
    }

    async invitationmanage({ view }) {
        const users = (await User.all()).toJSON()
        
        let now = new Date(Date.now())

        const meetings = await Database
            .select()
            .from('meetings')
            .where('start_date', '>', now)
            .orderBy('start_date', 'asc')

        return view.render('admin.invitationmanage', {
            users: users,
            meetings: meetings
        })
    }

}

module.exports = AdminController
