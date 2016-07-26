angular.module('<%= name %>.ctrl', [])
<% var configName = _upperCamelizedName + 'Config' %>
.controller('<%= _upperCamelizedName %>Ctrl', [
  '$scope',<% if (isConfigurable) { %> '<%= configName %>',<% } %>
  function($scope<% if (isConfigurable) { %>, <%= configName %><% } %>) {
    var vm = $scope.getVM(this);

    return vm;
  }
])

;