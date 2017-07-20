import React, { Component } from 'react';
import {render} from 'react-dom';
import style from './style.css';
import {PieTooltip} from 'react-d3-tooltip';
import moment from 'moment';
import {BarTooltip} from 'react-d3-tooltip';
import imagesData from '../../data/images.json';
var tempPieData = [];

export default class Stats extends Component{

	constructor(props) {
		super(props);
		this.state = {
			images: imagesData,
			groups: [],
			groups: [],
			temp: '2016-12-30T13:47:13.525Z',
			daysArr : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
			daysCounterArr :[0,0,0,0,0,0,0],
			generalDaysData: [],

			// <5, 5-13. 14-17,18-24,>25
			membersInGroup: [0,0,0,0,0],
			pieData: [{groups: 0, 'name': '<5'},
			{groups: 0, 'name': '6-13'},
			{groups: 0, 'name': '14-17'},
			{groups: 0, 'name': '>18'},]

		};



		this.getMembersInGroup = this.getMembersInGroup.bind(this);
		this.getImages = this.getImages.bind(this);
		this.createDaysChart = this.createDaysChart.bind(this);
		this.getChartSeries = this.getChartSeries.bind(this);
		this.getBarChartWeekData = this.getBarChartWeekData.bind(this);
		this.getPieGeneralData = this.getPieGeneralData.bind(this);
		this.addGroupMembersDataToArray = this.addGroupMembersDataToArray.bind(this);
		this.createGroupMembersPie = this.createGroupMembersPie.bind(this);
	}

	getChartSeries(fieldName){
			return [

			      {
			        field: fieldName,
			        name: fieldName,
			      }
			    ];
		}

	getBarChartWeekData(){
		return{
		  x : function(d) {
			      return d.day;
			    },
			    yScale: 'linear',
			    xLabel: 'Day',
			    yLabel: 'Number Of Posts',
			    yTicks: [10,'']
		};

	}

	getMembersInGroup(){
		// fetch(`${api}groups`)
		// .then(response => response.json())
		// .then(data => {
		// 	this.setState({groups: data.message});
		// 	this.createGroupMembersPie();
		// })
		// .catch(error=> {
		// 	console.log(error);
		// });
	}

// 	getting array and a
	addGroupMembersDataToArray(membersNum){
		if (membersNum >= 18) {
			tempPieData[3].groups++;
		}

		else if (membersNum >= 14 && membersNum <= 17){
			tempPieData[2].groups++;
		}


		else if (membersNum >= 6 && membersNum <= 13) {
		tempPieData[1].groups++;
	 	}

	 	else{
			tempPieData[0].groups++;
		}
	}


	createGroupMembersPie(){
		tempPieData = this.state.pieData;
		let groupsLength = this.state.groups.length;
		for (var i = 0; i < groupsLength; i++) {
			this.addGroupMembersDataToArray(this.state.groups[i].members.length);
		}
		this.setState({pieData: tempPieData});

	}
	getPieGeneralData(){
		return{
			 chartSeries: [
		  {
	        'field': '<5',
	        'name': 'less than 5'
	      },
	      {
	        'field': '6-13',
	        'name': '6 to 13'
	      },
	      {
	        'field': '14-17',
	        'name': '14 to 17'
	      },
	      {
	        'field': '>18',
	        'name': '18 and above'
	      },

			],

		value : function(d) {
      	return  d.groups;
    	},

    	 name : function(d) {
      	return d.name;
      	},
    	title: 'Members in Groups',
    	margins : {top: 50, right: 50, bottom: 20, left: 50}
		};

	}

	render() {
		return (
			<div className={style.container}>
				<div className={style.title}>
					Statistics
				</div>

				<div className={style.charts}>
				<section>
				<div className={style.chartTitle}>
				Posts By Days
				  </div>

				<BarTooltip
			      title= {'Posts By Days'}
			      data= {this.state.generalDaysData}
			      width= {800}
			      height= {600}
			      chartSeries = {this.getChartSeries('frequency')}
			      x= {this.getBarChartWeekData().x}
			      xLabel= {this.getBarChartWeekData().xLabel}
			      xScale= {'ordinal'}
			      yTicks= {this.getBarChartWeekData().yTicks}
			      yLabel = {this.getBarChartWeekData().yLabel}
				/>
    			</section>
    			<section>
    			<div className={style.chartTitle}>
    			Members in Group
    			</div>

    			<PieTooltip
			        title= {this.getPieGeneralData().title}
			        data= {this.state.pieData}
			        width= {this.getPieGeneralData().width}
			        height= {this.getPieGeneralData().height}
			        margins= {this.getPieGeneralData().margins}
			        chartSeries= {this.getPieGeneralData().chartSeries}
			        value = {this.getPieGeneralData().value}
			        name = {this.getPieGeneralData().name}
    			/>


			       </section>
			       </div>

			</div>
		);
	}

	getImages(){
		this.createDaysChart();
	}

	createDaysChart(){
		let images = this.state.images;
			// loop every image and add 1 to the day tag
			for (var i = 0; i < images.length; i++) {
				if(moment(images[i].date).isValid())
					{this.state.daysCounterArr[moment(images[i].date).day()] ++;}
			}

			// loop each day in array and add to chart data the day's data
			let index = 0;
				let temp = this.state.generalDaysData;
			for (var i = 0; i < this.state.daysCounterArr.length; i++) {
				temp.push({day: this.state.daysArr[i], frequency: this.state.daysCounterArr[i], index: index});
				index++;
			}
				this.setState({generalDaysData: temp});
	}

	componentWillMount() {
		this.getMembersInGroup();
		this.getImages();

	}
	componentWillUpdate() {

	}


}
