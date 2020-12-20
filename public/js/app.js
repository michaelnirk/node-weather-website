console.log('Client side!!');


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let location = search.value;
  if (!location) {
    return alert('Please enter a location.');
  }
  p1.textContent = 'Loading...';
  p2.textContent = '';
  location = encodeURIComponent(location);
  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.hasOwnProperty('error')) {
        p1.textContent = data.error;
      } else {
        p1.textContent = data.location;
        p2.textContent = data.forecast;
      }
    })
  });  
})