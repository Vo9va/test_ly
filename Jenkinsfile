pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timeout(time: 60, unit: 'MINUTES')
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Install') {
            steps {
                sh 'node -v && npm -v'
                sh 'npm ci || npm install'
                sh 'npx playwright install chromium'
            }
        }

        stage('Test') {
            steps {
                sh 'rm -rf test-results'
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            junit allowEmptyResults: true,
                  testResults: 'test-results/junit.xml',
                  testDataPublishers: [[$class: 'JUnitFlakyTestDataPublisher']]

            archiveArtifacts artifacts: 'playwright-report/**, test-results/results.json', allowEmptyArchive: true

            script {
                def flaky = sh(returnStdout: true, script: '''
                    node -e "try { console.log(require('./test-results/results.json').stats.flaky) } catch (e) { console.log(0) }"
                ''').trim()

                echo "Flaky тестів: ${flaky}"
                if (flaky != '0') {
                    currentBuild.description = "⚠️ Flaky: ${flaky}"
                }
            }
        }
    }
}