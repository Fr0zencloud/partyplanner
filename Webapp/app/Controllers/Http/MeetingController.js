'use strict'

const Meeting = use('App/Models/Meeting')
const Logger = use('Logger')

class MeetingController {
    async index({ view }) {
        let now = new Date(Date.now())
        now = now.toISOString().slice(0, 19).replace('T', ' ')

        let meetings = await Meeting
            .query()
            .where('start_date', '>', now)
            .orderBy('start_date', 'asc')
            .fetch()
        meetings = meetings.toJSON()

        for (let i in meetings) {
            let start_date = new Date(meetings[i].start_date)
            let end_date = new Date(meetings[i].end_date)
            meetings[i].start_date = getDate(start_date)
            meetings[i].end_date = getDate(end_date)
            meetings[i].start_time = getTime(start_date)
            meetings[i].end_time = getTime(end_date)
        }

        function twoDigits(d) {
            if(0 <= d && d < 10) return "0" + d.toString()
            if(-10 < d && d < 0) return "-0" + (-1*d).toString()
            return d.toString()
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
        /*const validation = await validate(request.all(), {
            title: 'required|min:3|max:255',
            body: 'required|min:3'
        })

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
        */
        const meeting = new Meeting()
        //Date 2019-02-23 12:30:00
        meeting.name = request.input('title')
        meeting.description = request.input('description')
        meeting.tag = request.input('tag')
        meeting.start_date = request.input('start_date') + " " + request.input('start_time')
        meeting.end_date = request.input('start_date') + " " + request.input('end_time')
        meeting.address = request.input('address')
        meeting.plz = request.input('zip')
        await meeting.save()

        session.flash({ notification: 'Meeting Added!' })

        return response.redirect('/')
    }

    async destroy({ params, session, response }){
        const meeting = await Meeting.find(params.id)

        await meeting.delete()

        session.flash({ notification: 'Meeting Deleted!' })
        
        return response.redirect('/meetings')
    }

    async edit({ params, view }){
        let editMeeting = await Meeting.find(params.id)

        let start_date = new Date(editMeeting.start_date)
        let end_date = new Date(editMeeting.end_date)
        editMeeting.start_date = start_date.toISOString().substring(0, start_date.toISOString().indexOf("T"));
        editMeeting.end_date = end_date.toISOString().substring(0, end_date.toISOString().indexOf("T"));
        editMeeting.start_time = getTime(start_date)
        editMeeting.end_time = getTime(end_date)
        
        let meetings = await Meeting.all()
        meetings = meetings.toJSON()
        return view.render('meetings.edit', {
            editMeeting: editMeeting,
            meetings: meetings
        })
    }

    async update({ params, request, response, session }){
        /*//Validate input
        const validation = await validate(request.all(), {
            title: 'required|min:3|max:255',
            body: 'required|min:3'
        })

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
        */

        const meeting = await Meeting.find(params.id)

        meeting.name = request.input('title')
        meeting.description = request.input('description')
        meeting.tag = request.input('tag')
        meeting.start_date = request.input('start_date') + " " + request.input('start_time')
        meeting.end_date = request.input('start_date') + " " + request.input('end_time')
        meeting.address = request.input('address')
        meeting.plz = request.input('zip')

        await meeting.save()

        session.flash({ notification: 'Meeting Updated!' })
        
        return response.redirect('/meetings')
    }
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

module.exports = MeetingController
