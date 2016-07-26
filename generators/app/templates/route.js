angular.module('<%= name %>.route', [])

.config(
  function($routeProvider) {
    $routeProvider.when(PathProvider.get('<%= name %>_path'), {
      title: '<%= _upperCamelizedName %>',
      templateUrl: '<%= _basePath %>.ctrl.html',
      controller: '<%= _upperCamelizedName %>Ctrl',
      controllerAs: 'vm',
      security: 'requireAuthenticated',
      resolve: {}
    });
  })

;