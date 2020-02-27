$('.task-detail').hover(function(){
  $(this).toggleClass('red');
})

// make an ajax call to the backend to get the tasks from the DB
$.ajax('http://localhost:3000/collectAllTasks', {method:'GET', dataType: 'JSON'})
  .then(data => {
    data.forEach(task => {
      new Task(task).render();
    })
  })
// run them through a constructor
let taskArray = [];
function Task(obj){
  this.title = obj.title;
  this.description = obj.description;
  taskArray.push(this);
}

// make a prototype to display them using handlebars
Task.prototype.render = function(){
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);
  var html = template(this);

  $('#tasks').append(html);
}



