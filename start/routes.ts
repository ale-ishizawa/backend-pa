import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.post('logout', 'AuthController.logout')
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

  Route.put('sectors/many', 'SectorsController.updateMany')
  Route.resource('sectors', 'SectorsController').apiOnly().except(['destroy'])

  //Position
  Route.put('positions/many', 'PositionsController.updateMany')
  Route.resource('positions', 'PositionsController').apiOnly().except(['destroy'])

  //Category
  Route.put('categories/many', 'CategoriesController.updateMany')
  Route.resource('categories', 'CategoriesController').apiOnly().except(['destroy'])

  //Client
  Route.post('clients', 'ClientsController.store')
  Route.get('clients', 'ClientsController.index')
  Route.get('clients/:id', 'ClientsController.show')
  Route.put('clients/:id', 'ClientsController.update')

  //Employee
  Route.get('employees/disc', 'EmployeesController.getProfilesDisc')
  Route.put('employees/many', 'EmployeesController.updateMany')
  Route.resource('employees', 'EmployeesController').apiOnly().except(['destroy'])

  //Manager
  Route.resource('managers', 'ManagersController').apiOnly()
}).prefix('/api')
