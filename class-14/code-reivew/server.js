'use strict';

// Final:
// 1. flex or grid question
// 2. use proper SMACSS
//   - base = really basic stuff/ universal stuff/ box-sizing: border-box
//   - layout = basically what would go in a wireframe
//   - modules = ids, classes, bits of html
// 3. jQuery - be able to turn vanilla JS into jQuery
//   - don't forget to import your library
//   - lives in the front end
//   - lives in the public folder
// 4. from the front end, go to the back end, get information from a server that makes a superagent call to an API and returns that info to the front end. 
//   - render that information to the front end using handlebars
//   - bring in the handlebars library
    // - pass around the PARAMS!
// 5. get information out of a Database, update that informtion. Pass around the PARAMS! 

require('dotenv').config();
const express = require('express');
const app = express();
const superagent = require('superagent');
require('ejs');

const PORT = process.env.PORT || 3001;
app.use(express.static('./public'));

app.get('/', home);
app.set('view engine', 'ejs');
app.get('/giveusdogs', giveDogInfo);
app.get('/dogs/:dog_name', getOneDog);

function home(request, response){
  response.render('index.ejs');
}
function giveDogInfo(request, response){
  const dogs = [
    {name: 'Fido',
     hair: 'brown',
     sheds: true
    },
    {name: 'Spot',
     hair: 'black',
     sheds: false
    },
    {name: 'Bernard',
     hair: 'white',
     sheds: true
    }
  ]

  response.send(dogs);
}

function getOneDog(request, response){
  console.log('🇲🇺', request.params.dog_name)
  let dogName = request.paramas.dog_name;
  // get the params of dog name from the params
  // send it back to the front end
  response.send(dogName)
}

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
})