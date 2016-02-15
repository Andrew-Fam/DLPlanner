/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.Home.events({
	'click a[data-toggle="tab"]' : function(e) {
		Session.set('availabilityActiveTab',$(e.currentTarget).attr('href').replace('#',''));
	},
	'ifChecked #show-on-holiday' : function(e) {
		Session.set('includeHoliday',true);
	},
	'ifUnchecked #show-on-holiday' : function(e) {
		Session.set('includeHoliday',false);
	}
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

		var searchKey = JSON.parse('{ "availability.'+day+'" : { "$elemMatch" : { "active" : true } } , "$or" : [ { "passed" : { "$exists" : false } }, { "passed" : false } ] '+
			(includeHoliday?'':', "onHoliday" : false')+
			' }');

		console.log(searchKey);

		learners = Learners.find(searchKey).fetch();
		
		return learners;


	},
	dayAvailability: function() {
		console.log(Template.instance());
		return this.availability.mon;
	},
	daysOfWeek: ['mon','tue','wed','thu','fri','sat','sun']
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


	if(!Session.get('availabilityActiveTab')) {
		Session.set('availabilityActiveTab','mon');
	}
	
	$('#'+Session.get('availabilityActiveTab')).addClass('active');

	if(!Session.get('includeHoliday')) {
		Session.set('includeHoliday', false);
	}

	if(Session.get('includeHoliday')) {
		$('#show-on-holiday').iCheck('check');
	}
	
	
});

Template.Home.onDestroyed(function () {
});
