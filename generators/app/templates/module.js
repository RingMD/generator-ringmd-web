angular.module('<%= name %>', [
<% for (var module in _modules) { %>
  '<%= module %>'
<% } %>
])

;