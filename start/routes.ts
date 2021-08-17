import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('login', 'AuthController.login')
  //User
  Route.post('users', 'UsersController.store')
  Route.get('users', 'UsersController.index')
  Route.get('users/:id', 'UsersController.show')
  Route.put('users/:id', 'UsersController.update')

  //User Types
  Route.post('user-types', 'UserTypesController.store')
  Route.get('user-types', 'UserTypesController.index')
  Route.get('user-types/:id', 'UserTypesController.show')
  Route.put('user-types/:id', 'UserTypesController.update')

  //Sector
  Route.post('sectors', 'SectorsController.store')
  Route.get('sectors', 'SectorsController.index')
  Route.get('sectors/:id', 'SectorsController.show')
  Route.put('sectors/:id', 'SectorsController.update')

  //Position
  Route.post('positions', 'PositionsController.store')
  Route.get('positions', 'PositionsController.index')
  Route.get('positions/:id', 'PositionsController.show')
  Route.put('positions/:id', 'PositionsController.update')

  //Category
  Route.post('categories', 'CategoriesController.store')
  Route.get('categories', 'CategoriesController.index')
  Route.get('categories/:id', 'CategoriesController.show')
  Route.put('categories/:id', 'CategoriesController.update')

  //Client
  Route.post('clients', 'ClientsController.store')
  Route.get('clients', 'ClientsController.index')
  Route.get('clients/:id', 'ClientsController.show')
  Route.put('clients/:id', 'ClientsController.update')

  //Employee
  Route.resource('employees', 'EmployeesController').apiOnly().except(['destroy'])

  //Manager
  Route.resource('managers', 'ManagersController').apiOnly()
}).prefix('/api')
