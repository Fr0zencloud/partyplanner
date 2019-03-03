'use strict'

class AdminController {
    async index({ view }) {
        return view.render('admin.index')
    }

    async usermanage({ view }) {
        let users = ['Niki2k1', 'Tipet']

        return view.render('admin.usermanage', {
            users: users,
        })
    }

}

module.exports = AdminController
