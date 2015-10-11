/**
 * Created by Liviu Purjea on 5/13/2015.
 */
chatApp.controller('chatController', ['$scope', '$http', '$templateCache', '$sce', 'logonInfoService', 'utilsService',
	function($scope, $http, $templateCache, $sce, logonInfoService, utilsService) {
		$scope.view = {
			main: '/view/chat.html',
			login: '/view/login.html'
		};
		$scope.chat = {
			typedMessage: '',
            rawMessages: '',
			sceMessages: '',
			messageTemplate: ''
		};
		$scope.loadResources = function() {
			$scope.utils = utilsService;
			$scope.logonInfo = logonInfoService;
			$scope.logonInfo.load();
			$http.get('/view/parts/message.html')
				.success(function(messageTemplate) {
					$scope.chat.messageTemplate = messageTemplate;
				});
			$scope.chat.messages = $sce.trustAsHtml('<b>aici</b> iti e capul!');
		}
		$scope.onLogin = function() {
			$http({
				url: '/api/login',
				method: 'POST',
				data: {
					username: $scope.logonInfo.data.userName,
					password: $scope.logonInfo.data.password,
					alterEgo: $scope.logonInfo.data.alterEgo
				}
			}).then(
				function(response) {
					$scope.logonInfo.data.isLogged = true;
	                $scope.logonInfo.data.password = '';
					$scope.logonInfo.save();
				},
				function(response) {
					alert(status);
				}
			);
		};
		$scope.resizeChat = function(direction) {
			var width = parseInt($('.chatWidth').css('width'));
			$('.chatWidth').css('width', Math.min(Math.max(width + 100 * direction, 400), 1200) + 'px');
		};
		$scope.keyDownOnMessageInput = function(ev) {
			if (ev.keyCode == 13) {
				$scope.sendChatMessage($scope.chat.typedMessage);
				$scope.chat.typedMessage = '';
			}
		};
		$scope.sendChatMessage = function(message) {
			$scope.addMessageToChat(true, message);
		};
		$scope.addMessageToChat = function(isMine, message) {
			$scope.chat.rawMessages += $scope.chat.messageTemplate
				.replace('[popover side]', isMine ? 'left' : 'right')
				.replace('[float side]', isMine ? 'right' : 'left')
				.replace('[initial message]', message)
				.replace('[timestamp side]', isMine ? 'right' : 'right')
				.replace('[timestamp]', $scope.utils.getCurrentTime());
			$scope.chat.sceMessages = $sce.trustAsHtml($scope.chat.rawMessages);
			var messageContainer = $('#chatMessages');
			messageContainer.animate({scrollTop: messageContainer.prop('scrollHeight')}, 1000);
		};
		$scope.loadResources();
	}
]);

