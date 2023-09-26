const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
  const oneBlog = [
    {
      title: "test0",
      author: "Edsger W. Dijkstra",
      likes: 12
    }
  ]
  const manyBlog = [
    {
      title: "test1",
      author: "Edsger W. Dijkstra",
      likes: 12
    },
    {
      title: "test2",
      author: "Edsger W. Dijkstra",
      likes: 13
    },
    {
      title: "test3",
      author: "Edsger W. Dijkstra",
      likes: 14
    }
  ]

  const noBlog = []

  test('One blog', () => {
    const result = listHelper.favoriteBlog(oneBlog)
    expect(result).toEqual(oneBlog[0]) 
  })
  test('No blogs', () => {
    const result = listHelper.favoriteBlog(noBlog)
    expect(result).toEqual(null) 
  })
  test('Two and more blogs', () => {
    const result = listHelper.favoriteBlog(manyBlog)
    expect(result).toEqual(manyBlog[2]) 
  })
})
