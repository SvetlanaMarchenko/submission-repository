const Blog = ({ blog, children }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
      </div>
      {blog.author && (
        <div>
          {blog.author}
        </div>
      )}
      {blog.url && (
        <div>
          {blog.url}
        </div>
      )}
      {blog.likes && (
        <div>
          {blog.likes}
        </div>
      )}

      <div>
        {children}
      </div>
    </div>
  )
}

export default Blog
