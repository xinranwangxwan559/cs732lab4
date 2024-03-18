# COMPSCI 732 / SOFTENG 750 Lab 04

In this lab, we continue introducing the backend - this time, the database, MongoDB, and its associated JavaScript library, `mongoose`. In this lab, you'll be converting lab exercises which you've worked on previously, to use MongoDB instead of hardcoded data and in-memory arrays.

Before you proceed with this lab, make sure that [MongoDB](https://www.mongodb.com/try/download/community) is installed on your machine, along with [MongoDB Compass](https://www.mongodb.com/products/compass) for manually browsing your databases. You can verify that these are installed and functional by runnning one of the MongoDB examples.

## Exercise One - Mongo-ifying the Pokédex app

The first app which we'll convert is the pokédex app. Examining the [`exercise-01`](./exercise-01/) folder, we'll see what is essentially a model solution from the previous lab. We won't be touching the `frontend` in this exercise - we'll be working entirely with the `backend`.

Currently, in `routes/index.js`, our route handlers read their data from the file, `pokemon.js`. We will instead store this data in a database. To do this, follow these steps:

### A) Install dependencies

We will need to install the `mongoose` package, for interacting with our MongoDB database through our JS code.

```sh
npm install mongoose
```

### B) Define the schema

Create a new JS file named, for example, `pokedex-schema.js`, and put it in the `db` folder for code organizational purposes. In that file, define a single instance of a `mongoose` `Schema` to represent pokédex entries. Each pokédex entry should have:

- A `dexNumber` (`Number`),
- A `name` (`String`),
- An `imageUrl` (`String`), and
- A `dexEntry` (`String`).

Once the schema instance has been created, use the `mongoose.model()` function to create the `PokedexEntry` model class, and export it.

### C) Add the DB connection string to the env file

Add an environment variable called `MONGODB_CONNECTION_STRING` to the env file. Give it the following value, which translates to a database called `cs732-lab-pokedex` running on the local MongoDB instance:

```
mongodb://127.0.0.1:27017/cs732-lab-pokedex
```

Note the use of `127.0.0.1` rather than `localhost`. This prevents a known mongoose connection bug when running on IPv6-enabled machines. You can change the database name, and / or use an Atlas cloud database instead, if you so choose.

### D) Populate the database

Next, we'll create a standalone script which will populate the database.

In the `db` folder, you'll notice a file, `init-db.js`, which contains the starting point for a program which will initialize the database. The script can be run by running `npm run init-db` in the `backend` folder (as defined in `package.json`).

To begin, at the marked location on line 1, import the data from the `.env` file into `process.env` like so:

```js
import * as dotenv from "dotenv";
dotenv.config();
```

Then, in the `run()` function which has been defined, between the calls to `connect()` and `disconnect()`, perform the following tasks:

1. Clear all `PokedexEntry`s from the database
2. Populate the database will all data contained within the `pokemon.js` file (you can `import` this file then loop through its contents).

Once done, run the program. Verify that it was successful by opening your database collection in Compass.

**Note:** Remember that `deleteMany()` and `insertMany()` / `save()` are `async` methods. We want to either `await` them, or process their results within a callback (`then(...)`).

### E) Connect to MongoDB when we start the app

Next, we want to modify `server.js` so that we connect to our MongoDB database when we start the app, _before_ starting our server listening for client connections. To do this, use the `mongoose.connect()` function. Move the code which starts the server listening, to a callback which is called once the database is connected. Alternatively, modern versions of node.js can use the `await` keyword directly in the top-level of the file.

**Hint:** See the Full-stack example, or check out Exercise Two's code, where this has already been done for you.

### F) Use the data in the database

For the final step, let's modify `routes/routes.js` to use the data in the database instead of directly using the `pokemon.js` file:

1. Delete the `pokemon.js` import
2. Import your `PokedexEntry` mongoose model class
3. Use its `find()` function to get all entries, within the first route handler. If you can, only return the `dexNumber`s and `name`s back to the user, as we are currently doing.
4. Use its `findOne()` function to get the single entry with the matching `dexNumber`, within the second route handler.

Once complete, run your backend, and browse to <http://localhost:3000/api/pokemon>, and <http://localhost:3000/api/pokemon/149>. Both should return valid data. The `frontend` should also run successfully.

**Note:** Remember that `find()` and `findOne()` are `async` methods. We want to either `await` them, or process their results within a callback (`then(...)`). If we choose to use `async` / `await`, we will need to make our route handler functions `async` as well.

## Exercise Two - Mongo-ifying the Store app

For this exercise, we'll Mongo-ify the other app we worked on during the previous lab - the shopping app. For this exercise, we will forego the step-by-step instructions. Follow a similar process as we have done in exercise one.

The schema is slightly more complex for this app. Whereas, in the previous exercise, we had only a single model class, we now have _two_ model classes in this app: Products and Orders:

1. Products have a `name`, `cost`, and `image`
2. Orders have an array of products which have been purchased in a particular order (can be an array of product ids).

**Hints:**

To achieve the second point above, we can use an array of `Schema.Types.ObjectId`. Have a look at the `mongoose` example, in which `User`s have a number of `Pet`s which they own, to see how a similar scenario has been implemented.

Even if we don't specify it, our mongoose models will all have `_id` properties added. And, when we add a new object to our database, its `_id` will be automatically assigned. We don't need to use `uuid()` to randomly create an id - it will be done for us. Again, look at the `User` / `Pet` example for inspiration.
