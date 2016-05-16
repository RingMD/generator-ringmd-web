angular.module('<%= name %>', [
<% _modules.forEach(function(module) { %>
  '<%= module %>'
<% }); %>
])

;