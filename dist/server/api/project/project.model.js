'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProjectSchema = new _mongoose2.default.Schema({
  _projectid: String,
  _teacher_acctid: String,
  _schoolid: String,
  _school_ncesid: Number,
  school_latitude: Number,
  school_longitude: Number,
  school_city: String,
  school_state: String,
  school_zip: Number,
  school_metro: String,
  school_district: String,
  school_country: String,
  school_charter: String,
  school_magnet: String,
  school_year_round: String,
  school_nlns: String,
  school_kipp: String,
  school_charter_ready_promise: String,
  teacher_prefix: String,
  teacher_teach_for_america: String,
  teacher_ny_teaching_fellow: String,
  primary_focus_subject: String,
  primary_focus_area: String,
  resource_type: String,
  poverty_level: String,
  grade_level: String,
  vendor_shipping_charges: String,
  sales_tax: String,
  payment_processing_charges: String,
  fulfillment_labor_materials: String,
  total_price_excluding_optional_support: Number,
  total_price_including_optional_support: Number,
  students_reached: Number,
  total_donations: Number,
  num_donors: Number,
  eligible_double_your_impact_match: String,
  eligible_almost_home_match: String,
  funding_status: String,
  date_posted: Date,
  date_completed: Date,
  date_thank_you_packet_mailed: Date,
  date_expiration: Date
});

exports.default = _mongoose2.default.model('Project', ProjectSchema);
//# sourceMappingURL=project.model.js.map
