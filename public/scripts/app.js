/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Tracks the time of the last tweet fetch.
let lastFetched = new Date(0);

// Create and return a DOM element representing a tweet article
// TODO: Create function to better parse the date or use moment.js
function createTweetElement(tweetData) {
  return `
    <article class="tweet">
      <header>
        <img
          src="${tweetData.user.avatars.small}"
          class="tweeter-avatar"
        />
        <div class="baseline-align-text">
          <h2 class="tweeter-name">${tweetData.user.name}</h2>
          <span class="tweeter-handle">${tweetData.user.handle}</span>
        </div>
      </header>
      <p class="tweet-content">
        ${escape(tweetData.content.text)}
      </p>
      <footer><span class="tweet-age">${new Date(
        tweetData.created_at
      ).toDateString()}</span></footer>
    </article>
  `;
}

// Escape input text.
// FIXME: encodeURIComponent on post?
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// Get and post tweets
$(function() {
  const $tweetsContainer = $('#tweets-container');
  const $form = $('#tweet-form');
  const $formText = $('#tweet-form > textarea');
  const $tweetEmpty = $('#tweet-empty');
  const $tweetTooLong = $('#tweet-too-long');
  const $characterCounter = $('#tweet-form .counter');

  // Validate a tweet's content, returning true if it is valid.
  // TODO: Use setCustomValidity?
  function validate(content) {
    if (!content) {
      // Error: You cannot post an empty tweet!
      $tweetEmpty.show();
      return false;
    } else if (content.length > 140) {
      // Error: Tweet is too long!
      $tweetTooLong.show();
      return false;
    }
    return true;
  }

  /*
   * Loop through tweets, calling createTweetElement for each tweet and appends
   * it to the tweets container
   */
  function renderTweets(tweets) {
    tweets.forEach(tweet => {
      $tweetsContainer.prepend(createTweetElement(tweet));
    });
  }

  // Reset char counter for when a form is submitted
  function resetCharacterCounter() {
    console.log($characterCounter);
    $characterCounter.text(140);
    $characterCounter.removeClass('limit-exceeded');
  }

  // Post tweet to db
  $form.submit(event => {
    event.preventDefault();
    const serialData = $form.serialize();

    // Hide all error messages
    $tweetEmpty.hide();
    $tweetTooLong.hide();

    // Validation
    if (validate($formText.val())) {
      $formText.val('');
      // Make sure the char counter is reset
      resetCharacterCounter();
      $.post('/tweets', serialData, () => {
        loadTweets();
      });
    }
  });

  // Get new tweets from db and pass them into renderTweets
  function loadTweets() {
    $.get('/tweets', data => {
      const newData = data.filter(tweet => tweet.created_at > lastFetched);
      lastFetched = Date.now();
      renderTweets(newData);
    });
  }

  loadTweets();

  // Form toggle
  const $composeButton = $('#compose-btn');
  const $newTweet = $('.new-tweet');
  $composeButton.on('click', function() {
    $newTweet.slideToggle(400);
    // TODO: Blur when collapsing?
    $formText.focus();
  });
});
