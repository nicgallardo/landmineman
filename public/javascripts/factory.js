app.factory('pop', ['$window', function() {
  return function (div) {
      document.getElementById(div).style.display = 'block';
    }
 }]);
 
app.factory('hide', ['$window', function() {
  return function (div) {
      document.getElementById(div).style.display = 'none';
    }
 }]);
