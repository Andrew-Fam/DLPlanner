/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
  'server/method_name': function () {
    // server method logic
  },
  'saveNewLearner' : function(learnerItem) {

  	learnerItem.created_on = new Date().getTime();

  	var learnerId = Learners.insert(learnerItem);

	return learnerId;

  }
});
