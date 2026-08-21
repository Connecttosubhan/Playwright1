pipeline {
    agent any 
    
    tools {
        nodejs 'Node26' 
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install System Fixes & Dependencies') {
            steps {
                // Installs the missing system library required by Node.js 26
                sh '''
                    if command -v apt-get >/dev/null; then
                        apt-get update && apt-get install -y libatomic1
                    fi
                '''
                
                // Installs packages, browser binaries, and missing Linux OS libraries
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }
        
        stage('Execute Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
    
    post {
        always {
            // Evaluates your test trends safely if the execution stage succeeds
            junit allowEmptyResults: true, testResults: 'results.xml'
            publishHTML([
                allowMissing: true, 
                alwaysLinkToLastBuild: true, 
                keepAll: true, 
                reportDir: 'playwright-report', 
                reportFiles: 'index.html', 
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}
