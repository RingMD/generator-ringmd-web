angular.module('<%= name %>.config', [])

.provider('<%= _upperCamelizedName %>Config', function() {
  this.$get =
    function $get() {
      return {};
    };
})

;