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
      <footer>
        <span class="tweet-age">${new Date(
          tweetData.created_at
        ).toDateString()}</span>
        <section class="tweet-actions">
          <i class="flag material-icons md-18">flag</i>
          <i class="retweet material-icons md-18">repeat</i>
          <i class="like material-icons md-18">favorite</i>
        </section>
      </footer>
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
  const $errorMessage = $('.new-tweet .alert');
  const $characterCounter = $('#tweet-form .counter');

  // Validate a tweet's content, returning true if it is valid.
  // TODO: Use setCustomValidity?
  function validate(content) {
    if (!content) {
      // Error: You cannot post an empty tweet!
      $errorMessage.text('Error: You cannot post an empty tweet!');
      $errorMessage.show();
      return false;
    } else if (content.length > 140) {
      // Error: Tweet is too long!
      $errorMessage.text('Error: Tweet is too long!');
      $errorMessage.show();
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
    $characterCounter.text(140);
    $characterCounter.removeClass('limit-exceeded');
  }

  // Post tweet to db
  $form.submit(event => {
    event.preventDefault();
    const serialData = $form.serialize();

    // Hide error message
    $errorMessage.hide();

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
  // TODO: Do this filtering on the mongo side to reduce data
  function loadTweets() {
    $.get('/tweets', data => {
      const newData = data.filter(tweet => tweet.created_at > lastFetched);
      lastFetched = Date.now();
      renderTweets(newData);
    });
  }

  //Start with new tweet form hidden
  const $newTweet = $('.new-tweet');
  $newTweet.hide();
  // Load initial tweets
  loadTweets();

  // Form toggle
  const $composeButton = $('#compose-btn');
  $composeButton.on('click', function() {
    $newTweet.slideToggle(400);
    // TODO: Blur when collapsing?
    $formText.focus();
  });

  // User authentication
  // Login Modal
  const $loginButton = $('#login-btn');
  const $loginModal = $('#login');
  const $loginForm = $('#login form');
  $loginModal.hide();
  // Show modal
  $loginButton.on('click', function() {
    $loginModal.show();
  });
  // Hide modal on click away
  $loginModal.on('click', function(event) {
    if ($(event.target).is($loginModal)) {
      $loginModal.hide();
    }
  });
  // Post login override
  $loginForm.submit(event => {
    event.preventDefault();
    const serialData = $loginForm.serialize();
    // TODO: Change this to PUT
    $.post('/login', serialData, () => {
      console.log('Logged in!');
      // Handle login ui changes
      updateLocalUserData(() => {
        setNavbarForLoggedIn(true);
      });
    });
  });

  // Register Modal
  const $registerButton = $('#register-btn');
  const $registerModal = $('#register');
  const $registerForm = $('#register form');
  $registerModal.hide();
  // Show modal
  $registerButton.on('click', function() {
    $registerModal.show();
  });
  // Hide modal on click away
  $registerModal.on('click', function(event) {
    if ($(event.target).is($registerModal)) {
      $registerModal.hide();
    }
  });

  // Logout
  const $logoutButton = $('#logout-btn');
  $logoutButton.on('click', function() {
    // TODO: Change this to PUT
    $.post('/logout', () => {
      console.log('Logged out!');
      // Handle logout ui changes
      updateLocalUserData(() => {
        setNavbarForLoggedIn(false);
      });
    });
  });

  // UI helpers
  // Change page for a logged-in user
  function setNavbarForLoggedIn(isLoggedIn) {
    if (isLoggedIn) {
      $loginButton.hide();
      $registerButton.hide();
      $composeButton.show();
      $logoutButton.show();
      $loginModal.hide();
      $registerModal.hide();
    } else {
      $loginButton.show();
      $registerButton.show();
      $composeButton.hide();
      $logoutButton.hide();
      $loginModal.hide();
      $registerModal.hide();
    }
  }

  function updateLocalUserData(callback) {
    $.getJSON('/login/validate-cookie', user => {
      if (user.handle) {
        // User is logged in
        // TODO: Is there somewhere better to attach this data?
        console.log('Cookie is valid');
        $(document).data('user', user);
      } else {
        // Not logged in
        console.log('Cookie is invalid');
        $(document).removeData('user');
      }
      callback();
    });
  }

  // Check on page load if cookie is valid
  // FIXME: This is a mess
  updateLocalUserData(() => {
    console.log('Verify cookie on page load');
    if ($(document).data('user')) {
      setNavbarForLoggedIn(true);
    } else {
      setNavbarForLoggedIn(false);
    }
  });
});
