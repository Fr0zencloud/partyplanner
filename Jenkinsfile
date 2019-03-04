pipeline {
  agent any
  stages {
    stage('Build docker Image') {
      steps {
        sh 'cp /opt/partyplanner/.env .'
        sh 'docker build -t partyplanner .'
      }
    }
    stage('Start Docker Image') {
      steps {
        sh 'docker stop partyplanner'
        sh 'docker rm partyplanner'
        sh 'docker run -d --name="partyplanner" -p3333:3333 partyplanner'
      }
    }
  }
}