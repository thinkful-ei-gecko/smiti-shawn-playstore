const express = require('express');
const morgan = require('morgan');
const app = express();

const playstore = require('./playstore.js');

app.use(morgan('common'));

app.get('/apps', (req, res) => {
    const {genres="", sort} = req.query;
    if(sort){
      if(!['rating', 'app'].includes(sort.toLowerCase())){
        return res
          .status(400)
          .send("Sort must be either rating or app");
      }
    }

    let results = playstore.filter(app => 
      app.Genres.toLowerCase().includes(genres.toLowerCase().trim())
    );
    
    if(sort){
      results.sort((a,b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      })
    }

    return res
      .status(200)
      .json(results);
});

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
});

module.exports = app;