/*****************************************************************************/
/* Learners: Event Handlers */
/*****************************************************************************/
Template.Learners.events({
});

/*****************************************************************************/
/* Learners: Helpers */
/*****************************************************************************/
Template.Learners.helpers({
	learners : function() {
		return Learners.find();
	}
});

/*****************************************************************************/
/* Learners: Lifecycle Hooks */
/*****************************************************************************/
Template.Learners.onCreated(function () {
});

Template.Learners.onRendered(function () {
});

Template.Learners.onDestroyed(function () {
});
