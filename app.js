const express = require('express');
const morgan = require('morgan');
const playstore = require('./playstore');

const app = express();
app.use(morgan('common'));

app.get('/apps', (req, res) => {
    res.status(200);
    res.send(playstore);

    const { search = "", sort } = req.query;

    if (sort) {
      if (!['title', 'rank'].includes(sort)) {
        return res
          .status(400)
          .send('Sort must be one of title or rank');
      }
    }
})



    //let genres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];










app.listen(8000, () => {
    console.log('Server started on PORT 8000');
  });








  //sort  :  rating or app
  //genres  :  action, puzzle, strategy, casual, arcade, card