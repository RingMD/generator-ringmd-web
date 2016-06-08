angular.module('<%= name %>.ctrl', [])

.controller('<%= _upperCamelizedName %>Ctrl', [
  '$scope',
  function($scope) {
    var vm = $scope.getVM(this);

    return vm;
  }
])

;