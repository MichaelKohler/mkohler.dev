export function config ($logProvider, $locationProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);

  // Enable HTML5Mode but do not require a base tag
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}
