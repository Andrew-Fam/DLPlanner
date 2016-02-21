/*****************************************************************************/
/* LearnersDetails: Event Handlers */
/*****************************************************************************/
Template.LearnersDetails.events({
	'click .availability-picker--time-unit' : function(e) {

		var currentLearner = Session.get('currentLearner');

		var dayOfWeekArray = currentLearner.availability[this.date];

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

		Session.set('currentLearner',currentLearner);

	},
	'ifChecked .availability-picker--all-day-toggle--input' : function(e) {

		var element = $(e.currentTarget);

		var newLearner = Session.get('currentLearner');

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

		Session.set('currentLearner',newLearner);
	},
	'ifUnchecked .availability-picker--all-day-toggle--input' : function(e) {
		var element = $(e.currentTarget);

		var newLearner = Session.get('currentLearner');

		var dayOfWeekArray = newLearner.availability[element.data('dayOfWeek')];

		for(var i = 0; i<dayOfWeekArray.length; i++) {
			dayOfWeekArray[i].active = false;
			dayOfWeekArray[i].markerType = undefined;
		}

		Session.set('currentLearner',newLearner);
	},
	'click #save-learner' : function(e) {
		$('.new--in-progress').addClass('in');

		var newLearner = Session.get('currentLearner');

		newLearner.fullName = $('#fullName').val();

		newLearner.alias = $('#alias').val();

		newLearner.dob = $('#dob_hidden').val();

		newLearner.phone = $('#phone').val();

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

		newLearner.passed = $('#passed').is(':checked');

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
					saveCurrentLearner ();
				}

			}); 
		} else {
			saveCurrentLearner ();
		}



		function saveCurrentLearner () {
			Meteor.call('saveCurrentLearner',newLearner, function(error, result){

				console.log(error);
				console.log(result);

				$('.new--in-progress').removeClass('in');

				if(error==undefined) {
					sAlert.success('Learner '+(result.alias||result.fullName)+' updated');
					
					Session.set('currentLearner',result);

					Router.go('learnersDetails',{ _id: result._id});
				} else {
					sAlert.error(error);
				}

			});
		}
	},
	'click #reset-learner' : function(e) {

		Session.set('currentLearner',jQuery.extend(true, {}, this));

		if(this.dob != undefined) {
			$('#dob').pickadate('picker').set('select',new Date(this.dob));
		}

		if(this.license.expiry != undefined) {
			$('#expiry').pickadate('picker').set('select',new Date(this.license.expiry));
		}

		$('#fullName').val(this.fullName);

		$('#alias').val(this.alias);

		$('#phone').val(this.phone);

		$('#address').val(this.address);

		$('#suburb').val(this.suburb);

		if(this.onHoliday) {
			$('#holiday-check').iCheck('check');
		}

		if(this.needLogBook) {
			$('#log-book-check').iCheck('check');
		}

		if(this.passed) {
			$('#passed').iCheck('check');
		}

		if(this.license.type=='international') {
			$('#international-license-check').prop('checked',true);


			if (typeof Event === 'function' || !document.fireEvent) {
			  var event = document.createEvent('HTMLEvents');
			  event.initEvent('change', true, true);
			  $('#international-license-check')[0].dispatchEvent(event);
			} else {
			  $('#international-license-check')[0].fireEvent('onchange');
			}
		}

		$('#license-number').val(this.license.number);

		$('#card-number').val(this.license.cardNumber);

	}
});

/*****************************************************************************/
/* LearnersDetails: Helpers */
/*****************************************************************************/
Template.LearnersDetails.helpers({
	isInternational : function() {

		return this.license.type == 'international'?'Int.':'Local';
	},
	learnerName : function() {
		return this.alias || this.fullName || 'Unnamed';
	},
	ifNeedLogBook : function() {
		return this.needLogBook?'checked':'';
	},
	ifOnHoliday : function() {
		return this.onHoliday?'checked':'';
	},
	learner : function() {
		return Session.get('currentLearner');
	},
	currentLearnerName : function() {

		var newLearner = Session.get('currentLearner');

		return newLearner.alias || newLearner.fullName;
		
	}
});

/*****************************************************************************/
/* LearnersDetails: Lifecycle Hooks */
/*****************************************************************************/
Template.LearnersDetails.onCreated(function () {
});

Template.LearnersDetails.onRendered(function () {

	var elem = $('.js-switch');

	Session.set('currentLearner',jQuery.extend(true, {}, this.data));

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

	if(this.data.dob != undefined) {
		$('#dob').pickadate('picker').set('select',new Date(this.data.dob));
	}

	if(this.data.license.expiry != undefined) {
		$('#expiry').pickadate('picker').set('select',new Date(this.data.license.expiry));
	}

	$('#fullName').val(this.data.fullName);

	$('#alias').val(this.data.alias);

	$('#phone').val(this.data.phone);

	$('#address').val(this.data.address);

	$('#suburb').val(this.data.suburb);

	if(this.data.onHoliday) {
		$('#holiday-check').iCheck('check');
	}

	if(this.data.passed) {
		$('#passed').iCheck('check');
	}

	if(this.data.needLogBook) {
		$('#log-book-check').iCheck('check');
	}

	if(this.data.license.type=='international') {
		$('#international-license-check').prop('checked',true);


		if (typeof Event === 'function' || !document.fireEvent) {
		  var event = document.createEvent('HTMLEvents');
		  event.initEvent('change', true, true);
		  $('#international-license-check')[0].dispatchEvent(event);
		} else {
		  $('#international-license-check')[0].fireEvent('onchange');
		}
	}


	$('#license-number').val(this.data.license.number);

	$('#card-number').val(this.data.license.cardNumber);

});

Template.LearnersDetails.onDestroyed(function () {
});
