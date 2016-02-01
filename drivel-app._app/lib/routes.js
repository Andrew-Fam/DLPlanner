Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});


Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  where: 'client'
});

Router.route('learners', {
  name: 'learners',
  template: 'Learners',
  controller: 'LearnersController',
  where: 'client'
});

Router.route('learners/new', {
  name: 'learnersNew',
  template: 'New',
  controller: 'NewController',
  where: 'client'
});