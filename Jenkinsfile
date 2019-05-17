#!/usr/bin/env groovy
@Library('github.com/stakater/stakater-pipeline-library@revamp') _

releaseNodeApplication {
    appName = "web"
    notifySlack = false
    gitUser = "stakater-user"
    gitEmail = "stakater@gmail.com"
    usePersonalAccessToken = true
    tokenCredentialID = 'GithubToken'
    dockerRepositoryURL = 'docker.release.stakater.com:443'
    podVolumes = [
        additionalSecretVolumes: [[secretName: 'k8s-current-cluster-kubeconfig', mountPath: '/home/jenkins/.kube']]
    ]
}
