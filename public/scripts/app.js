/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
        ${tweetData.content.text}
      </p>
      <footer><span class="tweet-age">${new Date(
        tweetData.created_at
      ).toDateString()}</span></footer>
    </article>
  `;
}

$(document).ready(function() {
  const $tweetsContainer = $('#tweets-container');
  const $form = $('#tweet-form');
  const $formText = $('#tweet-form > textarea');
  /*
   * Loop through tweets, calling createTweetElement for each tweet and appends
   * it to the tweets container
   */
  function renderTweets(tweets) {
    tweets.forEach(tweet => {
      $tweetsContainer.append(createTweetElement(tweet));
    });
  }

  // Post tweet to db
  $form.submit(event => {
    event.preventDefault();
    const serialData = $form.serialize();

    // Validation
    const tweet = {
      content: $formText[0].value
    };
    if (validate(tweet)) {
      $formText.value = '';
      $.post('/tweets', serialData, () => {
        console.log('Posted tweet');
        loadTweets();
      });
    }
  });

  // Validate a tweet, returning true if the tweet is valid.
  // TODO: is there a better way using serial data as input?
  function validate(tweet) {
    if (!tweet.content) {
      alert('Error: You cannot post an empty tweet!');
      return false;
    } else if (tweet.content.length > 140) {
      alert('Error: Tweet is too long!');
      return false;
    }

    return true;
  }

  // Get tweets from db and pass them into renderTweets
  /*
   * TODO: Get only new tweets or else make renderTweets clear old tweets
   * before rerendering
   */
  function loadTweets() {
    $.get('/tweets', data => {
      renderTweets(data);
    });
  }

  loadTweets();
});
