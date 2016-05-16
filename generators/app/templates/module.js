angular.module('<%= name %>', [<% _modules.forEach(function(module, i) { %>
  '<%= module %>'<%= i < _modules.length ? ',' : '' %>
<% }); %>])

;