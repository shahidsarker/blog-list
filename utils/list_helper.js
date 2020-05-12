const _ = require("lodash");

/**
 * gets totalLikes
 * @param {object[]} blogs blogs to parse
 */
const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + Number(blog.likes);

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

/**
 * Returns blog with most likes
 * @param {object[]} blogs list blogs to parse
 */
const favoriteBlog = (blogs) => {
  if (!blogs.length) return null;
  let max = 0;
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > blogs[max].likes) {
      max = i;
    }
  }

  return blogs[max];
};

const mostBlogs = (blogs) => {
  let max = null;
  const count = {};
  _.forEach(blogs, (blog) => {
    const { author } = blog;
    if (!count[author]) count[author] = 0;

    count[author]++;
    if (count[author] > count[max] || !max) max = author;
  });

  return max !== null ? { author: max, blogs: count[max] } : null;
};

const mostLikes = (blogs) => {
  let max = null;

  const count = {};

  _.forEach(blogs, (blog) => {
    const { author, likes } = blog;
    if (!count[author]) count[author] = 0;
    if (likes) count[author] += likes;
    if (count[author] > count[max] || !max) max = author;
  });

  return max !== null ? { author: max, likes: count[max] } : null;
};

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes };
