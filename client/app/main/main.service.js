'use strict';
const angular = require('angular');

/*@ngInject*/
export function ProjectService($http) {
  this.getProjects = function() {
    return $http.get('/api/projects');
  }
}

export default angular.module('nodeD3DcExampleApp.services', [])
                      .service('ProjectService', ProjectService)
                      .name;
