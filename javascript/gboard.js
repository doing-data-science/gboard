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
    var url = `//api.github.com/orgs/${orgs}/events?page=1&per_page=50`;
    var res = [];
    ajax(url, data => {
      data = JSON.parse(data);
      var html = `
        <a href="//github.com/${orgs}">
          <h2>${orgs}</h2>
        </a>
      `;
      data.forEach(item => {
        if (!!~res.indexOf(item)) {
          return;
        }
        res.push(item.repo.name);
      });
      data = data.slice(0, 30);
      data.forEach(item => {
        var url = item.repo.url || '';
        html += `
          <li title="${item.repo.name}" class="">
            <a href="${url.replace('api.', '').replace('/repos', '')}">
              ${item.repo.name.split('/')[1]}
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
