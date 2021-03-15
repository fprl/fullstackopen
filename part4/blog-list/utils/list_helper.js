const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce(
    (sum, currentValue) => sum + currentValue.likes
    , 0
  )
}

module.exports = { dummy, totalLikes }
