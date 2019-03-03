'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')

class UserController {
  create ({ view }) {
    return view.render('auth.register')
  }

  async store ({ auth, session, request, response }) {
    const data = request.only(['username', 'email', 'password', 'password_confirmation'])

    //Adding Default role (=user)
    data.role = 'user'

    const validation = await validateAll(data, {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required',
      password_confirmation: 'required_if:password|same:password',
    })

    /**
     * If validation fails, early returns with validation message.
     */
    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])

      return response.redirect('back')
    }

    // Deleting the confirmation field since we don't
    // want to save it
    delete data.password_confirmation

    /**
     * Creating a new user into the database.
     */
    const user = await User.create(data)

    // Authenticate the user
    await auth.login(user)

    return response.redirect('/')
  }
}

module.exports = UserController
