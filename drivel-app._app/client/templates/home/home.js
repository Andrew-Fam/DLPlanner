/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.Home.events({
});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.Home.helpers({
	learnersOfDay : function() {
		var day = this.dayOfWeek,
			includeHoliday = Session.get('includeHoliday');

		console.log(day);

		var learners = [];

		if(day=='mon') {
			learners = Learners.find({
				"availability.mon" : {
					$elemMatch : {
						active : 'true'
					}
				}
			});
		}

		
		return learners;


	}
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.onCreated(function () {
});

Template.Home.onRendered(function () {
	$('.icheck').iCheck({
		labelHover: false,
		cursor: true,
		checkboxClass: 'icheckbox_polaris',
		radioClass: 'iradio_polaris'
	});
});

Template.Home.onDestroyed(function () {
});
