pipeline {
    agent any
    
    tools {
        // Injects your configured Node setup into the pipeline path
        nodejs 'node26'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies & Browsers') {
            steps {
                // Installs packages, browser binaries, and missing Linux OS libraries
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }
        
        stage('Execute Playwright Tests') {
            steps {
                // Runs headless tests
                sh 'npx playwright test'
            }
        }
    }
    
    post {
        always {
            // Archives automation test results inside the Jenkins UI
            junit 'results.xml'
            publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Playwright HTML Report'])
        }
    }
}
