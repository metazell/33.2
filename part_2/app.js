const deckBaseURL = "https://deckofcardsapi.com/api/deck";
let deckId = null;

$(document).ready(function() {
  // Create a new deck on page load
  $.getJSON(`${deckBaseURL}/new/shuffle/`).then(data => {
    deckId = data.deck_id;
    $("#draw-card-btn").prop("disabled", false);  // Enable the draw button
  });

  // Event listener for the draw button
  $("#draw-card-btn").on("click", function() {
    $.getJSON(`${deckBaseURL}/${deckId}/draw/?count=1`).then(data => {
      let card = data.cards[0];
      let cardImg = `<img src="${card.image}" alt="${card.value} of ${card.suit}">`;
      let $card = $(cardImg).appendTo("#card-container");

      // Apply random rotation to the card
      let randomAngle = Math.floor(Math.random() * 90) - 45; // Rotate between -45 and 45 degrees
      $card.css("transform", `translate(-50%, -50%) rotate(${randomAngle}deg)`);

      // Disable the button if no cards are left
      if (data.remaining === 0) {
        $("#draw-card-btn").prop("disabled", true);
        $("#draw-card-btn").text("No more cards");
      }
    });
  });
});
