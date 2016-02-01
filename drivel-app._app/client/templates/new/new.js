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

		console.log(dayOfWeekArray);

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
					}

					break;

				}
				
			} else {

				console.log('Current Block not active')

				if(i==this.index) {

					console.log('Current Block is clicked block');

					console.log('Previous marker is: ');
					console.log(previousMarker);

					if(previousMarker!=undefined) {

						console.log('Previous marker is not undefined!');

						if(previousMarker.markerType == 'start') {
							currentTimeBlock.active = true;
							currentTimeBlock.markerType = 'end';

							for(var j = previousMarker.index+1; j < i; j++ ) {

								console.log(j);
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

					console.log(currentTimeBlock);

					break;
					
				}

			}

		}

		Session.set('newLearner',newLearner);

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
	  checkboxClass: 'icheckbox_flat',
    	radioClass: 'iradio_flat'
	});


	$('.date-picker').pickadate({
		selectYears: 100,
  		selectMonths: true,
  		max: new Date()
	});
});

Template.New.onDestroyed(function () {
});
