import React, { useState } from "react"
import blogService from "../services/blogs"
import PropTypes from "prop-types"

const Blog = ({ blog, setBlogs, blogs, user }) => {
  const [blogHidden, setBlogHidden] = useState(false)

  const toggleHidden = () => {
    setBlogHidden(!blogHidden)
   
  }

  const addLike = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: {
        id: blog.user.id,
        name: blog.user.name,
        username: blog.user.username
      }
    }

    try {
      const response = await blogService.update(blog.id, updatedBlog)

      response.user = {
        id: response.user,
        name: blog.user.name,
        username: blog.user.name
      }
      const filterBlog = blogs.filter(x => x.id !== response.id)
      const allBlogs = filterBlog.concat(response)
      setBlogs(allBlogs.sort((a, b) => (a.likes < b.likes ? 1 : -1)))
    } catch (error) {
      console.log("like failed")
    }
  }

  const removeBlog = async () => {
    if (
      window.confirm(
        `Are you sure you want to remove ${blog.title} by ${blog.author}?`
      )
    ) {
      try {
        await blogService.remove(blog.id)
        const filteredBlogs = blogs.filter(x => x.id !== blog.id)
        setBlogs(filteredBlogs)
      } catch (error) {
        console.log("failed to remove blog")
      }
    }
  }

  const closeWhenHidden = { display: blogHidden ? "none" : "" }
  const openWhenHidden = {
    display: blogHidden ? "" : "none",
    border: "2px solid black",
    padding: "3px",
    margin: "3px"
  }

  const showRemoveButton = {
    display: blog.user.username === user.username ? "" : "none"
  }

  return (
    <div>
      <div style={closeWhenHidden}>
        {blog.title} {blog.author}{" "}
        <button onClick={() => toggleHidden()}>show</button>
      </div>

      <div style={openWhenHidden}>
        {blog.title} <button onClick={() => toggleHidden()}>hide</button>
        <br />
        {blog.author} <br />
        {blog.url} <br />
        likes {blog.likes} <button onClick={() => addLike()}>like</button>{" "}
        <br />
        added by: {blog.user.name} <br />
        <div style={showRemoveButton}>
          <button onClick={() => removeBlog()}>Remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
export default Blog
