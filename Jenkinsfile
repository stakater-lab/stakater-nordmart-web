#!/usr/bin/env groovy
@Library('github.com/stakater/stakater-pipeline-library@v2.15.0') _

releaseNodeApplication {
    appName = "web"
    notifySlack = false
    gitUser = "stakater-user"
    gitEmail = "stakater@gmail.com"
    usePersonalAccessToken = true
    tokenCredentialID = 'GithubToken'
    serviceAccount = "stakater-release-jenkins"
    dockerRepositoryURL = 'docker-release.workshop.stakater.com:443'
}
