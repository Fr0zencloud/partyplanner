'use strict'

const { test, trait } = use('Test/Suite')('Meeting')
const Meeting = use('App/Models/Meeting')

trait('Test/ApiClient')

test('crate meeting and show all afterwards', async ({ client }) => {
  let newMeeting = await Meeting.create({
    name: 'Test Meeting',
    description: 'Test Meeting Description',
    tag: 'Other',
    start_date: '2022-03-08 12:00:00',
    end_date: '2022-03-08 23:00:00',
    address: 'Test-Adress-Street 1',
    plz: '00000'
  })

  const response = await client.get('/meetings/detail/' + newMeeting.id).end()

  response.assertStatus(200)
  console.log(response)
  response.assertJSONSubset([{
    name: 'Test Meeting',
    description: 'Test Meeting Description',
    tag: 'Other',
    start_date: '2022-03-08 12:00:00',
    end_date: '2022-03-08 23:00:00',
    address: 'Test-Adress-Street 1',
    plz: '00000',
  }])
})