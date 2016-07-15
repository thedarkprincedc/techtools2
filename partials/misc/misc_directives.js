angular.module('miscDirective', []).directive('issueList', function() {
	return {
		restrict : 'EA', //E = element, A = attribute, C = class, M = comment
		scope : {
			//@ reads the attribute value, = provides two-way binding, & works with functions
			gameType : '@',
			title : '@',
			filters : '='
		},
		template : `<h3>{{title}}</h3>
                    <table width="100%">
                    <thead>
                        <tr>
                    
                            <th>Subject</th>
                            <th>Created On</th>
                            <th>Last Updated</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="item in issueList">            
                            <td><a ng-click="onClickDetail()">{{item.subject}}</a></td>
                            <td>{{item.created_on | date:"MM/dd/yyyy 'at' h:mma" }}</td>
                            <td>{{item.updated_on | date:"MM/dd/yyyy 'at' h:mma" }}</td>
                            <td>{{item.status.name}}</td>
                        </tr>
                    </tbody>
                    </table>
                  <div id="myModal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog" data-options="close_on_background_click:false;close_on_esc:false;">
					  <h2 id="modalTitle">{{currItem.subject}}</h2>
					  <div class="row"> 
					  	<div class="small-7 columns">
					  	<p>{{currItem.description}}</p>
					  	<issue-List-Comments></issue-List-Comments>
					  	
					  	
					  	</div>
					  	<div class="small-4 columns">
					
					  		<issue-List-Misc-Items></issue-List-Misc-Items>
					  	</div> 
					  </div>
					 
					  
					  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
					</div>
                    `,
		controller : ['$scope', '$compile', '$http', '$rootScope','$timeout', '$interval',
		function($scope, $compile, $http, $root, $timeout, $interval) {
            var stop = null;
            $scope.onClickDetail = function(){
            	var currItem = this.item;
            	if(this.item.id){
            		$http({
            			url : "php/techtoolsapp.php?action=getissues&id=" + this.item.id
            		}).then(function(msg){
            			$scope.currItem = currItem;
            			debugger;
            			$('#myModal').foundation('reveal', 'open');
            			          
            		});
 
            	}
                    
            };
            $scope.startFunction = function(){
                stop = $interval(function(){
                    $scope.startUpdate();
                }, 1000*20, 0);
                $scope.startUpdate = function(){
                    $http({url : "php/techtoolsapp.php?action=getissues"}).then(function(msg){
                        $scope.issueList = msg.data.issues;
                    });
                };
                $scope.stopUpdate = function() {
                    if (angular.isDefined(stop)) {
                        $interval.cancel(stop);
                        stop = undefined;
                    }
                };
                $scope.$on('$destroy', function() {
                    // Make sure that the interval is destroyed too
                    $scope.stopUpdate();
                });
                $scope.startUpdate();
            }; 
            $scope.startFunction();
        }]
    }
}).directive('issueListComments', function() {
	return {
		restrict : 'EA', //E = element, A = attribute, C = class, M = comment
		scope : {
			//@ reads the attribute value, = provides two-way binding, & works with functions
			issueId : '='
		},
		template : `<label for="comment">Comments</label>
					<textarea name="comment"></textarea>
					<button class="tiny">Comment</button>
					<div class="row" ng-repeat="item in commentItem">
						<div class="small-12 columns">
						User {{item.username}} said on {{item.date}}
						<p>{{item.comment}}</p>
						</div>
					</div>
					`,
		controller : ['$scope', '$compile', '$http', '$rootScope','$timeout',
		function($scope, $compile, $http, $root, $timeout) {
            $scope.commentItem = [{comment : "rijnijdnijnijrndijrn", username : "bmosley",  date : "07/43/4483"}];
        }]
    }
}).directive('issueListMiscItems', function() {
	return {
		restrict : 'EA', //E = element, A = attribute, C = class, M = comment
		scope : {
			//@ reads the attribute value, = provides two-way binding, & works with functions
			issueId : '='
		},
		template : `<div class="row">
						<div class="small-12 columns">
							<label>Customer</label>&nbsp;&nbsp;&nbsp;<span>{{currItem.customername}}</span>
					  		<label ng-show="currItem.phonenumber">Phone#</label>&nbsp;&nbsp;&nbsp;{{currItem.phonenumber}}
					  		<label ng-show="currItem.address">Address</label>&nbsp;&nbsp;&nbsp;{{currItem.address}}
					  		<label ng-show="currItem.email">Email</label>&nbsp;&nbsp;&nbsp;{{currItem.email}}
					  		<label>Equipment</label>
					  		<span ng-repeat="eqitem in currItem.equipment">&nbsp;&nbsp;&nbsp;{{eqitem.name}} : {{eqitem.value}}<br/></span>
			
						</div>
					</div>
					`,
		controller : ['$scope', '$compile', '$http', '$rootScope','$timeout',
		function($scope, $compile, $http, $root, $timeout) {
            $scope.currItem = {customername : "Brett Mosley",
            					equipment : [{name : "rgdrggdrhrh", value : "grggegerg"}, {name : "rgdrggdrhrh"}]
            					};
        }]
    }
}).directive('createNewticket', function() {
	return {
		restrict : 'EA', //E = element, A = attribute, C = class, M = comment
		scope : {
			//@ reads the attribute value, = provides two-way binding, & works with functions
			issueId : '='
		},
		template : `<form name="userForm" ng-submit="onClickSubmit(userForm.$valid)" novalidate><div class="row">
	
	<div class="small-10 columns small-offset-1">
		<div class="row">
			<div class="small-12 columns">
		<h3>Create New Ticket</h3>	
	</div>
			<div class="small-6 columns">
				<label class="{{(newissue.emailerror)?'error':''}}">Email Address
				<input type="email" class="error" name="email" ng-model="newissue.email" required/>
				</label>
				<small class="error" ng-show="userForm.$error.email">Invalid entry</small>				
			</div>
			<div class="small-6 columns">
				<label>Phone #</label>
				<input type="text" ng-model="newissue.phone" required />			
			</div>
		</div>
		<div class="row">
			<div class="small-5 columns">
				<label>First Name</label>
				<input type="text" ng-model="newissue.fname" required />
			</div>
			<div class="small-5 columns">
				<label>Last Name</label>
				<input type="text" ng-model="newissue.lname" required />
			</div>
			<div class="small-2 columns">
				<label>Initial
				<input type="text" ng-model="newissue.initial" />
				</label>	
			</div>
		</div>
		<div class="row">
			<div class="small-5 columns">
				<label>Is this a house call? {{(newissue.housecall)?"Yes":"No"}}</label>
				<div class="switch">
				  <input id="exampleCheckboxSwitch" type="checkbox" ng-model="newissue.housecall" ng-init="newissue.housecall=false">
				  <label for="exampleCheckboxSwitch"></label>
				</div> 
			
				
			</div>
			<fieldset class="small-7 columns">
			<legend >Address:</legend>
			
				<label>Address 1</label>
				<input type="text" ng-model="newissue.address.address1"/>
				
				<label>Address 2</label>
				<input type="text" ng-model="newissue.address.address2"/>
				<div class="row">
					<div class="small-7 columns">
						<label>City</label>
						<input type="text" ng-model="newissue.address.city"/>
					</div>
					<div class="small-2 columns">
						<label>State</label>
						<input type="text" ng-model="newissue.address.state"/>
					</div>
					<div class="small-3 columns">
						<label>Zipcode</label>
						<input type="text" ng-model="newissue.address.zipcode"/>
					</div>
				</div>
		
			</fieldset>
		</div>
	
	
		<label>Problem Description</label>
		<textarea ng-model="newissue.description"></textarea>
		<button type="submit" class="tiny">
			Submit
		</button>
	</div>

</div></form>
					`,
		controller : ['$scope', '$compile', '$http', '$rootScope','$timeout',
		function($scope, $compile, $http, $root, $timeout) {
			$scope.newissue = {};
			$scope.resetErrors = function(){
				$scope.newissue.emailerror = false;
            	$scope.newissue.phoneerror = false;
            	$scope.newissue.fname = false;
            	$scope.newissue.lname = false;
			}
			
            $scope.onClickSubmit= function(isValid){
            	$scope.resetErrors();
            	if(isValid){
            		//$scope.newissue.createdby = 
            		//$scope.newissue.createdon = 
            		
            		$http({
            				method : "POST",
            				url : "php/techtoolsapp.php?action=createissue",
            				data : $.param($scope.newissue),
            				headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            			}).then(function(msg){
	            		if(msg.data.id){
	            			
	            		}
	            		else{
	            			alert("failed");
	            		}
	            	});
            	}
            	
            	
            }
        }]
    }
}).controller('ItemCheckinCtrl', ['$scope', function($scope) {
	$scope.item = [];
	$scope.removeItem = function(){
		if(this.itm){
			var item = this.$parent.item;
			var selectedItem = this.itm;
	  		angular.forEach(item, function(obj, index){
			    if (obj.$$hashKey === selectedItem.$$hashKey) {			    
			      item.splice(index, 1);
			      return;
			    };
			  });
		}
	}
}]);