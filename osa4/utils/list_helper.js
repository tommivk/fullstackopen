
const dummy = (blogs) =>{
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, x) => sum + x.likes, 0)
}

const favouriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
}

const mostBlogs = (blogs) => {

    let names = blogs.map((x) => x.author)

    let count = {}
    let most = 0
    let person
    for(let i = 0; i<names.length; i++){
        let name = names[i]
        if(count[name]===undefined){
         count[name] = 1
        }else{
            count[name] = count[name] + 1
        }
        if(count[name]>most){
            most = count[name]
            person = name
        }
    }
    
    return(
        {
            author: person,
            blogs: most 
        }
    )
}

module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlogs
}