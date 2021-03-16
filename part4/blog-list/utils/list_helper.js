const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, currentValue) => sum + currentValue.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, currentBlog) => (prev.likes > currentBlog.likes) ? prev : currentBlog)
}

const mostBlogs = (blogs) => {
  const mostBlogger = 
    _.countBy(blogs, 'author')
    _.findKey()
    
    
  console.log(mostBlogger);
  
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
