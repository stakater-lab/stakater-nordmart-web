#!/usr/bin/env groovy
@Library('github.com/stakater/stakater-pipeline-library@v2.16.11') _

releaseApplication {
    appName = "web"
    appType = "node"
    builderImage = "stakater/builder-node-8:v0.0.2"
    goal = "install"
    notifySlack = false
    runIntegrationTest = false
    gitUser = "stakater-user"
    gitEmail = "stakater@gmail.com"
    usePersonalAccessToken = true
    tokenCredentialID = 'GithubToken'
    serviceAccount = "jenkins"
    dockerRepositoryURL = 'docker-delivery.workshop.stakater.com:443'
}
