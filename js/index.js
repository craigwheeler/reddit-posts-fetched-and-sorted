'use strict';

var Reddit = React.createClass({
  displayName: 'Reddit',

  // sets the initial state of the data
  getInitialState: function getInitialState() {
    return {
      posts: []
    };
  },

  // fetch data on page load
  componentWillMount: function componentWillMount() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.reddit.com/');
    xhr.addEventListener('readystatechange', this.onReadyStateChange);
    xhr.send();
  },

  // verify response
  onReadyStateChange: function onReadyStateChange(e) {
    var xhr = e.target;
    if (xhr.readyState == 4) {
      var res = JSON.parse(xhr.responseText);
      this.setState({
        posts: res.data.children
      });
    }
  },

  // sort data based on upvotes
  sortPosts: function sortPosts() {
    this.setState(this.state.posts.sort(function (a, b) {
      return b.data.ups - a.data.ups;
    }));
  },

  // renders component to virtual DOM
  render: function render() {
    return React.createElement(
      'section',
      null,
      React.createElement(
        'h3',
        null,
        'Posts fetched using API and sorted in descending order by upvotes'
      ),
      React.createElement(
        'ol',
        null,
        this.sortPosts(),
        this.state.posts.map(function (post) {
          return React.createElement(
            'li',
            null,
            React.createElement(
              'span',
              null,
              'Upvotes:'
            ),
            ' ',
            post.data.ups,
            React.createElement('br', null),
            React.createElement(
              'span',
              null,
              'Author:'
            ),
            ' ',
            post.data.author,
            React.createElement('br', null),
            React.createElement(
              'span',
              null,
              'Title:'
            ),
            ' ',
            post.data.title,
            React.createElement('br', null),
            React.createElement(
              'span',
              null,
              'URL:'
            ),
            ' ',
            post.data.url,
            React.createElement('br', null),
            React.createElement(
              'span',
              null,
              'Permalink:'
            ),
            ' ',
            post.data.permalink,
            React.createElement('hr', null)
          );
        })
      )
    );
  }
});

// displays component to the DOM
ReactDOM.render(React.createElement(Reddit, null), document.getElementById('app'));