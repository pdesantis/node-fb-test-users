fb-test-users
===

fb-test-users is a utility module to create, read, update, and delete Facebook test users for your Facebook application.

Installation
---

    $ npm install fb-test-users

Documentation
---
* [FBTestUsers](#FBTestUsers)
* [create](#create)
* [list](#list)
* [update](#update)
* [delete](#delete)

---

<a name="FBTestUsers") />
### FBTestUsers(options) ###
Returns a new FBTestUsers object.

**Arguments**

* **options.appID** - Your Facebook App ID.
* **options.secret** - Your Facebook App Secret.
* *options.access_token* - Your Facebook App's access token. Optional, if not specified, this will be lazily-fetched & cached when it is needed.

**Example**

```javascript
FBTestUsers = require('fb-test-users');
fbTestUsers = new FBTestUsers({appID: 'YOUR_APP_ID', secret: 'YOUR_APP_SECRET'});
```

---

<a name="create" />
### create(args, callback) ###
Creates a new test user on Facebook.

**Arguments**

* *args.limit* - The number of users to create. Optional, defaults to 1.
* *args.installed* - Set the user's 'installed' parameter. Optional, defaults to *true*.
* *args.permissions* - Set the user's xw'permissions' parameter. Optional, defaults to *'read_stream'*.
* **callback(error, result)** - The callback which is called after the user(s) are created, or an error occurred.
  * *error* - Error object
  * *user* - Array of user objects

**Example**

```javascript
fbTestUsers.create({}, function(error, result){
  console.log(result);
});
```

---

<a name="list" />
### list(callback) ###

Fetch an array of all test users associated with this app.

**Arguments**

* **limit - The numbers of users returned - default value is 50

* **callback(error, users)** - The callback which is called after the users have been fetched, or an error occurred.
  * *error* - Error object
  * *user* - Array of user objects

**Example**

```javascript
fbTestUsers.list(function(error, users){
  console.log(users);
});
```

**Example with limit, get 100 users**

```javascript
fbTestUsers.list(100, function(error, users){
  console.log(users);
});
```

---

<a name="update" />
### update(userID, args, callback) ###

Update a test user's name and/or password.

**Arguments**

* **userID** - The Facebook userID of the user to update.
* *args.name* - The new name for the user. Optional.
* *args.password* - The new password for the user. Optional.
* **callback(error, success** - The callback which is called after the user has been updated, or an error occurred.
  * *error* - Error object
  * *success* - Boolean - true on success, false otherwise

**Example**

```javascript
fbTestUsers.update('100006249401765', {name: 'Testy McCool', password: 'nottest'}, function(error, success){
  console.log(success);
});
```

---

<a name="delete" />
### delete(userID, callback) ###

Delete a test user.

**Arguments**

* **userID** - The Facebook userID of the user to delete.
* **callback(error, success)** - The callback which is called after the user has been deleted, or an error occurred.
  * *error* - Error object
  * *success* - Boolean - true on success, false otherwise

**Example**

```javascript
fbTestUsers.delete('100006249401765', function(error, success){
  console.log(success);
});
```

---

## Running Tests ##

To run the test suite first invoke the following command within the repo, installing the development dependencies:

    $ npm install

then create a file `test/creds.json` containing the following:
```json
{
  "appID": "YOUR_APP_ID",
  "secret": "YOUR_APP_SECRET"
}
```

Finally, run the tests:

    $ make test

---

## License ##

(The MIT License)

Copyright (c) 2013 Patrick DeSantis &lt;pdesantis3@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
