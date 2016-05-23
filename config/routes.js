// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
module.exports = function routes () {
  this.root('pages#main')
  this.match('/admin', 'pages#admin')
  this.match('/student/:id', 'users#student')
  this.match('/login', 'pages#login')
  this.match('/signup', 'pages#signup')
  this.match('/dashboard', 'pages#dashboard')
  this.match('/login', 'auth#login', {via: 'POST'})
  this.match('/logout', 'auth#logout', {via: 'POST'})
  this.match('/editLanguage', 'users#editLanguage', {via: 'POST'})
  this.match('/topicNotGrasp', 'users#addTopicNotGrasp', {via: 'POST'})
  this.match('/toggleTopic', 'users#toggleTopic', {via: 'POST'})
  this.match('/feedback', 'users#feedback', {via: 'POST'})
  this.resources('users', {only: ['index', 'create', 'show']})
}
