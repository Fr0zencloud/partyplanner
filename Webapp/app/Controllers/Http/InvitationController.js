'use strict'

const Meeting = use('App/Models/Meeting')
const Database = use('Database')
const Participate = use('App/Models/Participate')
const Invitation = use('App/Models/Invitation')
const Logger = use('Logger')

class InvitationController {
    async index({ view, auth }) {
       let now = new Date(Date.now())
       now = now.toISOString().slice(0, 19).replace('T', ' ')

       const meetings = await Database
        .select('meetings.*', 'invitations.id as invitationId', 'invitations.user_id')
        .from('meetings')
        .leftJoin('invitations', 'meetings.id', 'invitations.meeting_id')
        .where('invitations.user_id', '=', (await auth.getUser()).id)

        meetings.forEach(meeting => {
            let start_date = new Date(meeting.start_date)
            let end_date = new Date(meeting.end_date)

            meeting.start_date = getDate(start_date)
            meeting.end_date = getDate(end_date)
            meeting.start_time = getTime(start_date)
            meeting.invitation_id = meeting.invitationId
        });

        let invitation_count = (await Invitation.query()
        .where('user_id', '=', (await auth.getUser()).id)
        .count())[0]['count(*)']

        return view.render('invitations.unread', {
            meetings:meetings,
            invitation_count:invitation_count,
            invitation:{
                exists: true,
            }
        })
    }

    async close({ params, response, session, auth }) {
        const invitation = await Invitation.find(params.id)
        let user_id = (await auth.getUser()).id

        const toParticipate = new Participate()
        toParticipate.meeting_id = invitation.meeting_id
        toParticipate.user_id = user_id
        await toParticipate.save()

        await invitation.delete()
        
        session.flash({ notification: 'You are now participating for: ' + (await Meeting.find(invitation.meeting_id)).name })

        return response.redirect('back')
    }

    async delete({ params, response, session }) {
        const invitation = await Invitation.find(params.id)
        await invitation.delete()
        
        session.flash({ notification: 'You have denied the invitation!'})
        return response.redirect('back')
    }

    async create({ request, response, session }) {
        const invitation = new Invitation()
        invitation.user_id = request.input('user_id')
        invitation.meeting_id = request.input('meeting_id')
        await invitation.save()

        session.flash({ notification: 'Invitation created' })
        
        return response.redirect('back')
    }
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

module.exports = InvitationController
