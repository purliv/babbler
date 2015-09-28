/**
 * Created by Liviu Purjea on 5/13/2015.
 */
chatApp.controller('chatController', ['$scope', '$http', 'logonInfoService',
	function($scope, $http, logonInfoService) {
		$scope.view = {
			main: '/view/chat.html',
			login: '/view/login.html'
		};
		$scope.logonInfo = logonInfoService;
		$scope.logonInfo.load();

		$scope.onLogin = function() {
			$http.post('/api/login', {
				username: $scope.logonInfo.username,
				password: $scope.logonInfo.password
			}).success(function(data, status, headers, config) {
				$scope.logonInfo.data.isLogged = true;
                $scope.logonInfo.data.password = '';
				$scope.logonInfo.save();
			}).error(function(data, status, headers, config) {
				alert(status);
			});
		};

		$scope.resizeChat = function(direction) {
			var width = parseInt($('.controlWidth').css('width'));
			$('.controlWidth').css('width', Math.min(Math.max(width + 100 * direction, 400), 1200) + 'px');
		};
}]);

