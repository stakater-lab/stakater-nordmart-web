#!/usr/bin/env groovy
@Library('github.com/stakater/stakater-pipeline-library@add-gradle-support') _

releaseApplication {
    appName = "web"
    appType = "node"
    builderImage = "stakater/builder-builder-node-8:v0.0.2"
    goal = "install"
    notifySlack = false
    runIntegrationTest = false
    gitUser = "stakater-user"
    gitEmail = "stakater@gmail.com"
    usePersonalAccessToken = true
    tokenCredentialID = 'GithubToken'
    serviceAccount = "jenkins"
    dockerRepositoryURL = 'docker.release.stakater.com:443'
}