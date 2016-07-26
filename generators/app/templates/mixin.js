angular.module('<%= name %>.mixin', [])

/*
  NOTE:
  The current mixin implementation requires manual DI annotation
  because it's effectively an Array to be called thru $injector.invoke()
  See `$rootScope.getVM` in ringmd.module.js
*/
.value('<%= _upperCamelizedName %>Mixin', [
  function() {
    return {};
  }
])

;