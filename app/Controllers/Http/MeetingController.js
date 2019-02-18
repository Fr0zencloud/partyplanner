'use strict'

const Meeting = use('App/Models/Meeting')
const Logger = use('Logger')

class MeetingController {
    async index({ view }) {
        
        const meetings = await Meeting.all()
        let meetingsObj = meetings.toJSON()        

        Logger.info(meetings.start_date)
        Logger.info(meetingsObj.start_date)


        return view.render('main', {
            meetings: meetingsObj
        })
    }
}

module.exports = MeetingController
