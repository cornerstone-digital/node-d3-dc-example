import angular from 'angular';
import uiRouter from 'angular-ui-router';
import * as d3 from 'd3';
import dc from 'dc';
import crossfilter from 'crossfilter';
import moment from 'moment';
import routing from './main.routes';
import ProjectService from './main.service';

export class MainController {
  
  /*@ngInject*/
  constructor(ProjectService) {
    this.ProjectService = ProjectService;
    this.loading = true;
  }
  
  resetAll() {
    dc.filterAll();
    dc.redrawAll();
  }
  
  makeGraphs(apiData) {
    return new Promise((resolve, reject) => {
      let dateFormat = d3.time.format("%m/%d/%Y");
  
      apiData.data.forEach(function(d) {
        d.date_posted = moment(d.date_posted).format('M/D/YYYY');
        d.date_posted = dateFormat.parse(d.date_posted);
        d.date_posted.setDate(1);
        d.total_donations = +d.total_donations;
      });
  
      //Create a Crossfilter instance
      let ndx = crossfilter(apiData.data);
  
      //Define Dimensions
      let datePosted = ndx.dimension(function(d) { return d.date_posted; });
      let gradeLevel = ndx.dimension(function(d) { return d.grade_level; });
      let resourceType = ndx.dimension(function(d) { return d.resource_type; });
      let fundingStatus = ndx.dimension(function(d) { return d.funding_status; });
      let povertyLevel = ndx.dimension(function(d) { return d.poverty_level; });
      let state = ndx.dimension(function(d) { return d.school_state; });
      let totalDonations  = ndx.dimension(function(d) { return d.total_donations; });
  
  
      //Calculate metrics
      let projectsByDate = datePosted.group();
      let projectsByGrade = gradeLevel.group();
      let projectsByResourceType = resourceType.group();
      let projectsByFundingStatus = fundingStatus.group();
      let projectsByPovertyLevel = povertyLevel.group();
      let stateGroup = state.group();
  
      let all = ndx.groupAll();
  
      //Calculate Groups
      const totalDonationsState = state.group().reduceSum(function(d) {
        return d.total_donations;
      });
  
      const totalDonationsGrade = gradeLevel.group().reduceSum(function(d) {
        return d.grade_level;
      });
  
      const totalDonationsFundingStatus = fundingStatus.group().reduceSum(function(d) {
        return d.funding_status;
      });
  
      const netTotalDonations = ndx.groupAll().reduceSum(function(d) {
        return d.total_donations;
      });
  
      //Define threshold values for data
      let minDate = datePosted.bottom(1)[0].date_posted;
      let maxDate = datePosted.top(1)[0].date_posted;
  
      //Charts
      let dateChart = dc.lineChart("#date-chart");
      let gradeLevelChart = dc.rowChart("#grade-chart");
      let resourceTypeChart = dc.rowChart("#resource-chart");
      let fundingStatusChart = dc.pieChart("#funding-chart");
      let povertyLevelChart = dc.rowChart("#poverty-chart");
      let totalProjects = dc.numberDisplay("#total-projects");
      let netDonations = dc.numberDisplay("#net-donations");
      let stateDonations = dc.barChart("#state-donations");
  
      dc.selectMenu('#menuselect')
        .dimension(state)
        .group(stateGroup);
  
      dc.dataCount("#row-selection")
        .dimension(ndx)
        .group(all);
  
      totalProjects
        .formatNumber(d3.format("d"))
        .valueAccessor(function(d){return d; })
        .group(all);
  
      netDonations
        .formatNumber(d3.format("d"))
        .valueAccessor(function(d){return d; })
        .group(netTotalDonations)
        .formatNumber(d3.format(".3s"));
  
      dateChart
        .height(220)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(datePosted)
        .group(projectsByDate)
        .renderArea(true)
        .transitionDuration(500)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .elasticY(true)
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .xAxisLabel("Year")
        .yAxis().ticks(6);
  
      resourceTypeChart
      //.width(300)
        .height(220)
        .dimension(resourceType)
        .group(projectsByResourceType)
        .elasticX(true)
        .xAxis().ticks(5);
  
      povertyLevelChart
      //.width(300)
        .height(220)
        .dimension(povertyLevel)
        .group(projectsByPovertyLevel)
        .xAxis().ticks(4);
  
      gradeLevelChart
      //.width(300)
        .height(220)
        .dimension(gradeLevel)
        .group(projectsByGrade)
        .xAxis().ticks(4);
  
  
      fundingStatusChart
        .height(220)
        //.width(350)
        .radius(90)
        .innerRadius(40)
        .transitionDuration(1000)
        .dimension(fundingStatus)
        .group(projectsByFundingStatus);
  
      stateDonations
      //.width(800)
        .height(220)
        .transitionDuration(1000)
        .dimension(state)
        .group(totalDonationsState)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .centerBar(false)
        .gap(5)
        .elasticY(true)
        .x(d3.scale.ordinal().domain(state))
        .xUnits(dc.units.ordinal)
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .ordering(function(d){return d.value;})
        .yAxis().tickFormat(d3.format("s"));
        
      //this.loading = false;
  
      dc.renderAll();
      
      resolve();
    });
  }
  
  $onInit() {
    this.ProjectService
        .getProjects()
        .then((data) => {
          return this.makeGraphs(data);
        })
        .then(() => {
          this.loading = false;
        });
  }
}

export default angular.module('nodeD3DcExampleApp.main', [uiRouter, 'nodeD3DcExampleApp.services'])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .service(ProjectService)
  .name;
