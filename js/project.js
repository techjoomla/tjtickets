var app = angular.module("project", ['ngRoute', 'ngTouch', 'ui.gravatar', 'mobile-angular-ui']);

app.config(function($routeProvider) {
  $routeProvider.when('/', {controller:'CategoriesCtrl', templateUrl:'categories.html'})
				.when('/tickets/:alias', {controller:'TicketsCtrl', templateUrl:'tickets.html'})
				.when('/ticket/:catalias/:alias', {controller:'TicketCtrl', templateUrl:'ticket.html'})
				.when('/my', {controller:'TicketsCtrl', templateUrl:'tickets.html'})
				.otherwise({redirectTo:'/'});
  $rootScope.loadingdelay = false;
});

app.controller("CategoriesCtrl", function($scope, $http, $rootScope) {
  $interval($scope.showDelay, 1000);
  $http({method: 'GET', url: '/support/support-tickets?format=json', cache: true}).
    success(function(data, status, headers, config) {
      $scope.categories = data;
      $rootScope.loading = $rootScope.loadingdelay = false;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
  
  $scope.showDelay() {
    $rootScope.loadingdelay = true;
  }
});

app.controller("TicketsCtrl", function($scope, $http, $routeParams, $rootScope) {
  $rootScope.loading = true;
  if ($routeParams.alias)
    var tickets_url = '/support/support-tickets/'+$routeParams.alias+'?format=json';
  else
    var tickets_url = '/support/support-tickets/?view=my&format=json';
    
  $http.get(tickets_url).
    success(function(data, status, headers, config) {
      $scope.tickets = data;
      $scope.cat_alias = $routeParams.alias;
      $rootScope.loading = false;
      $scope.getClassnameByStatus = function (status) {
		
		switch (status) {
			case 'O':
			classname = 'list-group-item-danger';
			break;
			
			case 'P':
			classname = 'list-group-item-warning';
			break;
			
			case 'C':
			classname = 'list-group-item-success';
			break;
			
			default:
			classname = '';
			break;
		}
		
		return classname;
      }
    }).
    error(function(data, status, headers, config) {
      // log error
    });
});

app.controller("TicketCtrl", function($scope, $http, $routeParams, $rootScope) {
  var ticket_url = '/support/support-tickets/'+$routeParams.catalias+'/'+$routeParams.alias+'?format=json';

  $http.get(ticket_url).
    success(function(data, status, headers, config) {
      $scope.ticket = data;

      var user_url = '/support/support-tickets/?view=jusers&format=json&user_id=';
      user_url += data.created_by;

      $http.get(user_url).
        success(function(userdata, status, headers, config) {
          $scope.user = userdata[0];
        }).
        error(function(userdata, status, headers, config) {
        // log error
        });
    }).
    error(function(data, status, headers, config) {
      // log error
    });
    
    
});

app.controller("PostsCtrl", function($scope, $http, $routeParams, $rootScope) {
  var posts_url = '/index.php?option=com_ats&view=posts&Itemid=174&format=json&ats_ticket_id=';
  posts_url += parseInt($routeParams.alias,10);
   $rootScope.loading = true;
  $http.get(posts_url).
    success(function(data, status, headers, config) {
      $scope.posts = data;
       $rootScope.loading = false;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
});

app.controller("PostCtrl", function($scope, $http, $routeParams) {
  var posts_url = '/index.php?option=com_ats&view=posts&task=saveItemid=174&format=json&ats_ticket_id=';
  posts_url += parseInt($routeParams.alias,10);
  $scope.loading = true;
  $http.get(posts_url).
    success(function(data, status, headers, config) {
      $scope.posts = data;
      $scope.loading = false;      
    }).
    error(function(data, status, headers, config) {
      // log error
    });
});

app.controller("UserCtrl", function($scope, $http, $routeParams, $rootScope) {

});



