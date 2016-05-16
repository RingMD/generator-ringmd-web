angular.module('<%= name %>', [
<% for (let module in _modules) { %>
  '<%= module %>'
<% } %>
])

;