'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Admin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response, auth, session }, next) {
    if(auth.user.role === "admin"){
      await next()
    }else{
      session.flash({ error: 'You dont have Access to this area!' })
      return response.redirect('back')
    }
  }
}

module.exports = Admin
