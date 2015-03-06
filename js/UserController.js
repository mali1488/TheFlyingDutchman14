angular.module('Dutchman')

.controller("UserCtrl", ['User', '$scope', function(User, $scope, $http) {


       $scope.addUser = function(formData){
       		console.log("Adding user");
       		console.log(formData);
       		User.addUserPost(formData);
       }

  }]);

