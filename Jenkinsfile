// pipeline{
//     agent any
//     stages{
//         stage('test github project'){
//             steps{
//                 script{
//                     checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'Github_creds', url: 'https://github.com/ChasescrollGit/chasescroll-web.git']])
//                 }
//             }
//         }
//     }
// }


pipeline {
    agent any
    
    environment {
        SERVICE_NAME = "chasecroll"
        DOCKERHUB_USERNAME = "chasescrollweb"
        REPOSITORY_TAG = "${DOCKERHUB_USERNAME}/${SERVICE_NAME}:${BUILD_ID}"
    }
        
    stages {
        // stage('clone repo and release'){
        //     steps{
        //          sh 'git clone git@github.com:ChasescrollGit/chasescroll-web.git'
        //     }
        // }

        // stage('PreBuild/Installations'){
        //     steps{
        //         sh """ 
        //         curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -


        //         sudo yum install -y nodejs
        //         node -v
        //         npm -v

        //         """
        //     }
        // }
        stage('create deployment directory'){
            steps{

                sh 'cd /home/ubuntu'
                sh 'ls'
            }
        }
        stage('Build phase'){
            steps{
            
                sh 'sudo cp -r /var/lib/jenkins/workspace/chasecroll-job/*  .'
                sh 'npm install && npm run build'
               
            }
        }

        stage('Deployment'){
            steps{
                sh 'rm -rf ~/usr/share/nginx/html/*'
                sh 'cp -r ~/deploy/*  ~/usr/share/nginx/html'
            }
        }

        stage('Delivery'){
            steps{
                sh 'sudo systemctl restart nginx'
            }
        }
    //     stage ('Build and Push Image') {
    //         steps {
    //              withDockerRegistry([credentialsId: 'DOCKERHUB_USERNAME', url: ""]) {
    //                sh 'docker build -t ${REPOSITORY_TAG} .'
    //                sh 'docker run -itd -p 80:5173 --name ${SERVICE_NAME} ${REPOSITORY_TAG} '
    //             //    sh 'docker push ${REPOSITORY_TAG}'          
    //         }
    //       }
    //    }
        
        // stage('Remove Unused docker image') {
        //   steps{
        //     script {
        //      // sh "docker rmi -f  ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${REPOSITORY_URI}:$IMAGE_TAG"
        //       sh "docker system prune -f"
        //             }
        //   }
        // }

    //    stage("Install kubectl"){
    //         steps {
    //             sh """
    //                 curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
    //                 chmod +x ./kubectl
    //                 ./kubectl version --client
    //             """
    //         }
    //     }
        

    //     stage ('Deploy to Cluster') {
    //         steps {
    //             sh "aws eks update-kubeconfig --region us --name switch-arca-qa-cluster"
    //             sh " envsubst < ${WORKSPACE}/deploy.yaml | ./kubectl apply -f - "
    //         }
    //     }
    }
}
