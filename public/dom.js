(function init() {
  fetch('/getDataAll', dom);
})();

function dom(err, res) {
  if (res.length != null && res.length > 0) {
    domUsers(err, res);
    domTable(err, res);
  } else if (res.success) {
    fetch('/getData', function(err, res) {
      domUsers(err, res);
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
    var newArr = [];
    return acc.includes(i.user_id)
      ? acc
      : acc.concat({ id: i.user_id, name: i.name });
  }, []);
  var dropdown = document.querySelector('select');
  dropdown.textContent = '';
  var option = document.createElement('option');
  option.textContent = 'ALL';
  option.setAttribute('value', 'ALL');
  dropdown.appendChild(option);
  users.forEach(function(e) {
    // console.log('users is', users);
    var option = document.createElement('option');
    option.setAttribute('value', e.name);
    option.setAttribute('id', e.id);
    option.textContent = e.name;
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
  var user_id = document.querySelector('#users').id;
  fetch('/getData?user=' + user_id, dom);
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
