(function init() {
  fetch('/getData', dom);
})();

function dom(err, res) {
  domUsers(err, res);
  domTable(err, res);
}
function fetch(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status !== 200) {
      callback(xhr.responseText);
    } else if (xhr.readyState == 4 && xhr.status === 200) {
      console.log(callback(null, JSON.parse(xhr.responseText)));
      callback(null, JSON.parse(xhr.responseText));
    }
  };
  xhr.open('GET', url);
  xhr.send();
}
function domUsers(err, res) {
  // console.log('domUsers res is ', res);
  if (err) {
    console.log('domUsers error with ', err);
  }
  var users = res.reduce(function(acc, i) {
    return acc.includes(i.name) ? acc : acc.concat(i.name);
  }, []);
  var dropdown = document.querySelector('select');
  dropdown.textContent = '';
  users.forEach(function(e) {
    // console.log('users is', users);
    var option = document.createElement('option');
    option.setAttribute('value', e);
    option.textContent = e;
    dropdown.appendChild(option);
  });
}
function domTable(err, res) {
  if (err) {
    console.log('error with ', err);
  }
  res.forEach(function(item) {
    var trDescription, trPriority, trFinished, trStarted, trName;
    var table = document.getElementById('table');
    var tr = document.createElement('tr');
    trDescription = document.createElement('th');
    trPriority = document.createElement('th');
    trFinished = document.createElement('th');
    trStarted = document.createElement('th');
    trName = document.createElement('th');
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

document.querySelector('.form').addEventListener('submit', function(e) {
  e.preventDefault();
  var description = document.querySelector('#description').value;
  var priority = document.querySelector('#priority').value;
  if (!description || !priority) {
    alert('Please enter both fields correctly');
  }
  fetch(
    '/postData?description=' + description + '&priority=' + priority,
    domInit
  );
});
