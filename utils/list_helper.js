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

const mostBlogs = (blogs) => {};
const mostLikes = (blogs) => {};

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes };
