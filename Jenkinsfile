pipeline {
  agent any
  stages {
    stage('Docker') {
      steps {
        sh 'cp /opt/partyplanner/.env .'
        sh 'docker build -t partyplanner .'
        sh 'docker stop partyplanner'
        sh 'docker rm partyplanner'
        sh 'docker run -d --name="partyplanner" -p3333:3333 partyplanner'
      }
    }
    stage('Discord Message') {
      steps {
        discordSend(webhookURL: 'https://discordapp.com/api/webhooks/552877918037082123/Jx8v5uNOyKWhGZNwBWutVGX3Fh_EtyRdH1VOe8zLXhKZgwzrE_0FZJjH5reqUnXGn-kx', successful: true, title: 'Build Finished and Deployed')
      }
    }
  }
}