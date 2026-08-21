pipeline {
    agent {
        docker {
            // Uses an environment already containing node, browsers, and OS libraries
            image '://microsoft.com'
            args '-u root' 
        }
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                // Installs your npm packages cleanly
                sh 'npm ci'
            }
        }
        
        stage('Execute Playwright Tests') {
            steps {
                // Runs tests headlessly as configured in your playwright.config.js
                sh 'npx playwright test'
            }
        }
    }
    
    post {
        always {
            // Archives test results and HTML reports for review within Jenkins UI
            junit 'results.xml'
            publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Playwright HTML Report'])
        }
    }
}
