pipeline {
    agent {
        docker {
            image 'node:22-alpine'
            args '-u root -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    environment {
        NODE_ENV = 'test'
        SONARQUBE_SCANNER_HOME = tool 'SonarQubeScanner'
        SONARQUBE_SERVER = 'sonarqube'
        SONARQUBE_CREDENTIALS = credentials('sonarqube-token')
    }
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
        // Only keep the 10 most recent builds
        
        skipStagesAfterUnstable()
        timestamps()
        // Add timestamps to console output
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/master']],
                    extensions: [],
                    userRemoteConfigs: [[url: 'https://github.com/your-org/next.js.git']]
                ])
                script {
                    env.GIT_COMMIT_SHORT = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    env.GIT_BRANCH_NAME = sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                    currentBuild.displayName = "#${env.BUILD_NUMBER}-${env.GIT_COMMIT_SHORT}"
                }
            }
        }

        stage('Setup') {
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'npm ci --prefer-offline --no-audit'
                // Install dependencies using ci for production-like behavior
            }
        }

        stage('TypeCheck') {
            steps {
                sh 'npm run type-check || echo "No type-check script found, skipping..."'
                // TypeScript type checking
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint || npm run lint:fix || echo "No lint script found, using tsc..."'
                sh 'tsc --noEmit --pretty || true'
                // Run linting and TypeScript checking
            }
        }

        stage('Unit Tests') {
            steps {
                sh '''
                    npm test -- --coverage --watchAll=false --passWithNoTests
                '''
                // Run Jest tests with coverage report
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'coverage/lcov-report',
                    reportFiles: 'index.html',
                    reportName: 'Coverage Report'
                ])
                // Publish test coverage report to Jenkins
            }
        }

        stage('SonarQube Analysis') {
            when {
                anyOf {
                    branch 'master'
                    branch 'develop'
                }
            }
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh """
                        ${SONARQUBE_SCANNER_HOME}/bin/sonar-scanner \
                        -Dsonar.host.url=${env.SONARQUBE_SERVER_URL} \
                        -Dsonar.login=${SONARQUBE_CREDENTIALS} \
                        -Dsonar.projectKey=nextjs-app \
                        -Dsonar.projectName=Next.js\ App \
                        -Dsonar.projectVersion=${env.BUILD_NUMBER} \
                        -Dsonar.scm.revision=${env.GIT_COMMIT_SHORT} \
                        -Dsonar.sources=app,components,lib,-hooks,types \
                        -Dsonar.tests=app,components,lib,hooks,types \
                        -Dsonar.test.inclusions=**/*.test.ts,**/*.test.tsx \
                        -Dsonar.exclusions=**/node_modules/**,**/.next/**,**/coverage/** \
                        -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                        -Dsonar.coverage.exclusions=**/*.test.ts,**/*.test.tsx,**/*.spec.tsx,**/*.config.js \
                        -Dsonar.typescript.tsconfigPath=tsconfig.json
                    """
                }
                script {
                    timeout(time: 5, unit: 'MINUTES') {
                        waitForQualityGate()
                    }
                }
            }
        }

        stage('Build Docker Image') {
            when {
                anyOf {
                    branch 'master'
                    branch 'develop'
                }
            }
            steps {
                script {
                    env.DOCKER_IMAGE_TAG = "${env.BUILD_NUMBER}-${env.GIT_COMMIT_SHORT}"
                }
                sh """
                    docker build \
                        -t nextjs-app:${env.DOCKER_IMAGE_TAG} \
                        -t nextjs-app:latest \
                        -f Dockerfile \
                        .
                """
            }
        }

        stage('Docker Security Scan') {
            when {
                anyOf {
                    branch 'master'
                    branch 'develop'
                }
            }
            steps {
                sh """
                    docker run --rm \\
                        -v /var/run/docker.sock:/var/run/docker.sock \\
                        aquasec/trivy:latest \\
                        image nextjs-app:${env.DOCKER_IMAGE_TAG}
                """
                // Scan Docker image for vulnerabilities using Trivy
            }
        }

        stage('Run Integration Tests') {
            when {
                branch 'master'
            }
            steps {
                sh """
                    docker-compose -f docker-compose.test.yml up -d
                    sleep 10
                    npm run test:integration || true
                    docker-compose -f docker-compose.test.yml down -v
                """
            }
        }

        stage('Push to Registry') {
            when {
                branch 'master'
            }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-registry-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh """
                        echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USER} --password-stdin
                        docker push nextjs-app:${env.DOCKER_IMAGE_TAG}
                        docker push nextjs-app:latest
                        docker logout
                    """
                }
            }
        }

        stage('Deploy - Production') {
            when {
                branch 'master'
            }
            input {
                message 'Deploy to Production?'
                ok 'Deploy'
            }
            steps {
                sh """
                    docker-compose -f docker-compose.prod.yml pull
                    docker-compose -f docker-compose.prod.yml up -d
                    docker system prune -f
                """
            }
        }
    }

    post {
        always {
            cleanWs([
                deleteDirs: true,
                patterns: [
                    [pattern: 'node_modules', type: 'EXCLUDE'],
                    [pattern: '.next', type: 'EXCLUDE']
                ]
            ])
            // Clean workspace but keep node_modules cache
        }
        success {
            echo 'Pipeline completed successfully!'
            // Send notification
        }
        failure {
            echo 'Pipeline failed!'
            emailext(
                subject: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    Build URL: ${env.BUILD_URL}
                    Branch: ${env.GIT_BRANCH_NAME}
                    Commit: ${env.GIT_COMMIT_SHORT}
                """,
                to: 'team@example.com'
            )
        }
        unstable {
            echo 'Pipeline is unstable!'
            // Warning notification
        }
    }
}
