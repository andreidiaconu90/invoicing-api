# Thoughts

Due to the fact that i couldn't find enough time to work on this and finish all the tasks, i'll leave below a couple of comments:

## Project structure
I've modified the project structure a bit in order to make it more readable/extensible:
* Moved the controller logic out of the app.js file and into their own files
* Moved the routing out of the app.js file into it's own file. Because there weren't so many routes i've kept all the definition in one `index.js` file, but this can be further extendend through extracting related routes in separate files and referecing those in the `index.js` file, which is terms is used in the app.js file.
* Controllers are grouped by folders, with business-related controllers in the same folder
* Business logic is separated into a Services folder, in  *Service.js files, which can be grouped in domain-specific folder.

## Database access
I think the main challange of this task is in regards to data integrity and concurrent access to the database (the "at the moment" hints in the requirements helped😄). For data integrity i've used Sequelize's managed transactions inside try/catch blocks making sure that if something breaks during the process I'm not left with inconsistent data. 

Although i haven't necessarily had real, production grade, concurrency problems before, I knew about things like `SELECT ... FOR UPDATE` and locks. Discovered that SQLite doesn't support the `SELECT ... FOR UPDATE` directly but, by wrapping a query, with `lock:true`, in a transaction should pretty much result in a SELECT ... FOR UPDATE. The lock seems to be necessary on `SELECT` statements because a transaction will lock the rows only after an `INSERT/UPDATE` statement. 


## If i had more time
* Definately adding unit tests would have been my go to. If interested, [I have a repo](https://github.com/andreidiaconu90/aws-lambda-api/blob/main/src/specs/MovieService.spec.ts) with my usual stack which also includes a test with `mocha`, `sinon` and `chai`.
* For the extra credit i would have gone for  a [Postman/Newman](https://github.com/postmanlabs/newman) E2E test collection, which would have showed the transaction/locks working as it has the posibility to trigger concurrent requests to you API. If you're interesed in how it would have looked like i have a repository from a while back [here](https://github.com/andreidiaconu90/Postman-Newman-Love)(it's in dotnet/C# but the newman part is agnostic) 

### Thanks!

# DEEL BACKEND TASK

💫 Welcome! 🎉

This backend exercise involves building a Node.js/Express.js app that will serve a REST API. We imagine you should spend around 3 hours at implement this feature.

## Data Models

> **All models are defined in src/model.js**

### Profile

A profile can be either a `client` or a `contractor`.
clients create contracts with contractors. contractor does jobs for clients and get paid.
Each profile has a balance property.

### Contract

A contract between and client and a contractor.
Contracts have 3 statuses, `new`, `in_progress`, `terminated`. contracts are considered active only when in status `in_progress`
Contracts group jobs within them.

### Job

contractor get paid for jobs by clients under a certain contract.

## Getting Set Up

The exercise requires [Node.js](https://nodejs.org/en/) to be installed. We recommend using the LTS version.

1. Start by cloning this repository.

1. In the repo root directory, run `npm install` to gather all dependencies.

1. Next, `npm run seed` will seed the local SQLite database. **Warning: This will drop the database if it exists**. The database lives in a local file `database.sqlite3`.

1. Then run `npm start` which should start both the server and the React client.

❗️ **Make sure you commit all changes to the master branch!**

## Technical Notes

- The server is running with [nodemon](https://nodemon.io/) which will automatically restart for you when you modify and save a file.

- The database provider is SQLite, which will store data in a file local to your repository called `database.sqlite3`. The ORM [Sequelize](http://docs.sequelizejs.com/) is on top of it. You should only have to interact with Sequelize - **please spend some time reading sequelize documentation before starting the exercise.**

- To authenticate users use the `getProfile` middleware that is located under src/middleware/getProfile.js. users are authenticated by passing `profile_id` in the request header. after a user is authenticated his profile will be available under `req.profile`. make sure only users that are on the contract can access their contracts.
- The server is running on port 3001.

## APIs To Implement

Below is a list of the required API's for the application.

1. **_GET_** `/contracts/:id` - This API is broken 😵! it should return the contract only if it belongs to the profile calling. better fix that!

1. **_GET_** `/contracts` - Returns a list of contracts belonging to a user (client or contractor), the list should only contain non terminated contracts.

1. **_GET_** `/jobs/unpaid` - Get all unpaid jobs for a user (**_either_** a client or contractor), for **_active contracts only_**.

1. **_POST_** `/jobs/:job_id/pay` - Pay for a job, a client can only pay if his balance >= the amount to pay. The amount should be moved from the client's balance to the contractor balance.

1. **_POST_** `/balances/deposit/:userId` - Deposits money into the the the balance of a client, a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)

1. **_GET_** `/admin/best-profession?start=<date>&end=<date>` - Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range.

1. **_GET_** `/admin/best-clients?start=<date>&end=<date>&limit=<integer>` - returns the clients the paid the most for jobs in the query time period. limit query parameter should be applied, default limit is 2.

```
 [
    {
        "id": 1,
        "fullName": "Reece Moyer",
        "paid" : 100.3
    },
    {
        "id": 200,
        "fullName": "Debora Martin",
        "paid" : 99
    },
    {
        "id": 22,
        "fullName": "Debora Martin",
        "paid" : 21
    }
]
```

## Going Above and Beyond the Requirements

Given the time expectations of this exercise, we don't expect anyone to submit anything super fancy, but if you find yourself with extra time, any extra credit item(s) that showcase your unique strengths would be awesome! 🙌

It would be great for example if you'd write some unit test / simple frontend demostrating calls to your fresh APIs.

## Submitting the Assignment

When you have finished the assignment, create a github repository and send us the link.

Thank you and good luck! 🙏
