const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

//bring in models
const Article = require('../models/Article');


// router.use((req, res, next) => {
//   if (req.session.currentUser) { // <== if there's user in the session (user is logged in)
//     next(); // ==> go to the next route ---
//   } else {                          //    |
//     res.redirect("/auth/login");         //    |
//   }                                 //    |
// }); // ------------------------------------                                
// //     | 


//@route Get Articles
//@desc All Articles
//@access Public
router.get('/', (req, res) => {
  Article.find()
  .sort({ date: -1 })
  .then(articles => res.json(articles));
    });


    router.get('/', (req, res, next) => {
      return Article.find()
        .sort({ createdAt: 'descending' })
        .then((articles) => res.json({ articles: articles.map(article => article.toJSON()) }))
        .catch(next);
    });
    
    router.param('id', (req, res, next, id) => {
      return Article.findById(id, (err, article) => {
        if(err) {
          return res.sendStatus(404);
        } else if(article) {
          req.article = article;
          return next();
        }
      }).catch(next);
    });
    



//add submit POST route
router.post('/', (req, res) => {
  const today = new Date();
  const newArticle = new Article({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    created: today
  });

   newArticle.save().then(article => res.json(article))
});

//@route Delete Article
router.delete('/:id', (req, res) => {
 Article.findById(req.params.id)
 .then(article => article.remove().then(() => res.json({success: true})))
 .catch(err => res.status(404).json({success: false}));
});


// //Get single article
// router.get('/article/:id', function(req, res) {
//   Article.findById(req.params.id, function(err, article) {
//     console.log(article);
//     return;
//   });
// })

// //add route
// router.get('/articles/add', function(req, res) {
//   res.render('add_article');
//   });


// //route for search
// router.get('/search', (req, res) => {
//   res.render('search')
// })

// router.get('/search-article', (req, res) => {
//     let searchQuery =  req.query.articles;
//     Article.find({name: searchQuery}, function(err, articles) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render('index',
//       {articles: articles});
//     }
//   })
// })

module.exports = router;