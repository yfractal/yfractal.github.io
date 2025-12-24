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
    if (postsLabel && hash) {
      postsLabel.textContent = 'posts: ' + hash;
    } else if (postsLabel) {
      postsLabel.textContent = 'posts';
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

