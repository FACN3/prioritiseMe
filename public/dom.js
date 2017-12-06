function dom(err, res) {
  domUsers(err, res);
  domTable(err, res);
}

(function init() {
  fetch('/getData', dom);
})();

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
  if (err) {
    console.log('domUsers error with ', err);
  }
  // res.reduce(function(acc, i) {});
  // res.forEach(function(e) {});
}
function domTable(err, res) {
  if (err) {
    console.log('error with ', err);
  }
  console.log(res);
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
