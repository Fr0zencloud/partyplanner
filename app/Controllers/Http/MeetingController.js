'use strict'

const Meeting = use('App/Models/Meeting')
const Logger = use('Logger')

class MeetingController {
    async index({ view }) {
        
        const meetings = await Meeting.all()
        let meetingsObj = meetings.toJSON()        

        for(let i in meetingsObj){
            let start_date = new Date(meetingsObj[i].start_date)
            let end_date = new Date(meetingsObj[i].end_date)
            meetingsObj[i].start_date = getDate(start_date)
            meetingsObj[i].end_date = getDate(end_date)
            meetingsObj[i].start_time = getTime(start_date)
            meetingsObj[i].end_time = getTime(end_date)
        }

        return view.render('main', {
            meetings: meetingsObj
        })

        function getDate(date){
            let day = date.getDay()
            let month = date.getMonth()
            let year = date.getFullYear()

            return day + "." + month + "." + year
        }

        function getTime(date){
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
    }
}

module.exports = MeetingController
