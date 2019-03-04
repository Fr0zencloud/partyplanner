pipeline {
  agent any
  stages {
    stage('Build docker Image') {
      steps {
        sh 'cp /opt/partyplanner/Webapp/.env .'
        sh 'docker build -t partyplanner .'
      }
    }
    stage('Start Docker Image') {
      steps {
        sh 'docker run -d -p 3333:3333 partyplanner'
      }
    }
  }
}