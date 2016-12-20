// gboard demo
'use strict';

(function(global, undefined) {

  var ajax = function(url, successCallback, failCallback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          successCallback(this.responseText);
        } else {
          failCallback();
        }
      }
    };
    request.send();
    request = null;
  };

  var orgs = ['facebook', 'google', 'microsoft', 'nodejs'];
  orgs.forEach(function(orgs) {
    var url = `//api.github.com/orgs/${orgs}/repos?page=1&per_page=30`;
    ajax(url, function(data) {
      data = JSON.parse(data);
      var html = `<h2>${orgs}</h2>`;
      data.forEach(function(item) {
        html += `<li title="${item.description}"><a href="${item.html_url}">${item.name}</a></li>`;
      });
      var ol = document.createElement('ol');
      ol.innerHTML = html;
      document.querySelector('#content').appendChild(ol);
    });
  });

})(this);
