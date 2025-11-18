
pipeline {
  agent any
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Build') { steps { sh 'mvn -B -DskipTests clean package' } }
    stage('Deploy to Tomcat') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'tomcat-creds', usernameVariable: 'TOMCAT_USER', passwordVariable: 'TOMCAT_PASS')]) {
          script {
            if (!env.TOMCAT_URL) {
              error 'TOMCAT_URL is not defined. Set TOMCAT_URL in Jenkins job configuration.'
            }
            sh 'curl --fail -u $TOMCAT_USER:$TOMCAT_PASS -T target/sorry-project.war "$TOMCAT_URL/manager/text/deploy?path=/sorry&update=true"'
          }
        }
      }
    }
  }
  post { success { echo "Build and deployment completed successfully." } failure { echo "Something failed. Check the console output." } }
}
