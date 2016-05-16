angular.module('<%= name %>.route', [])

.config([
  '$routeProvider',
  function($routeProvider) {
    $routeProvider.when(PathProvider.get('<%= name %>_path'), {
      title: '<%= name %>',
      templateUrl: '<%= _basePath %>.controller.html',
      controller: '<%= _capitalizedName %>Ctrl',
      controllerAs: 'vm',
      security: 'requireAuthenticated',
      resolve: {}
    });
  }
])

;