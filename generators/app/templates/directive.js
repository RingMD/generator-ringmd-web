angular.module('<%= name %>.directive', [])

.directive('<%= _camelizedName %>', [
  function() {
    return {

      restrict: 'E',

      templateUrl: '<%= _basePath %>.directive.html',
      <% if (hasController) { %>
      scope: true,

      controller: '<%= _upperCamelizedName %>Ctrl',

      controllerAs: 'vm',

      bindToController: {}
      <% } else { %>
      scope: {},

      link: function link(scope, el, attrs) {}
      <% } %>
    };
  }
])

;