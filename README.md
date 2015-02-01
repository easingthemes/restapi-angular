##Restapi on angular
Step 1: Intro in MEAN stack with app on jQuery - https://github.com/easingthemes/restapi
Step 2: Replacing jQuery with Angular, real MEAN stack - this repo.

## If you want to try it
Start mongodb
```
mongod
```
start project
```
git clone https://github.com/easingthemes/restapi-angular.git
cd restapi-angular
npm install
grunt serve
```
## If you want to learn
Follow this readme and build your app from scratch.

## Angular
1.Add files, for now keep jquery:
```
<script type="text/javascript" src="lib/angular.min.js"></script>
<script type="text/javascript" src="lib/jquery-1.11.2.min.js"></script>
```
2.Name your app:
```
<body ng-app="Restapi">
```

3.Create some partials: header.html, footer.html and home.html
```
  <header  ng-include="'partials/header.html'" scope="" onload=""></header>

  <footer  ng-include="'partials/footer.html'" scope="" onload=""></footer>
```
4.Initialize main app.js
```
angular.module('Restapi', []);
```
:: You should see **header** and **footer** now.
5.ROUTES
```
angular.module('Restapi', [ 
  'ngRoute' 
])
/** * Configure the Routes */ 
.config(['$routeProvider', function ($routeProvider) { 
  $routeProvider 
  // Home 
  .when("/", {
    templateUrl: "partials/home.html"
  })
}]);
```
6.Add `ngRoute` to index.html
```
<script type="text/javascript" src="lib/angular-route.min.js"></script>
```
7.Add ng-view for rendering home route
```
<section  ng-view=""></section>
```
8.You should see whole page as with jQuery.


You just created basic angular page with Partials and Routes


## CLIENT: use created CRUD functions from frontend

#### ROUTER: Remember API router?
```
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);
```

```
## CRUD - jQuery to Angular

###READ

####jQuery: 
* app.js
```
showPosts: function(){
  //READ: get all items from API uri
  $.get('/api/items', function(data) {
    $.each(data, function(index, val) {
      $('<li id="'+val._id+'"><p>'+val.title+'</p> <a href="">delete</a></li>').appendTo('ul');
    });
  });
}
```
* index.html
```
<div>
  <h2>Read <span>Delete</span></h2>
  <ul></ul>
</div>
```

Basicly with jQuery we used AJAX to get data and then we builded DOM and appened it to `ul` in index.html. We also used `$.each` to create all items.

####Angular:

In Angular we are going to use controller to comunicate with API

5.CONTROLER: controller.js
```
angular.module('Restapi')
/** * Controls the Pages */ 
.controller('ItemsCtrl', function ($scope, $location, $http) {

    $http.get('/api/items').
      success(function(data, status, headers, config) {
            $scope.items = data;
    });
        
});
```
6.Add controller.js file
```
<script src="js/controllers.js"></script>
```

Then we are going to build DOM directlly with `ng-repeat`

7.READ data: home.html
```
<div ng-controller="PageCtrl">
  <h2>Read <span>Delete</span></h2>
  <ul>
      <li ng-repeat="item in items" id="{{ item._id }}"><p>{{ item.title }}</p> <button class="delete">delete</button></li>
   </ul>
</div>
```
We replaced READ part from jQuery with Angular

###DELETE
####jQuery
```
  deletePost: function(itemId){
    //DELETE: delete item
    $.ajax({
      url: '/api/items/'+itemId,
      type: 'DELETE'
    });
  },
```
and event:
```
$(document).on('click', '.delete', function(event) {
  event.preventDefault();
  app.deletePost($(this).parent().attr('id'));
});
```
####Angular:
1.Use controller
```
.controller('ItemsCtrl', function ($scope, $location, $http) {

    $http.get('/api/items').
      success(function(data, status, headers, config) {
            $scope.items = data;
    })
    $scope.deleteItem = function(item) {
        $http.delete('/api/items/' + item._id);
    };

});
```
2.Add event
```
<button class="delete" ng-click="deleteItem(item)">delete</button>
```

We replaced DELETE part from jQuery with Angular

###CREATE:
####jQuery
```
createPost: function(data){
  //CREATE: create new item
  $.ajax({
    url: '/api/items',
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: data
  })
  .done(function(data) {
    $('<li id="'+data._id+'"><p>'+data.title+'</p> <button class="delete">delete</button></li>').appendTo('section > div > ul');
    app.checkItems();
  });
},
```
Event:
```
$(document).on('click', '.create', function(event) {
  event.preventDefault();
  var itemTitle = $('input').val();
  var itemContent = $('textarea').val();
  var jsonItem = JSON.stringify({title: itemTitle, content: itemContent});
  app.createPost(jsonItem);
});
```
####Angular
1.Use controller:
```
$scope.addItem = function() {
    $http.post('/api/items', { 
        title: $scope.itemTitle,
        content: $scope.itemContent
    });
};  
```
2. Add event:
```
<h2>Create</h2>
<input type="text" placeholder="Enter item Title" ng-model="itemTitle">
<textarea placeholder="Enter item Content" ng-model="itemContent"></textarea>
<button class="create" type="submit" ng-click="addItem()">create</button>
```
We replaced CREATE part from jQuery with Angular

###UPDATE:
####jQuery
```
  updatePost: function(itemId, newData){
    //UPDATE: update item
    $.ajax({
      url: '/api/items/'+itemId,
      type: 'PUT',
      contentType: 'application/json',
      dataType: 'json',
      data: newData
    })
    .done(function(data) {
      $('#'+data._id+' p').text(data.title);
    });
  },
```
Event:
```
$(document).on('click', 'article .update', function(event) {
  var newTitle = $(this).siblings('h3').text();
  var newContent = $(this).siblings('div').text();
  var jsonItem = JSON.stringify({title: newTitle, content: newContent});
  app.updatePost($(this).parent().data('id'), jsonItem);
});
```