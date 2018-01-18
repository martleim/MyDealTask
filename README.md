# MyDealTask

## .Net Solution Architecture

The architecture complies of a set of projects that ensure a separation of concerns based on responsabilities. These projects are then grouped in folders considering the duties they share and numbered in order of access (UI->database).

There is a folder Common which contains the elements that are used across the whole stack such as contracts, models, etc.

## Entity Framework Database first

Entity Framework 6 is being used as the solution ORM. The Model, Repositories and repositories interfaces are being auto generated from the EDMX using text templates which have been modified to deliver these different structures.

The model, which is being auto generated, include serialization and validation attributes and is included in the Model project which is used across the solution.

The data access repositories are implementing it's own interface in order to be injected as a dependency. Also they inherit from the IRepository interface in order for them to have all the repository access methods. These although are implemented in the BaseRepository generically.

## Dependency injection using unity

The solution implements a project based on the unity container to handle dependency injection smoothly by loading the dependencies from the dependency dll itself and resolving these from a dependency resolver class in the web api.

For the injection of the repositories the implemented interfaces in each repository are autogenerated from text templates inferred from the EF edmx generated.

## TDD for business logic processor

The logic behind the PNL processing has been implemented using TDD. The test cases were written in order to comply with the validation of each line and the result. Regular expressions were used to validate and process each line of the PNL, which is passed as a string reader and read line per line. The process file method defined in the interface returns a list of generic type which is then implemeted to return a list of the model defined.

By using this approach when testing the sumited test data incured in an error parsing one of the lines which had a differnt format from the others. This case was considered an error and was remediated by throwing an exception that indicates the line number and content.

## Web Api - Swagger

The web api task is to work as an HTTP rest interface to upload the NPLs and process these. The api also contains methods to delete, update and get (all or single) uploaded files via HTTP verbs (GET,POST,PUT,DELETE).

All the errors are handled via a filter that catches the exception and sends it to the client as an internal server error http response header (500). At the moment that is the only error the api is returning, in case authentication was implemented when unauthorized a 401 error could be thrown to be catched on the client side, same thing with any other possible error that might happen. 

Swagger is being used as a means to test the api as well to expose the interface methods, parameters and response to the developers in order to implement clients that use it. To access the swagger UI it is needed to add swagger to the route (for example http://localhost:8080/swagger).

## AngularJS bootstrap / Angular5 material design clients

I wanted to implement 2 clients for the solution but after finishing the angularJS client didn't have much time left to finish the angular 5 client. The former was completed with all the requirements but the second one is just a simple prototype to upload files process them and list them to be deleted.

### AngularJS bootstrap

The AngularJS client uses angular bootstrap as UI framework. To install all the dependencies npm must be installed so as to call npm install and get all the js/css/assets required by the application.

This client lists all the uploaded files with the details, allows to upload a new file which can be modified inside the application and then uploaded or download the modifications made. After the file is uploaded the contents are listed in the modal and the records will be filtered with a regular expression that is written in the filtering field.

### Angular5 material design

The angular material 5 has the basic functionality that allows to upload a file and delete files which have been uploaded and saved to the database. The client could not be finished and it needs npm to install dependencies and to run angular client command ng serve from the project folder in order to serve the application.
