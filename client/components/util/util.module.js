'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('nodeD3DcExampleApp.util', [])
  .factory('Util', UtilService)
  .name;
