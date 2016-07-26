angular.module('<%= name %>.service', [])

// please read
// http://blog.thoughtram.io/angular/2015/07/07/service-vs-factory-once-and-for-all.html
.service('<%= _upperCamelizedName %>', [
  function() {
    angular.extend(this, {});
  }
])

;