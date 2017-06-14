function getCurrentPosition() {
  return new Promise(function(fulfill, reject) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        fulfill(position.coords.latitude);
      },
      function(error) {
        reject(error.message);
      }
    );

    //1-Line implementation of above code
    //navigator.geolocation.getCurrentPosition(fulfill, reject);
  });
}

getCurrentPosition()
  .then(function(loc) {
    console.log(loc);
  })
  .catch(function(error) {
    console.error(error);
  });


function getCurrentPosition() {
  return new Promise(function(fulfill, reject) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        fulfill(position.coords.latitude);
      },
      function(error) {
        reject(error.message);
      }
    );
  });
}

//With Babel JS
getCurrentPosition()
  .then(function(loc) {
    console.log(loc);
  })
  .catch(function(error) {
    console.error(error);
  });

async function main() {
  try {
    var data = await getCurrentPosition();
    console.log("Async/Await");
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}
