angular.module('<%= name %>', [
  <%= JSON.stringify(_modules, null, 2).replace(/"/g, '\'') %>
])

;