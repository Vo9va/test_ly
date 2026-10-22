pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                bat 'npm ci || npm install'
                bat 'npx playwright install --with-deps chromium'
            }
        }
        stage('Test') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            junit 'test-results/junit.xml'
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}
