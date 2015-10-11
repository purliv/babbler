chatApp.factory('utilsService', [
	/* dependencies: */
	/* implementation */
	function () {
		return {
			formatTwoDigitNumber : function(number) {
				return number < 10 ? '0' + number : number.toString();
			},
			getCurrentTime : function() {
				var now = new Date();
				return this.formatTwoDigitNumber(now.getHours()) + ':' + this.formatTwoDigitNumber(now.getMinutes());
			}
		}
	}
]);