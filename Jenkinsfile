#!/usr/bin/env groovy
@Library('github.com/stakater/stakater-pipeline-library@v2.16.15') _

releaseApplication {
    appName = "web"
    appType = "node"
    builderImage = "stakater/builder-node-8:v0.0.2"
    goal = "install"
    notifySlack = true
    runIntegrationTest = false
    gitUser = "stakater-user"
    gitEmail = "stakater@gmail.com"
    usePersonalAccessToken = true
    tokenCredentialID = 'GithubToken'
    serviceAccount = "jenkins"
    dockerRepositoryURL = 'docker-delivery.cp-stakater.com:443'
    // configuration parameter for e2e tess
    e2eTestJob = "true"
    e2eJobName = "../stakater-nordmart-e2e-tests/master"
}
