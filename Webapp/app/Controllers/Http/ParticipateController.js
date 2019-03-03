'use strict'

const Meeting = use('App/Models/Meeting')
const Participate = use('App/Models/Participate')
const Database = use('Database')
const Logger = use('Logger')

class ParticipateController {

    async participate({ params, response, session, auth}){
        const meeting = await Meeting.find(params.id)
        let meeting_name = meeting.name
        let user_id = (await auth.getUser()).id
        
        const participate = await Participate
            .query()
            .where('meeting_id', params.id)
            .where('user_id', user_id)
            .fetch()

        if(participate.rows.length > 0){
            session.flash({ error: 'You are already participating the ' + meeting_name + '!'}) 
        }else{
            const toParticipate = new Participate()
            toParticipate.meeting_id = params.id
            toParticipate.user_id = user_id
            await toParticipate.save()
    
            session.flash({ notification: 'You are now participating for: ' + meeting_name }) 
        }

        return response.redirect('/meetings')
    }

    async quit({ params, response, auth, session }){
        await Database
            .table('participates')
            .where('meeting_id', params.id)
            .where('user_id', (await auth.getUser()).id)
            .delete()

        session.flash({ notification: 'You Quit the Meeting!' })

        return response.redirect('/meetings')
    }

}

module.exports = ParticipateController
