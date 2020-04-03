import React, { useState } from "react"
const Blog = ({ blog }) => {
  const [blogHidden, setBlogHidden] = useState(false)

  const toggleHidden = () => {
    setBlogHidden(!blogHidden)
  }

  const closeWhenHidden = { display: blogHidden ? "none" : "" }
  const openWhenHidden = {
    display: blogHidden ? "" : "none",
    border: "2px solid black",
    padding: "3px",
    margin: "3px"
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
        likes {blog.likes} <button>like</button> <br />
        added by: {blog.user.name}
      </div>
    </div>
  )
}

export default Blog
