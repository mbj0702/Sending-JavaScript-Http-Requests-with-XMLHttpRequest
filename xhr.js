const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

// third argument is only passed in for sendData method
const sendHttpRequest = (method, url, data) => {
  // marks the Promise object as resolved or rejected
  const promise = new Promise((resolve, reject) => {

    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    // response is parsed from json to javascript data for us
    xhr.responseType = 'json';

    // signals that we are appending json data
    if (data) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }

    // alternative
    // xhr.onload = function() {}
    xhr.onload = () => {

      // forwards the responseBody but rejects the promise hence producing an error in the promise chain,
      // and the error ends up in catch (in the sendData method)
      if(xhr.status >= 400) {
        reject(xhr.response);
      } else {
        // marks the Promise object as resolved and passes xhr.response along with this resolve event
        // so that we can use it when we use the then method on our promise
        // now in getData we can add then method after sendHttpRequest method
        resolve(xhr.response);
      }


/*      // this block of code is removed after initializing Promise object
      // gets the parsed and converted JavaScript objects and data
      const data = xhr.response;

      /!*    // directly gets JSON and changes it to JavaScript data
          // const data = JSON.parse(xhr.response);*!/
      console.log(data);

      // prints out json
      // console.log(xhr.response);*/

    }; // end xhr.onload

    xhr.onerror = () => {
      reject('Something went wrong!');
    };

    // converts JavaScript objects to json data
    xhr.send(JSON.stringify(data));
  }); // end promise
  return promise;

}; // end sendHttpRequest

const getData = () => {
  // gets responseData so that we can use that in then block
  sendHttpRequest('GET', 'https://reqres.in/api/users').then(responseData => {
    console.log(responseData);

  });

}; // end getData


const sendData = () => {
  // passes in JavaScript data
  sendHttpRequest('POST', 'https://reqres.in/api/register', {
    email: 'eve.holt@reqres.in',
    password: 'pistol'
  }).then(responseData => {
    console.log(responseData);
  }).catch(err => {
    console.log(err);
  });
};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);
