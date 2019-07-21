'use strict'

const Meeting = use('App/Models/Meeting')
const Participate = use('App/Models/Participate')
const User = use('App/Models/User')
const Invitation = use('App/Models/Invitation')
const Logger = use('Logger')
const Database = use('Database')
const { validate } = use('Validator')

class MeetingController {

    async index({ view, auth }) {
        let now = new Date(Date.now())

        let meetings = await Database
            .select('meetings.*', 'participates.id as invitationId', 'participates.user_id')
            .from('meetings')
            .leftJoin('participates', 'meetings.id', 'participates.meeting_id')
            .where('participates.user_id', '=', (await auth.getUser()).id)
            .where('start_date', '>', now)
            .orderBy('start_date', 'asc')
        
        now = now.toISOString().slice(0, 19).replace('T', ' ')

        for (let i in meetings) {
            let start_date = new Date(meetings[i].start_date)
            let end_date = new Date(meetings[i].end_date)

            meetings[i].start_date = getDate(start_date)
            meetings[i].end_date = getDate(end_date)
            meetings[i].start_time = getTime(start_date)
            meetings[i].end_time = getTime(end_date)
            meetings[i].participants = await getParticipants(meetings[i].id)
            meetings[i].max_partcipants = ((await Invitation.query().where('meeting_id', meetings[i].id).count())[0]['count(*)']) + ((await Participate.query().where('meeting_id', meetings[i].id).count())[0]['count(*)'])
        }

        let invitation_count = (await Invitation.query()
            .where('user_id', '=', (await auth.getUser()).id)
            .count())[0]['count(*)']

        let meetingsJSON = meetings.toISOString()

        return view.render('meetings.upcoming', {
            meetings: meetings,
            meetingsJSON: meetingsJSON,
            invitation_count: invitation_count
        })
    }

    async add({ view, auth }) {
        const users = (await User.query().whereNot('id', '=', (await auth.getUser()).id).fetch()).toJSON()

        return view.render('meetings.add', {
            users: users
        })
    }

    async detail({ params, view, auth }) {
        const meeting = await Meeting.find(params.id)
        let start_date = new Date(meeting.start_date)
        let end_date = new Date(meeting.end_date)
        meeting.start_date = getDate(start_date)
        meeting.end_date = getDate(end_date)
        meeting.start_time = getTime(start_date)
        meeting.end_time = getTime(end_date)
        meeting.participants = await getParticipants(params.id)

        let participate = (await Participate
            .query()
            .where('meeting_id', meeting.id)
            .where('user_id', (await auth.getUser()).id)
            .fetch()
        ).toJSON()[0]

        if (participate) {
            meeting.isParticipating = true
        } else {
            meeting.isParticipating = false
        }

        return view.render('meetings.details', {
            meeting: meeting,
            max_partcipants: ((await Invitation.query().where('meeting_id', meeting.id).count())[0]['count(*)']) + ((await Participate.query().where('meeting_id', meeting.id).count())[0]['count(*)'])
        })
    }

    async store({ request, response, session, auth }) {
        //Validate input
        const validation = await validate(request.all(), {
            title: 'required|max:255',
            description: 'required|max:255',
            tag: 'required',
            start_date: 'required|date',
            start_time: 'required',
            end_date: 'required|date',
            end_time: 'required',
            address: 'required',
            plz: 'required|min:5|max:6',
        })

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
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

        let invitation_users = request.input('invitations')
        if(invitation_users != null) {
            for(let user_id of invitation_users) {
                const invitation = new Invitation()
                invitation.user_id = user_id
                invitation.meeting_id = meeting.id
                await invitation.save()
            } 
        }


        /*
         * TODO: Change this participation
         * - (✓) Create a new field in the meeting shema (user_id)
         * - ( ) Display all Meetings with the user_id
         * - ( ) Show Username in the Details Page
        */
        const userParticipation = new Participate()
        userParticipation.meeting_id = meeting.id
        userParticipation.user_id = (await auth.getUser()).id
        await userParticipation.save()

        session.flash({ notification: 'Meeting Added!' })

        return response.redirect('/meetings')
    }

    async destroy({ params, session, response }) {
        const meeting = await Meeting.find(params.id)

        await meeting.delete()

        session.flash({ notification: 'Meeting Deleted!' })

        return response.redirect('back')
    }

    async edit({ params, view }) {
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

    async update({ params, request, response, session }) {
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

async function getParticipants(meeting_id) {
    let participates = await Participate
        .query()
        .select('user_id')
        .where('meeting_id', '=', meeting_id)
        .fetch()

    let participants = []

    for (let i = 0; i < participates.rows.length; i++) {
        let user = (await User.find(participates.rows[i].user_id))
        let name = user.name + " " + user.lastname
        participants.push(name)
    }

    return participants
}

function getDate(date) {
    let day = date.getDate()
    let month = date.getMonth() + 1
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
