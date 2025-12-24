(function() {
  'use strict';

  function filterPostsByCategory() {
    // Get the category from the URL hash (e.g., #jekyll)
    var hash = window.location.hash.substring(1); // Remove the '#'
    var postItems = document.querySelectorAll('.post-item');
    var categoryLinks = document.querySelectorAll('.categories-summary a');

    // Remove active class from all category links
    categoryLinks.forEach(function(link) {
      link.classList.remove('active-category');
    });

    // If no hash, show all posts
    if (!hash) {
      postItems.forEach(function(item) {
        item.style.display = '';
      });
      // Update label to show "posts" (no category filter)
      var postsLabel = document.getElementById('posts-label');
      if (postsLabel) {
        var link = postsLabel.querySelector('a');
        if (link) {
          link.textContent = 'posts';
        } else {
          // Fallback: create link if it doesn't exist
          var rootUrl = document.querySelector('base') ? document.querySelector('base').href : '/';
          postsLabel.innerHTML = '<a href="' + rootUrl + '">posts</a>';
        }
      }
      return;
    }

    // Filter posts by category
    var hasVisiblePosts = false;
    postItems.forEach(function(item) {
      var categories = item.getAttribute('data-categories');
      if (categories) {
        var categoryList = categories.split(',').map(function(cat) {
          return cat.trim().toLowerCase();
        });
        
        if (categoryList.indexOf(hash.toLowerCase()) !== -1) {
          item.style.display = '';
          hasVisiblePosts = true;
        } else {
          item.style.display = 'none';
        }
      }
    });

    // Highlight the active category link
    categoryLinks.forEach(function(link) {
      var href = link.getAttribute('href');
      if (href && href.endsWith('#' + hash)) {
        link.classList.add('active-category');
      }
    });

    // Update the posts label to show filtered category
    var postsLabel = document.getElementById('posts-label');
    if (postsLabel) {
      var link = postsLabel.querySelector('a');
      if (link) {
        // Update the link text while preserving the link structure
        if (hash) {
          link.textContent = 'posts: ' + hash;
        } else {
          link.textContent = 'posts';
        }
      } else {
        // Fallback: if no link exists, create one
        var rootUrl = document.querySelector('base') ? document.querySelector('base').href : '/';
        if (hash) {
          postsLabel.innerHTML = '<a href="' + rootUrl + '">posts: ' + hash + '</a>';
        } else {
          postsLabel.innerHTML = '<a href="' + rootUrl + '">posts</a>';
        }
      }
    }
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', filterPostsByCategory);
  } else {
    filterPostsByCategory();
  }

  // Run when hash changes
  window.addEventListener('hashchange', filterPostsByCategory);
})();

