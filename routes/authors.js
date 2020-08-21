const express = require('express');
const router = express.Router()
const Author = require('../models/author');
const author = require('../models/author');

// All authors route
router.get('/', async(req, res) => {
    let searchoptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchoptions.name = new RegExp(req.query.name, 'i')
    }
    try
    {
    const authors = await Author.find(searchoptions)
    res.render('authors/index', { 
        authors: authors, 
        searchoptions: req.query
    })
    }
    catch
    {
    res.redirect('/')
    }
 
})
// New author
    router.get('/new', (req, res) => {
    res.render('authors/new', {author: new Author()
    })
})

// create author 
router.post('/', async(req, res) => {
    const author = new Author({
        name:req.body.name
    })
    try{
const newAuther = await auther.save()
//res.redirect(`authors/${newAuthor.id}`)
res.redirect(`authors`)
    } catch{
        res.render('authors/new',{
            author:author,
            errorMessage:'Error Creating Author'
        })
}
})

module.exports = router