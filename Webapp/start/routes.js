'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Auth
Route.get('users/:id', 'UserController.show')
Route.post('/login', 'UserController.login')

//Upcoming Meetings (Dashboard)
Route.get('/', 'MeetingController.index')
Route.get('/meetings/', 'MeetingController.index')

//Meeting Details
Route.get('/meetings/detail/:id', 'MeetingController.detail')

//Participate Meeting
Route.post('/meetings/participate/:id', 'MeetingController.participate')

//Add Meeting
Route.get('/meetings/add', 'MeetingController.add')
Route.post('/meetings/add', 'MeetingController.store')

//Edit Meeting
Route.get('/meetings/edit/:id', 'MeetingController.edit')
Route.post('/meetings/update/:id', 'MeetingController.update')

//Delete Meeting
Route.delete('/meetings/:id', 'MeetingController.destroy')
