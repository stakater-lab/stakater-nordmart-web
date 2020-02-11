#!/usr/bin/env groovy
@Library('github.com/stakater/stakater-pipeline-library@v2.16.16') _

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
    dockerRepositoryURL = 'docker.delivery.stakater.com:443'
    // configuration parameter for e2e tess
    e2eTestJob = true
    e2eJobName = "../stakater-nordmart-e2e-tests/master"
    // configuration for generating kubernetes manifests
    kubernetesGenerateManifests = true
    kubernetesPublicChartRepositoryURL = "https://stakater.github.io/stakater-charts"
    kubernetesChartName = "stakater/application"
    kubernetesChartVersion = "0.0.12"
    kubernetesNamespace = "default"
}
