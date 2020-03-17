pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
        
    stage('Cloning Git') {
      steps {
        git 'https://github.com/jonatan777/Crud_Node_Mysql_EJS-.git'
      }
    }
        
     
    stage('Test') {
      steps {
         sh 'npm test'
      }
    }      
  }
}