const dummy = (blogs) => {};

/**
 * gets totalLikes
 * @param {object[]} blogs blogs to parse
 */
const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + Number(blog.likes);

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

module.exports = { dummy, totalLikes };
