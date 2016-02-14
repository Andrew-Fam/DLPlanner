/*****************************************************************************/
/* New: Event Handlers */
/*****************************************************************************/
Template.New.events({
	'keyup #fullName' : function(e) {

		var newLearner = Session.get('newLearner');

		newLearner.fullName = $('#fullName').val();

		Session.set('newLearner',newLearner);
	},
	'keyup #alias' : function(e) {

		var newLearner = Session.get('newLearner');

		newLearner.alias = $('#alias').val();

		Session.set('newLearner',newLearner);
	},
	'keyup #phone' : function(e) {

		var newLearner = Session.get('newLearner');

		newLearner.phone = $('#phone').val();

		Session.set('newLearner',newLearner);
	},
	'click .availability-picker--time-unit' : function(e) {

		var newLearner = Session.get('newLearner');

		var dayOfWeekArray = newLearner.availability[this.date];

		var previousMarker;

		for(var i = 0; i<dayOfWeekArray.length; i++) {

			var currentTimeBlock = dayOfWeekArray[i];

			if(currentTimeBlock.active) {

				if(i!=this.index) {
					previousMarker = currentTimeBlock;
				} else {

					if(currentTimeBlock.markerType == 'end') {
						currentTimeBlock.active = false;
						currentTimeBlock.markerType = undefined;

						for (var j = previousMarker.index = 0; j < i; j++) {
							dayOfWeekArray[j].active = false;
							dayOfWeekArray[j].markerType = undefined;
						}

					} else if (currentTimeBlock.markerType == 'start' ) {
						currentTimeBlock.active = false;
						currentTimeBlock.markerType = undefined;

						for (var j = i; j < dayOfWeekArray.length; j++) {
							dayOfWeekArray[j].active = false;
							if(dayOfWeekArray[j].markerType == 'end') {
								dayOfWeekArray[j].markerType = undefined;
								break;
							} else {
								dayOfWeekArray[j].markerType = undefined;
							}
						}
					} else {

						// clear active marker to start of current block

						for (var j = i-1; j >= 0 ; j--) {

							dayOfWeekArray[j].active = false;

							if(dayOfWeekArray[j].markerType == 'start') {
								dayOfWeekArray[j].markerType = undefined;
								break;
							} else {
								dayOfWeekArray[j].markerType = undefined;
							}

						}

						// clear active marker to end of current block

						for (var j = i; j < dayOfWeekArray.length ; j++) {

							dayOfWeekArray[j].active = false;

							if(dayOfWeekArray[j].markerType == 'end') {
								dayOfWeekArray[j].markerType = undefined;
								break;
							} else {
								dayOfWeekArray[j].markerType = undefined;
							}

						}

						$('.availability-picker--all-day-toggle--input[data-day-of-week=\''+this.date+'\'').iCheck('uncheck');

					}

					break;

				}
				
			} else {

				if(i==this.index) {

					if(previousMarker!=undefined) {

						if(previousMarker.markerType == 'start') {
							currentTimeBlock.active = true;
							currentTimeBlock.markerType = 'end';

							for(var j = previousMarker.index+1; j < i; j++ ) {

								var inBetweenTimeBlock = dayOfWeekArray[j];

								inBetweenTimeBlock.active = true;
								inBetweenTimeBlock.marketType = 'in-between';
							}

						} else {
							currentTimeBlock.active = true;
							currentTimeBlock.markerType = 'start';
						}
					} else {
						currentTimeBlock.active = true;
						currentTimeBlock.markerType = 'start';
					}

					break;
					
				}

			}

		}

		Session.set('newLearner',newLearner);

	},
	'ifChecked .availability-picker--all-day-toggle--input' : function(e) {
		var element = $(e.currentTarget);

		var newLearner = Session.get('newLearner');

		var dayOfWeekArray = newLearner.availability[element.data('dayOfWeek')];

		for(var i = 0; i<dayOfWeekArray.length; i++) {
			dayOfWeekArray[i].active = true;
			if(i==0) {
				dayOfWeekArray[i].markerType = 'start';
			} else if (i == dayOfWeekArray.length-1) {
				dayOfWeekArray[i].markerType = 'end';
			} else {
				dayOfWeekArray[i].markerType = 'in-between';
			}
		}

		Session.set('newLearner',newLearner);
	},
	'ifUnchecked .availability-picker--all-day-toggle--input' : function(e) {
		var element = $(e.currentTarget);

		var newLearner = Session.get('newLearner');

		var dayOfWeekArray = newLearner.availability[element.data('dayOfWeek')];

		for(var i = 0; i<dayOfWeekArray.length; i++) {
			dayOfWeekArray[i].active = false;
			dayOfWeekArray[i].markerType = undefined;
		}

		Session.set('newLearner',newLearner);
	},
	'click #reset-new-learner' : function(e) {


		var newLearner = Session.get('newLearner');

		newLearner.dob = '';

		newLearner.fullName = '';

		newLearner.alias = '';

		newLearner.phone = '';

		newLearner.address = '',

		newLearner.suburb = '',

		newLearner.license = {
			type : 'local',
			number : '',
			cardNumber : '',
			expiry: ''
		},

		newLearner.needLogBook = '',

		newLearner.onHoliday = '',

		newLearner.note = '';

		$('#dob_hidden, #dob, #fullName, #alias, #address, #suburb, #phone, #notes, #pickup').val('');

		$('#international-license-check').prop('checked',false);

		$('#log-book-check').prop('checked',false);

		$('#holiday-check').prop('checked',false);

		for(var i=0; i< newLearner.availability.mon.length; i++) {
			newLearner.availability.mon[i].active = false;
			newLearner.availability.mon[i].markerType = undefined;
			newLearner.availability.tue[i].active = false;
			newLearner.availability.tue[i].markerType = undefined;
			newLearner.availability.wed[i].active = false;
			newLearner.availability.wed[i].markerType = undefined;
			newLearner.availability.thu[i].active = false;
			newLearner.availability.thu[i].markerType = undefined;
			newLearner.availability.fri[i].active = false;
			newLearner.availability.fri[i].markerType = undefined;
			newLearner.availability.sat[i].active = false;
			newLearner.availability.sat[i].markerType = undefined;
			newLearner.availability.sun[i].active = false;
			newLearner.availability.sun[i].markerType = undefined;
		}

		Session.set('newLearner',newLearner);

		sAlert.info('New learner\'s details have been reset.',{
        	effect: ''
		});

	},
	'click #save-new-learner' : function(e) {

		$('.new--in-progress').addClass('in');

		var newLearner = Session.get('newLearner');

		newLearner.dob = $('#dob_hidden').val();

		newLearner.address = $('#address').val();

		newLearner.suburb = $('#suburb').val();

		newLearner.license = {
			type : $('#international-license-check').is(':checked')?'international':'local',
			number : $('#license-number').val(),
			cardNumber : $('#card-number').val(),
			expiry: $('#expiry_hidden').val()
		};

		newLearner.needLogBook = $('#log-book-check').is(':checked');

		newLearner.onHoliday = $('#holiday-check').is(':checked');

		newLearner.note = $('#notes').val();

		if(newLearner.fullName == '') {

			sAlert.error('Please provide a name/alias for this learner');
			$('.new--in-progress').removeClass('in');
			
			return;
		}

		var requiredFields = [
			newLearner.dob,
			newLearner.fullName,
			newLearner.license.number,
			newLearner.license.expiry
		];

		var missingFields = false;

		for (var i = 0; i<requiredFields.length;i++ ) {
			if(requiredFields[i]=='') {

				missingFields = true;

				break;
			}
		}

		/**
		 * This tiny script just helps us demonstrate
		 * what the various example callbacks are doing
		 */
		

		if(missingFields) {
			bootbox.confirm("Some important fields are missing. Do you want to save this learner anyway?", function(result) {
			  	
				if(result) {
					saveNewLearner ();
				}

			}); 
		} else {
			saveNewLearner ();
		}

		function saveNewLearner () {
			Meteor.call('saveNewLearner',newLearner, function(error, result){

				console.log(error);
				console.log(result);

				$('.new--in-progress').removeClass('in');

				if(error==undefined) {
					sAlert.success('Learner '+(result.alias||result.fullName)+' created');
					Router.go('learnersDetails',{ _id: result._id});
				} else {
					sAlert.error(error);
				}

			});
		}


		

	}
});




/*****************************************************************************/
/* New: Helpers */
/*****************************************************************************/
Template.New.helpers({
	learner : function() {
		return Session.get('newLearner');
	},
	timeUnit : 15,
	totalUnitPerday : 60,
	startTime : 6,
	endTime : 21,
	newLearnerName : function() {

		console.log('newLearnerName');

		var newLearner = Session.get('newLearner');

		if (newLearner == undefined || !newLearner || (newLearner.fullName == '' && newLearner.alias == '')) {
			return 'New Learner';
		}

		return newLearner.alias || newLearner.fullName;
		
	}
});


/*****************************************************************************/
/* New: Lifecycle Hooks */
/*****************************************************************************/
Template.New.onCreated(function () {
	
});

Template.New.onRendered(function () {


	var timeUnit = 15;
	var totalUnitPerday = 60;
	var startTime = 6;
	var endTime = 21;

	var newLearner = {
		fullName: '',
		alias: '',
		phone: '',
		availability: {
			'mon' : [],
			'tue' : [],
			'wed' : [],
			'thu' : [],
			'fri' : [],
			'sat' : [],
			'sun' : []
		}
	}

	for(var i=6; i <= 21; i++) {

		if(i<21) {
			newLearner.availability.mon.push({start: { hour: i, minute: '00' }, end: { hour: i, minute: 15 }, hourMark: true, date: 'mon', index: newLearner.availability.mon.length});
			newLearner.availability.mon.push({start: { hour: i, minute: 15 }, end: { hour: i, minute: 30 }, date: 'mon', index: newLearner.availability.mon.length});
			newLearner.availability.mon.push({start: { hour: i, minute: 30 }, end: { hour: i, minute: 45 }, date: 'mon', index: newLearner.availability.mon.length});
			newLearner.availability.mon.push({start: { hour: i, minute: 45 }, end: { hour: i+1, minute: '00' }, date: 'mon', index: newLearner.availability.mon.length});
		}
		
		
		if(i<21) {
			newLearner.availability.tue.push({start: { hour: i, minute: '00' }, end: { hour: i, minute: 15 }, hourMark: true, date: 'tue', index: newLearner.availability.tue.length});
			newLearner.availability.tue.push({start: { hour: i, minute: 15 }, end: { hour: i, minute: 30 }, date: 'tue', index: newLearner.availability.tue.length});
			newLearner.availability.tue.push({start: { hour: i, minute: 30 }, end: { hour: i, minute: 45 }, date: 'tue', index: newLearner.availability.tue.length});
			newLearner.availability.tue.push({start: { hour: i, minute: 45 }, end: { hour: i+1, minute: '00' }, date: 'tue', index: newLearner.availability.tue.length});
		}

		
		if(i<21) {
			newLearner.availability.wed.push({start: { hour: i, minute: '00' }, end: { hour: i, minute: 15 }, hourMark: true, date: 'wed', index: newLearner.availability.wed.length});
			newLearner.availability.wed.push({start: { hour: i, minute: 15 }, end: { hour: i, minute: 30 }, date: 'wed', index: newLearner.availability.wed.length, index: newLearner.availability.wed.length});
			newLearner.availability.wed.push({start: { hour: i, minute: 30 }, end: { hour: i, minute: 45 }, date: 'wed', index: newLearner.availability.wed.length});
			newLearner.availability.wed.push({start: { hour: i, minute: 45 }, end: { hour: i+1, minute: '00' }, date: 'wed', index: newLearner.availability.wed.length});
		}

		
		if(i<21) {
			newLearner.availability.thu.push({start: { hour: i, minute: '00' }, end: { hour: i, minute: 15 }, hourMark: true, date: 'thu', index: newLearner.availability.thu.length});
			newLearner.availability.thu.push({start: { hour: i, minute: 15 }, end: { hour: i, minute: 30 }, date: 'thu', index: newLearner.availability.thu.length});
			newLearner.availability.thu.push({start: { hour: i, minute: 30 }, end: { hour: i, minute: 45 }, date: 'thu', index: newLearner.availability.thu.length});
			newLearner.availability.thu.push({start: { hour: i, minute: 45 }, end: { hour: i+1, minute: '00' }, date: 'thu', index: newLearner.availability.thu.length});
		}

		
		if(i<21) {
			newLearner.availability.fri.push({start: { hour: i, minute: '00' }, end: { hour: i, minute: 15 }, hourMark: true, date: 'fri', index: newLearner.availability.fri.length});
			newLearner.availability.fri.push({start: { hour: i, minute: 15 }, end: { hour: i, minute: 30 }, date: 'fri', index: newLearner.availability.fri.length});
			newLearner.availability.fri.push({start: { hour: i, minute: 30 }, end: { hour: i, minute: 45 }, date: 'fri', index: newLearner.availability.fri.length});
			newLearner.availability.fri.push({start: { hour: i, minute: 45 }, end: { hour: i+1, minute: '00' }, date: 'fri', index: newLearner.availability.fri.length});
		}

		if(i<21) {
			newLearner.availability.sat.push({start: { hour: i, minute: '00' }, end: { hour: i, minute: 15 }, hourMark: true, date: 'sat', index: newLearner.availability.sat.length});
			newLearner.availability.sat.push({start: { hour: i, minute: 15 }, end: { hour: i, minute: 30 }, date: 'sat', index: newLearner.availability.sat.length});
			newLearner.availability.sat.push({start: { hour: i, minute: 30 }, end: { hour: i, minute: 45 }, date: 'sat', index: newLearner.availability.sat.length});
			newLearner.availability.sat.push({start: { hour: i, minute: 45 }, end: { hour: i+1, minute: '00' }, date: 'sat', index: newLearner.availability.sat.length});
		}

		if(i<21) {
			newLearner.availability.sun.push({start: { hour: i, minute: '00' }, end: { hour: i, minute: 15 }, hourMark: true, date: 'sun', index: newLearner.availability.sun.length});
			newLearner.availability.sun.push({start: { hour: i, minute: 15 }, end: { hour: i, minute: 30 }, date: 'sun', index: newLearner.availability.sun.length});
			newLearner.availability.sun.push({start: { hour: i, minute: 30 }, end: { hour: i, minute: 45 }, date: 'sun', index: newLearner.availability.sun.length});
			newLearner.availability.sun.push({start: { hour: i, minute: 45 }, end: { hour: i+1, minute: '00' }, date: 'sun', index: newLearner.availability.sun.length});
		}
	}

	Session.set('newLearner',newLearner);


	

	var elem = $('.js-switch');

	elem.each(function(){
		var self = $(this)[0];

		var init = new Switchery(self, {
			speed : '0.25s',
			secondaryColor: '#75C0E5',
			color: '#E55757'
		});
	});
	

	$('.icheck').iCheck({
	  labelHover: false,
	  cursor: true,
	  checkboxClass: 'icheckbox_polaris',
    	radioClass: 'iradio_polaris'
	});


	$('#dob').pickadate({
		selectYears: 100,
  		selectMonths: true,
  		max: new Date(),
  		format: 'dd mmmm, yyyy',
		formatSubmit: 'yyyy/mm/dd',
		hiddenPrefix: 'real__'
	});

	$('#expiry').pickadate({
		selectYears: 6,
  		selectMonths: true,
  		format: 'dd mmmm, yyyy',
		formatSubmit: 'yyyy/mm/dd',
		hiddenPrefix: 'real__'
	});
});

Template.New.onDestroyed(function () {
});
