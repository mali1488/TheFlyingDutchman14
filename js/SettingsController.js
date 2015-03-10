angular.module('Dutchman')

.controller('SettingsCtrl',['$scope','$rootScope','$cookieStore',function($scope,$rootScope,$cookieStore){
	$rootScope.theme = $cookieStore.get('theme');
	$scope.started = false;
	$scope.christmasBtn = false;
	$rootScope .language= $cookieStore.get('language');

	$scope.themeChoose = function(button){
		$cookieStore.remove('theme');
		switch(button){
			case "default":
				$cookieStore.put('theme','default');
				$rootScope.theme = 'default';	
				$scope.defaultBtn = true;
				$scope.christmasBtn = false;
				break;
			case "christmas":
				$cookieStore.put('theme','christmas');
				$rootScope.theme = 'christmas';
				$scope.christmasBtn = true;
				$scope.defaultBtn = false;
				break;
		}
	}
	$scope.languageChoose = function(button){
		$cookieStore.remove('language');
		switch(button){
			case "swe":
				$cookieStore.put('language','swe');
				$rootScope.language = 'swe';	
				break;
			case "eng":
				$cookieStore.put('language','eng');
				$rootScope.language = 'eng';
				break;
		}
	}
}]);