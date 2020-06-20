pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh '''echo "Yarning"
yarn'''
      }
    }

    stage('Test') {
      steps {
        sh '''echo "Testing"
yarn test'''
      }
    }

    stage('Deploy') {
      steps {
        sh 'yarn start'
      }
    }

  }
}