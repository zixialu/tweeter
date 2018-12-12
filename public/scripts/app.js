/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Create and return a DOM element representing a tweet article
// TODO: Create function to parse the date into a descriptive string
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

/*
 * Loops through tweets, calling createTweetElement for each tweet and appends
 * it to the tweets container
 */
function renderTweets(tweets) {
  const $tweetsContainer = $('#tweets-container');
  tweets.forEach(tweet => {
    $tweetsContainer.append(createTweetElement(tweet));
  });
}

// FIXME: Remove this later
// Fake data taken from tweets.json
const data = [
  {
    user: {
      name: 'Newton',
      avatars: {
        small: 'https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png',
        regular: 'https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png',
        large: 'https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png'
      },
      handle: '@SirIsaac'
    },
    content: {
      text:
        'If I have seen further it is by standing on the shoulders of giants'
    },
    created_at: 1461116232227
  },
  {
    user: {
      name: 'Descartes',
      avatars: {
        small: 'https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png',
        regular: 'https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png',
        large: 'https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png'
      },
      handle: '@rd'
    },
    content: {
      text: 'Je pense , donc je suis'
    },
    created_at: 1461113959088
  },
  {
    user: {
      name: 'Johann von Goethe',
      avatars: {
        small: 'https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png',
        regular: 'https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png',
        large: 'https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png'
      },
      handle: '@johann49'
    },
    content: {
      text: 'Es ist nichts schrecklicher als eine tätige Unwissenheit.'
    },
    created_at: 1461113796368
  }
];

renderTweets(data);
