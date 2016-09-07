angular.module('<%= name %>.route', [])

.config(
  function(UrlProvider) {
    UrlProvider.when('<%= name %>_path', {
      title: function title($injector) {
        return $injector.get('I18n').gettext('<%= _upperCamelizedName %>');
      },
      templateUrl: '<%= _templatePath %>.ctrl.html',
      controller: '<%= _upperCamelizedName %>Ctrl',
      controllerAs: 'vm',
      security: 'requireAuthenticated',
      resolve: {
        /*@ngAnnotate*/
      }
    });
  })

;