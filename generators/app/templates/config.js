angular.module('<%= name %>.config', [])

.provider('<%= _capitalizedName %>Config', function() {
  this.$get = [
    function $get() {
      return {};
    }
  ];
})

;