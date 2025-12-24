---
layout: default
title: Speaking
permalink: /speaking/
---

<ul class="posts">
  <li class="posts-labelgroup" id="posts-labelgroup">
    <h1 id="posts-label">
      <a class="posts-home-link" href="{{ "/" | relative_url }}">Posts</a>
      <span class="posts-label-sep">·</span>
      <a class="posts-speaking-link" href="{{ "/speaking/" | relative_url }}">Talks</a>
    </h1>
  </li>

  {% if site.plainwhite.speaking and site.plainwhite.speaking != empty %}
    {% for talk in site.plainwhite.speaking %}
    <li class="post-item">
      <a class="post-link" href="{{ talk.url }}" target="_blank" rel="noopener noreferrer">
        <h2 class="post-title">{{ talk.title }}</h2>
      </a>
    </li>
    {% endfor %}
  {% else %}
    <li class="post-item">
      <p>No talks yet.</p>
    </li>
  {% endif %}
</ul>
