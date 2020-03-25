
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

const mostLikes = (blogs) => {
    let allNames = blogs.map((x) => x.author)
    let names = [...new Set(allNames)]

    let count = {}
    let most = 0
    let person
  

    for(let i = 0; i<names.length; i++){

        for(let k = 0; k<blogs.length; k++){
            let name = names[i]
            if(count[name]===undefined && blogs[k].author===name){
                 count[name] = blogs[k].likes
                }else if(blogs[k].author===name){
                    count[name] = count[name] + blogs[k].likes
                }
            if(count[name]>most) {
                most = count[name]
                person = name
            }
                

        }

    }
    return(
        {
            author: person,
            likes: most
        }
    )

}


module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}