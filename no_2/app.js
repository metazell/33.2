// Function to generate a random number between min and max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate an array of 3 random numbers between 1 and 100
const randomNumbers = Array.from({ length: 3 }, () => getRandomNumber(1, 100));
const url = `http://numbersapi.com/${randomNumbers.join(',')}?json`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const factsContainer = document.createElement('div');
    for (let num in data) {
      const fact = document.createElement('p');
      fact.textContent = `Fact about ${num}: ${data[num]}`;
      factsContainer.appendChild(fact);
    }
    document.body.appendChild(factsContainer);
  })
  .catch(error => console.error('Error:', error));
