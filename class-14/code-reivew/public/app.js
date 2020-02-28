// front end java script app

// GOAL is to ask for an object and render it to the page

$.ajax('http://localhost:3000/giveusdogs', {method: 'GET', dataType: 'JSON'})
  .then(data => {
    let allDogs = data;
    console.log(allDogs);
    allDogs.forEach(dog => {
      console.log(dog)
      // if the dog doesn't shed, get his name from the back end
      if(dog.sheds === false){
        console.log('found the dog!')
        $.ajax(`http://localhost:3000/dogs/${dog.name}`, {method: 'GET', dataType: 'JSON'})
          .then(dogName => {
            console.log(dogName);
          })
      }
    })
  })

// get just the name of one of the dogs

$.ajax('http://localhost:3000/dogs/')