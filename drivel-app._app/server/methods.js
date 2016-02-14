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

  	learnerItem._id = learnerId;

	return learnerItem;

  },
  'saveCurrentLearner' : function(learnerItem) {

  	learnerItem.updated_on = new Date().getTime();


  	console.log(learnerItem);

  	var updatedId = Learners.update(learnerItem._id,learnerItem);

	return learnerItem;

  }
});
