angular.module('Dutchman')

.controller("UserCtrl", ["User" function(User, $scope, $http) {


       $scope.addUser = function(addUser){
       	console.log("Adding user");
       	console.log(addUser);
       	User.addUser(addUser);
       }

  }]);
