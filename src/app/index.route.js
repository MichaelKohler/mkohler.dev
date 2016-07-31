export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'app/components/contact/contact.html',
      controller: 'ContactController',
      controllerAs: 'contact'
    });

  $urlRouterProvider.otherwise('/');
}
