pipeline {
  agent any
    
  tools {nodejs "node"}
    
  pipeline {
     agent any

     stages {
         stage('STAGE 00'){
             steps{
                 echo "Pipeline Usando Jenkinsfile"
             }
         }

         stage('STAGE 01'){
             steps{
                 echo "Pipeline Usando Jenkinsfile"
            }
         }
     }
 }
        
     
    stage('Test') {
      steps {
         sh 'npm test'
      }
    }      
  }
}