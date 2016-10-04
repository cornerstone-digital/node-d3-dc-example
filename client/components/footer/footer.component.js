import angular from 'angular';

export class FooterComponent {
  
  constructor($scope) {
    $scope.year = new Date().getFullYear();
  }
}

FooterComponent.$inject = ["$scope"];

export default angular.module('directives.footer', [])
  .component('footer', {
    template: require('./footer.html'),
    controller: FooterComponent
  })
  .name;
