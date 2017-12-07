(function init() {
  fetch('/getDataAll', dom);
})();

function getUserIdFromSelect() {
  // var targetIdex = e.currentTarget.selectedIndex;
  // return e.currentTarget.options[targetIdex].id;
}

function dom(err, res) {
  if (
    (res.data != null && res.data.length != null && res.data.length > 0) ||
    (res.users != null && res.users.length != null && res.users.length > 0)
  ) {
    domUsers(err, res);
    domTable(err, res);
  } else if (res.success) {
    fetch('/getData?user=' + getUserIdFromSelect(), function(err, res) {
      domTable(err, res);
    });
  } else {
    //handle error
  }
}
function fetch(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status !== 200) {
      callback(xhr.responseText);
    } else if (xhr.readyState == 4 && xhr.status === 200) {
      callback(null, JSON.parse(xhr.responseText));
    }
  };
  xhr.open('GET', url);
  xhr.send();
}
function domUsers(err, { users }) {
  if (err) {
    console.log('domUsers error with ', err);
  }

  var dropdown = document.querySelector('select');
  dropdown.textContent = '';
  var option = document.createElement('option');
  option.textContent = 'ALL';
  option.setAttribute('value', 'ALL');
  dropdown.appendChild(option);
  users.forEach(function(e) {
    var option = document.createElement('option');
    option.setAttribute('value', e.name);
    option.setAttribute('id', e.id);
    option.textContent = e.name;
    dropdown.appendChild(option);
  });
}

function domTable(err, { data }) {
  if (err) {
    console.log('error with ', err);
  }

  var table = document.getElementById('table');
  while (table.childNodes.length > 2) {
    table.removeChild(table.lastChild);
  }
  data.forEach(function(item) {
    var trDescription, trPriority, trFinished, trStarted, trName;
    var tr = document.createElement('tr');
    tr.setAttribute('class', 'table-item');
    trDescription = document.createElement('td');
    trPriority = document.createElement('td');
    trFinished = document.createElement('td');
    trStarted = document.createElement('td');
    trName = document.createElement('td');
    if (item.description) {
      trDescription.textContent = item.description;
    }
    if (item.priority) {
      trPriority.textContent = item.priority;
    }
    if (item.time_finished) {
      trFinished.textContent = item.time_finished;
    }
    if (item.time_started) {
      trStarted.textContent = item.time_started;
    }
    if (item.name) {
      trName.textContent = item.name;
    }
    tr.appendChild(trDescription);
    tr.appendChild(trPriority);
    tr.appendChild(trFinished);
    tr.appendChild(trStarted);
    tr.appendChild(trName);
    table.appendChild(tr);
  });
}
document.querySelector('#users').addEventListener('change', function(e) {
  e.preventDefault();
  fetch('/getData?user=' + getUserIdFromSelect(), domTable);
});

document.querySelector('.form').addEventListener('submit', function(e) {
  e.preventDefault();
  var user = document.querySelector('#users').value;
  var description = document.querySelector('#description').value;
  var priority = document.querySelector('#priority').value;
  if (!description || !priority) {
    alert('Please enter both fields correctly');
  }
  fetch(
    '/postData?description=' +
      description +
      '&priority=' +
      priority +
      '&user=' +
      user,
    dom
  );
});