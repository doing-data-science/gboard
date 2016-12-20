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

  var arr = [
    10..toString(36),
    21..toString(36),
    18..toString(36),
    11..toString(36),
    10..toString(36),
    11..toString(36),
    10..toString(36)
  ];

  var orgs = ['facebook', 'google', 'microsoft', 'mozilla', 'nodejs', arr.join('')];
  orgs.forEach(orgs => {
    var url = `//api.github.com/orgs/${orgs}/repos?page=1&per_page=30`;
    ajax(url, data => {
      data = JSON.parse(data);
      var html = `
        <a href="//github.com/${orgs}">
          <h2>${orgs}</h2>
        </a>
      `;
      data.forEach(item => {
        var lang = item.language && item.language.replace('C++', 'CPP');
        html += `
          <li title="${item.description}" class="${lang}">
            <a href="${item.html_url}">
              ${item.name}
            </a>
          </li>
        `;
      });
      var ol = document.createElement('ol');
      ol.innerHTML = html;
      document.querySelector('#content').appendChild(ol);
    });
  });

})(this);
