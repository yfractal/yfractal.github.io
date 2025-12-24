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
        // Only update the "posts" link text; never rewrite innerHTML (so we don't delete the "speaking" link)
        var link = postsLabel.querySelector('a.posts-home-link');
        if (link) link.textContent = 'Posts';
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

    // Keep the posts label as "posts" (don't show category name)
    var postsLabel = document.getElementById('posts-label');
    if (postsLabel) {
      // Only update the "posts" link text; never rewrite innerHTML (so we don't delete the "speaking" link)
      var link = postsLabel.querySelector('a.posts-home-link');
      if (link) link.textContent = 'Posts';
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
