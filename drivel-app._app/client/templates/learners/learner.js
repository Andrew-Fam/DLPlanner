/*****************************************************************************/
/* Learner: Event Handlers */
/*****************************************************************************/
Template.Learner.events({
});

/*****************************************************************************/
/* Learner: Helpers */
/*****************************************************************************/
Template.Learner.helpers({
	needMoreDetails : function() {
		var requiredFields = [
			this.dob,
			this.fullName,
			this.license.number,
			this.license.expiry
		];

		var missingFields = false;

		for (var i = 0; i<requiredFields.length;i++ ) {
			if(requiredFields[i]=='') {

				missingFields = true;

				break;
			}
		}

		return missingFields;
	},
	at : function() {
		return moment(this.created_on).fromNow();
	}
});

/*****************************************************************************/
/* Learner: Lifecycle Hooks */
/*****************************************************************************/
Template.Learner.onCreated(function () {
});

Template.Learner.onRendered(function () {
});

Template.Learner.onDestroyed(function () {
});
