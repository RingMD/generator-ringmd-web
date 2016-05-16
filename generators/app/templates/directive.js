angular.module('<%= name %>.directive', [])

.directive('<%= _camelizedName %>', [
  function() {
    return {

      restrict: 'E',

      scope: {},

      templateUrl: '<%= _basePath %>.directive.html',

      link: function link(scope, el, attrs) {}

    };
  }
])

;