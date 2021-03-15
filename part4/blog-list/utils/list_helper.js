const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, currentValue) => sum + currentValue.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, currentBlog) => (prev.likes > currentBlog.likes) ? prev : currentBlog)
}

module.exports = { dummy, totalLikes, favoriteBlog };
