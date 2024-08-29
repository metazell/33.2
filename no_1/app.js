fetch('http://numbersapi.com/9?json') // Step 1: Make the request
  .then(response => response.json())  // Step 2: Extract JSON data from the response
  .then(data => {                     // Step 3: Process the received data
    console.log(data.text);           // Output the fact to the console
  })
  .catch(error => console.error('Error:', error)); // Step 4: Handle any errors
