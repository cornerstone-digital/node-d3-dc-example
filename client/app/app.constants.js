'use strict';

import angular from 'angular';

export default angular.module('nodeD3DcExampleApp.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;
