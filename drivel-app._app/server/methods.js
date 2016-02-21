/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
  'server/method_name': function () {
    // server method logic
  },
  'saveNewLearner' : function(learnerItem) {


    if ( ServerSession.get('authenticated') ) {
      
    } else {
      return false;
    }

  	learnerItem.created_on = new Date().getTime();

  	var learnerId = Learners.insert(learnerItem);

  	learnerItem._id = learnerId;

	return learnerItem;

  },
  'saveCurrentLearner' : function(learnerItem) {

    if ( ServerSession.get('authenticated') ) {
      
    } else {
      return false;
    }

  	learnerItem.updated_on = new Date().getTime();


  	console.log(learnerItem);

  	var updatedId = Learners.update(learnerItem._id,learnerItem);

	return learnerItem;

  },
  'customLogout' : function() {
    ServerSession.set('authenticated',undefined);
    return true;
  }
});
