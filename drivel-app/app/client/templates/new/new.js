/*****************************************************************************/
/* New: Event Handlers */
/*****************************************************************************/
Template.New.events({
});

/*****************************************************************************/
/* New: Helpers */
/*****************************************************************************/
Template.New.helpers({
});

/*****************************************************************************/
/* New: Lifecycle Hooks */
/*****************************************************************************/
Template.New.onCreated(function () {
});

Template.New.onRendered(function () {

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


	$('.date-picker').pickadate();
});

Template.New.onDestroyed(function () {
});
