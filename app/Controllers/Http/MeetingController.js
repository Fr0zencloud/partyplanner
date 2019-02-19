'use strict'

const Meeting = use('App/Models/Meeting')
const Logger = use('Logger')

class MeetingController {
    async index({ view }) {

        let meetings = await Meeting.all()
        meetings = meetings.toJSON()

        for (let i in meetings) {
            let start_date = new Date(meetings[i].start_date)
            let end_date = new Date(meetings[i].end_date)
            meetings[i].start_date = getDate(start_date)
            meetings[i].end_date = getDate(end_date)
            meetings[i].start_time = getTime(start_date)
            meetings[i].end_time = getTime(end_date)
        }

        function getDate(date) {
            let day = date.getDay()
            let month = date.getMonth()
            let year = date.getFullYear()

            return day + "." + month + "." + year
        }

        function getTime(date) {
            let hours = date.getHours()
            let minutes = date.getMinutes()

            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            return hours + ":" + minutes
        }

        return view.render('meetings/detail', {
            meetings: meetings
        })
    }

    async add({ view }){
        return view.render('meetings.add')
    }

    async store({ request, response, session }){
        //Validate input
        const validation = await validate(request.all(), {
            title: 'required|min:3|max:255',
            body: 'required|min:3'
        })

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
        
        const meeting = new Meeting()

        meeting.title = request.input('title')
        meeting.body = request.input('body')

        await meeting.save()

        session.flash({ notification: 'Meeting Added!' })

        return response.redirect('/')
    }
}

module.exports = MeetingController
