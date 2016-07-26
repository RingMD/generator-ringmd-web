angular.module('<%= name %>.ctrl', [])

.controller('<%= _upperCamelizedName %>Ctrl',
  function($scope<% if (isConfigurable) { %>, <%= _upperCamelizedName %>Config<% } %>) {
    var vm = $scope.getVM(this);

    return vm;
  })

;