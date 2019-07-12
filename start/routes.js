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

Route.get('/', 'SessionController.index')
Route.get('/faq', 'MeetingController.index').as('faq')
Route.get('/calendar', 'MeetingController.index').as('calendar')
Route.get('/settings', 'MeetingController.index').as('settings')

Route.group(() => {
    Route.get('login', 'SessionController.create')
    Route.post('login', 'SessionController.store')
  
    Route.get('register', 'UserController.create')
    Route.post('register', 'UserController.store')
  }).middleware(['guest'])
  
  Route.group(() => {
    Route.get('logout', 'SessionController.delete')
  
    //Upcoming Meetings
    Route.get('/meetings/', 'MeetingController.index').as('meetings_all')

    //Meeting Details
    Route.get('/meetings/detail/:id', 'MeetingController.detail').as('meetings_details')

    //Participate Meeting
    Route.post('/meetings/participate/:id', 'ParticipateController.participate')

    //Quit Meeting
    Route.delete('/meetings/quit/:id', 'ParticipateController.quit')

    //Add Meeting
    Route.get('/meetings/add', 'MeetingController.add').as('meetings_add')
    Route.post('/meetings/add', 'MeetingController.store')

    //Edit Meeting
    Route.get('/meetings/edit/:id', 'MeetingController.edit').as('meetings_edit')
    Route.post('/meetings/update/:id', 'MeetingController.update')

    //Delete Meeting
    Route.delete('/meetings/:id', 'MeetingController.destroy')

    //Unread Invitations
    Route.get('/invitations/', 'InvitationController.index').as('invitations_unread')
    Route.post('/invitations/create', 'InvitationController.create')
    Route.post('/invitations/close/:id', 'InvitationController.close')
    Route.delete('/invitations/delete/:id', 'InvitationController.delete')
  }).middleware(['auth'])

  Route.group(() => {
    Route.get('/', 'AdminController.index').as('admin')
    Route.get('/usermanage', 'AdminController.usermanage').as('admin_usermanage')
    Route.get('/invitationmanage', 'AdminController.invitationmanage').as('admin_invitationmanage')
  })
  .prefix('admin')
  .middleware(['admin'])