/**
 * Created by Liviu Purjea on 9/9/2015.
 */
chatApp.factory('logonInfoService', [
	function () {
		return {
			data: {
				isLogged: false,
				userName: '',
                password: '',
				alterEgo: ''
			},
			load: function() {
				var stored = window.sessionStorage.getItem('logonInfo');
				if (stored != null) {
					this.data = JSON.parse(stored);
				}
			},
			save: function() {
				window.sessionStorage.setItem('logonInfo', JSON.stringify(this.data));
			}
		};
	}
]);