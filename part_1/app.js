let favNumber = 25; // Assign a value to favNumber
let baseURL = "http://numbersapi.com";

// 1. Single Fact
$.getJSON(`${baseURL}/${favNumber}?json`).then(data => {
  console.log(data);
  $("body").append(`<p>${data.text}</p>`); // Optional: Display on the page
});

// 2. Multiple Numbers
let favNumbers = [25, 2017, 2020];
$.getJSON(`${baseURL}/${favNumbers}?json`).then(data => {
  console.log(data);
  for (let num in data) {
    $("body").append(`<p>${num}: ${data[num]}</p>`); // Optional: Display on the page
  }
});

// 3. Multiple Facts about the Favorite Number
Promise.all(
  Array.from({ length: 4 }, () => {
    return $.getJSON(`${baseURL}/${favNumber}?json`);
  })
).then(facts => {
  facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
});
