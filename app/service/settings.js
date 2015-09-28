/**
 * Created by Liviu Purjea on 5/13/2015.
 */
chatApp.factory('settingsService', [
	/* dependencies: */
	/* implementation */
	function () {
		var viewsPath = '/view/';
		return {
			src: {
				view: {
					main: viewsPath + 'chat.html',
					login: viewsPath + 'login.html'
				}
			}
		};
	}
]);