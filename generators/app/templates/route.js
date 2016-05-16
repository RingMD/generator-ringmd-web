angular.module('<%= name %>.route', [])

.config([
  '$routeProvider',
  function($routeProvider) {
    $routeProvider.when(PathProvider.get('<%= name %>_path'), {
      title: '<%= _upperCamelizedName %>',
      templateUrl: '<%= _basePath %>.controller.html',
      controller: '<%= _upperCamelizedName %>Ctrl',
      controllerAs: 'vm',
      security: 'requireAuthenticated',
      resolve: {}
    });
  }
])

;