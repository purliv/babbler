/**
 * Created by Liviu Purjea on 5/13/2015.
 */
chatApp.controller('chatController', ['$scope', '$http', '$templateCache', '$sce', 'logonInfoService',
	function($scope, $http, $templateCache, $sce, logonInfoService) {
		$scope.view = {
			main: '/view/chat.html',
			login: '/view/login.html'
		};
		$scope.chat = {
			messages: '',
			messageTemplate: ''
		};
		$scope.loadResources = function() {
			$scope.logonInfo = logonInfoService;
			$scope.logonInfo.load();
			$http.get('/view/parts/message.html')
				.success(function(messageTemplate) {
					$scope.chat.messageTemplate = messageTemplate;
				});
			$scope.chat.messages = $sce.trustAsHtml('<b>aici</b> iti e capul!');
		}
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
			var width = parseInt($('.chatWidth').css('width'));
			$('.chatWidth').css('width', Math.min(Math.max(width + 100 * direction, 400), 1200) + 'px');
		};
		$scope.clickTestMessage = function(isKing) {
			var message = $scope.chat.messageTemplate
				.replace('[popover side]', isKing ? 'left' : 'right')
				.replace('[float side]', isKing ? 'toTheRight' : '')
				.replace('[player name]', isKing ? 'Liviu' : 'Alina')
				.replace('[initial message]', isKing ? 'salut bebitzaaa!' : 'salut bebitzuuu!')
				.replace('[timestamp side]', isKing ? 'right' : 'left')
				.replace('[timestamp]', '12:02');
			$scope.chat.messages = $sce.trustAsHtml($scope.chat.messages + message);
		};
		$scope.loadResources();
	}
]);

