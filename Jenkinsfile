pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'echo "Yarning"'
        sh 'yarn'
      }
    }

    stage('Test') {
      steps {
        sh 'echo "Testing"'
        sh 'yarn test'
      }
    }

    stage('Deploy') {
      steps {
        sh 'echo "Starting"'
        sh 'yarn start'
      }
    }

  }
}