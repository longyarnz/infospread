# Using Queries

## Author
* Name: Ayodele Olalekan
* Email: longyarnz@gmail.com

## onePalette
``` js
  const Query  = {
    query: 'onePalette',
    variables: {
      options: '1234567890987654321'
    }
  }
  Query = JSON.stringify(Query); // convert Query to a JSON object
  const serverResponse = sendQueryAsynchronously(Query);
```
The *onePalette* query returns one document of type *Palette* from the API. The query takes a *variables* object with a key of *options* and a value which represents the unique ID! of the document.


## oneCustomer
``` js
  const Query  = {
    query: 'oneCustomer',
    variables: {
      options: '1234567890987654321'
    }
  }
  Query = JSON.stringify(Query); // convert Query to a JSON object
  const serverResponse = sendQueryAsynchronously(Query);
```
The *oneCustomer* query returns one document of type *Customer* from the API. The query takes a *variables* object with a key of *options* and a value which represents the unique ID! of the document.


## oneViewer
``` js
  const Query  = {
    query: 'oneViewer',
    variables: {
      options: '1234567890987654321'
    }
  }
  Query = JSON.stringify(Query); // convert Query to a JSON object
  const serverResponse = sendQueryAsynchronously(Query);
```

The *oneViewer* query returns one document of type *Viewer* from the API. The query takes a *variables* object with a key of *options* and a value which represents the unique ID! of the document.


## onePlatform
``` js
  const Query  = {
    query: 'onePlatform',
    variables: {
      options: '1234567890987654321'
    }
  }
  Query = JSON.stringify(Query); // convert Query to a JSON object
  const serverResponse = sendQueryAsynchronously(Query);
```

The *onePlatform* query returns one document of type *Platform* from the API. The query takes a *variables* object with a key of *options* and a value which represents the unique ID! of the document.


## getPalettes
``` js
  const Query  = {
    query: 'getPalettes',
    variables: {
      options: {
        _id: String,
        title: String,
        category: String,
        uri: String,
        tags: String,
        author: String // Customer ID! for the customer who created the palette.
      },
      limit: 'Number',
      sort: '_id' // OR '-_id' OR 'uri' OR '-uri' blah blah blah
    }
  }
  Query = JSON.stringify(Query); // convert Query to a JSON object
  const serverResponse = sendQueryAsynchronously(Query);
```

*NB*: This query translates to => SELECT FROM `palettes` WHERE `_id` = String AND `title` = String AND blah blah blah.

The *getPalettes* query returns an array of documents of type *Palette* from the API. The query takes a *variables* object with the following keys:
* options: it takes an object with the keys specified in the example above.
* limit: it takes a Number type value which determines the number of documents to return. By default, the limit is 1000; so you may omit the limit field.
* sort: it takes a String type value that determines how returned data is arranged. The data collected can arranged in ASC or DESC based on any field in the document. Example: sort: '_id' => ASC based on field '_id' OR sort: '-_id' for DESC based on field '_id'. By default, data is collected from newest to oldest, so you may omit the sort field.


## getCustomers
``` js
  const Query  = {
    query: 'getCustomers',
    variables: {
      options: {
        _id: String,
        _name: String,
        sex: String,
        phone: String,
        palettes: [String],
        email: String
      },
      limit: 'Number',
      sort: String
    }
  }
  Query = JSON.stringify(Query); // convert Query to a JSON object
  const serverResponse = sendQueryAsynchronously(Query);
```

*NB*: This query translates to => SELECT FROM `customers` WHERE `_id` = String AND `_name` = String AND blah blah blah.

The *getCustomers* query returns an array of documents of type *Customer* from the API. The query takes a *variables* object with the same explanation as mentioned above for *Palettes*


## getViewers
``` js
  const Query  = {
    query: 'getViewers',
    variables: {
      options: {
        _id: String,
        _name: String,
        sex: String,
        phone: String,
        interests: [String],
        email: String
      },
      limit: 'Number',
      sort: String
    }
  }
  Query = JSON.stringify(Query); // convert Query to a JSON object
  const serverResponse = sendQueryAsynchronously(Query);
```

*NB*: This query translates to => SELECT FROM `Viewers` WHERE `_id` = String AND `_name` = String AND blah blah blah.

The *getViewers* query returns an array of documents of type *Viewer* from the API. The query takes a *variables* object with the same explanation as mentioned above for *Palettes*


## getPlatforms
``` js
  const Query  = {
    query: 'getPlatforms',
    variables: {
      options: {
        _id: String,
        _name: String,
        sex: String,
        phone: String,
        interests: [String],
        email: String
      },
      limit: 'Number',
      sort: String
    }
  }
  Query = JSON.stringify(Query); // convert Query to a JSON object
  const serverResponse = sendQueryAsynchronously(Query);
```

*NB*: This query translates to => SELECT FROM `Platforms` WHERE `_id` = String AND `_name` = String AND blah blah blah.

The *getPlatforms* query returns an array of documents of type *Platform* from the API. The query takes a *variables* object with the same explanation as mentioned above for *Palettes*


## addPalettes
``` js
  const Query  = {
    query: 'addPalettes',
    variables: {
      options: [
        {
          _id: String,
          title: String,
          category: String,
          uri: String,
          tags: String,
          author: String // Customer ID! for customer who is creating the palette
        },
        {
          _id: String,
          title: String,
          category: String,
          uri: String,
          tags: String,
          author: String // Customer ID! for customer who is creating the palette
        }
      ]
    }
  }
  Query = JSON.stringify(Query); // convert Query to a JSON object
  const serverResponse = sendQueryAsynchronously(Query);
```

*NB*: This query translates to => INSERT INTO `Palettes` VALUES (`_id`, `title`, blah blah blah.

The *addPalettes* query returns an array of palette ID!s.


## addPlatforms
``` js
  const Query  = {
    query: 'addPlatforms',
    variables: {
      options: [
        {
          _id: String,
          title: String,
          category: String,
          uri: String
        },
        {
          _id: String,
          title: String,
          category: String,
          uri: String
        }
      ]
    }
  }
  Query = JSON.stringify(Query); // convert Query to a JSON object
  const serverResponse = sendQueryAsynchronously(Query);
```

*NB*: This query translates to => INSERT INTO `Platform` VALUES (`_id`, `title`, blah blah blah.

The *addPlatform* query returns an array of platform ID!s.

*NB*: The _addPalettes_ and _addPlatforms_ query take an array of values for the _options_ key in the _variables_ object, and they return an array of ID!s


## addCustomers
``` js
  const Query  = {
    query: 'addCustomers',
    variables: {
      options: {
        _id: String,
        _name: String,
        email: String,
        sex: 'Sex',
        phone: 'Float'
      }
    }
  }
  Query = JSON.stringify(Query); // convert Query to a JSON object
  const serverResponse = sendQueryAsynchronously(Query);
```

*NB*: This query translates to => INSERT INTO `Customers` VALUES (`_id`, `_name`, blah blah blah.

The *addCustomers* query returns a Customer ID!.


## addViewers
``` js
  const Query  = {
    query: 'addViewers',
    variables: {
      options: {
        _id: String,
        _name: String,
        email: String,
        sex: 'Sex',
        phone: 'Float',
        interests: [String]
      }
    }
  }
  Query = JSON.stringify(Query); // convert Query to a JSON object
  const serverResponse = sendQueryAsynchronously(Query);
```

*NB*: This query translates to => INSERT INTO `Viewers` VALUES (`_id`, `_name`, blah blah blah.

The *addViewers* query returns a Viewer ID!.


## updateViewer
``` js
  const Query  = {
    query: 'updateViewer',
    variables: {
      options: {
        _id: String, // NECESSARY!
        _name: String, // OPTIONAL!
        email: String, // OPTIONAL!
        sex: 'Sex', // OPTIONAL!
        phone: 'Float', // OPTIONAL!
        interests: [String] // OPTIONAL!
      }
    }
  }
  Query = JSON.stringify(Query); // convert Query to a JSON object
  const serverResponse = sendQueryAsynchronously(Query);
```

*NB*: This query translates to => UPDATE `Viewers` SET `_name` = String, `email` = String WHERE `_id` = String...blah blah blah.  
The `_id` is the auto-generated primary key for all documents. Use it as the ultimate identifier for all records.  
The *addViewers* query returns an updated Viewer document.


## updateCustomer
``` js
  const Query  = {
    query: 'updateCustomer',
    variables: {
      options: {
        _id: String, // NECESSARY!
        _name: String, // OPTIONAL!
        email: String, // OPTIONAL!
        sex: 'Sex', // OPTIONAL!
        phone: 'Float', // OPTIONAL!
        palettes: [String] // OPTIONAL!
      }
    }
  }
  Query = JSON.stringify(Query); // convert Query to a JSON object
  const serverResponse = sendQueryAsynchronously(Query);
```

*NB*: This query translates to => UPDATE `Customers` SET `_name` = String, `email` = String WHERE `_id` = String...blah blah blah.  
The `_id` is the auto-generated primary key for all documents. Use it as the ultimate identifier for all records.  
The *addCustomers* query returns an updated Customer document.


## updatePalette
``` js
  const Query  = {
    query: 'updatePalette',
    variables: {
      options: {
        _id: String, // NECESSARY!
        caption: String, // OPTIONAL!
        title: String, // OPTIONAL!
        category: String, // OPTIONAL!
        author: Customer, // OPTIONAL!
        tags: [String], // OPTIONAL!
        uri: String // OPTIONAL!
      }
    }
  }
  Query = JSON.stringify(Query); // convert Query to a JSON object
  const serverResponse = sendQueryAsynchronously(Query);
```

*NB*: This query translates to => UPDATE `Palettes` SET `title` = String, `caption` = String WHERE `_id` = String...blah blah blah.  
The `_id` is the auto-generated primary key for all documents. Use it as the ultimate identifier for all records.  
The *addPalettes* query returns an updated Palette document.


## updatePlatform
``` js
  const Query  = {
    query: 'updatePlatform',
    variables: {
      options: {
        _id: String, // NECESSARY!
        title: String, // OPTIONAL!
        category: String, // OPTIONAL!
        uri: String // OPTIONAL!
      }
    }
  }
  Query = JSON.stringify(Query); // convert Query to a JSON object
  const serverResponse = sendQueryAsynchronously(Query);
```

*NB*: This query translates to => UPDATE `Platforms` SET `title` = String, `caption` = String WHERE `_id` = String...blah blah blah.  
The `_id` is the auto-generated primary key for all documents. Use it as the ultimate identifier for all records.  
The *addPlatforms* query returns an updated Platform document.


## removeDocs
``` js
  const Query  = {
    query: 'removeDocs',
    variables: {
      options: {
        palette: String, // OPTIONAL!
        platform: String, // OPTIONAL!
        customer: String, // OPTIONAL!
        viewer: String // OPTIONAL!
      }
    }
  }
  Query = JSON.stringify(Query); // convert Query to a JSON object
  const serverResponse = sendQueryAsynchronously(Query);
```

*NB*: This query translates to => DELETE FROM DATABASE WHERE `palette _id` = String, `paltform _id` = String ... blah blah blah.  
The _String_ in the query must point to the `_id` of the document you want to delete. 
The query returns a *boolean* for the type of document removed.
