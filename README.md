# InfoSpread Data API

## Author
* Name: Ayodele Olalekan
* Email: longyarnz@gmail.com

This is a simple data API layer created to serve data needs of the InfoSpread mobile App and Web Application. 

## Building Blocks

It was built with the following technology:
* [NodeJS](https://nodejs.org)
* [Express](https://expressjs.com)
* [MongoDB](https://mongodb.com)
* [Mongoose](https://mongoosejs.com)
* [GraphQL](https://graphql.org)

## Using The API

The API database is hosted on MongoDB.

### Data Schema

There are 4 collections in the Mongo Cluster, named:
* Customers: It collects documents of users who upload their adverts and contents.
* Palettes: It collects the adverts uploaded by customers.
* Viewers: It collects document of users who use the app and view the advert and other contents.
* Platforms: It collects documents pertaining to oppurtunities and other non-advert content.

The schemas are defined below:
#### Customer
  ``` js
    const customerSchema = `
      type Customer {
        _id: String
        _name: String
        email: String
        sex: Sex
        phone: Float!
        palettes: [Palette]
      }
    `;
  ```  
**The __palettes__ field contains an array of ID!s that make reference to the uploaded documents of the customer**

#### Palettes
  ``` js
    const paletteSchema = `
      type Palette {
        _id: String
        caption: String
        title: String
        category: String
        author: Customer
        tags: [String]
        uri: String
        createdAt: String
      }
    `;
  ```  
**The __author__ field contains an array of ID!s that make reference to the customer owners**

#### Viewers
  ``` js
    const viewerSchema = `
      type Viewer {
        _id: String
        _name: String
        email: String
        sex: Sex
        phone: Float!
        interests: [String]
      }
    `;
  ```  
**The __interests__ field contains an array of strings denoting the viewers interests**

#### Platforms
  ``` js
    const platformSchema = `
      type Platform {
        _id: String
        title: String
        category: String
        uri: String
      }
    `;
  ```


### API Endpoints

There are following endpoints (2) exposed to the API:
1) **infospread.herokuapp.com/api/_xxxx_**: There are 4 options for the *xxxx* fields:
     * **Customer**: **infospread.herokuapp.com/api/customers** loads all the customer data in the database.
     * **Palettes**: **infospread.herokuapp.com/api/palettes** loads all the palette data in the database.
     * **Platform**: **infospread.herokuapp.com/api/platforms** loads all the platform data in the database.
     * **Viewer**: **infospread.herokuapp.com/api/viewers** loads all the viewer data in the database.

2) infospread.herokuapp.com/spread: This endpoint collects queries and executes them against the database. When a request is sent to the API, it validates the request before sending to the Mongo server. Prequisites for a valid request are:
     * It must be sent via the http *POST* method.
     * It must contain a request object in JSON format.
     * The request JSON must contain contain a *query* field and an optional *variables* field: The posted request must contain a query field where the query name is stored. All possible queries are listed under the *Using Queries Topic*.
     * The Content-Type header of the request must be set to *application/json*.

Example:
  ```js
  const URI = 'infospread.herokuapp.com/spread';
  const CONTENT_TYPE = 'application/json';
  const METHOD = 'POST';
  const REQUEST = {
    query: "searchPalettes",
    variables: {
      options: ["deliverables", "users", "systems"]
    }
  }
  // REQUEST must be parsed into JSON
  REQUEST = JSON.stringify(REQUEST);
  return fetch(URI, {
    body: REQUEST,
    method: METHOD, 
    headers: {
      'Content-Type': CONTENT_TYPE
    }
  ).then(response => response.json()); // Server response must be converted from JSON to literal Object
```
  
  **OR**

```js
  const URI = 'infospread.herokuapp.com/spread';
  const CONTENT_TYPE = 'application/json';
  const METHOD = 'POST';
  const REQUEST = {
    query: "searchPalettes",
    variables: {
      options: ["deliverables", "users", "systems"]
    }
  }  
  // REQUEST must be parsed into JSON  
  REQUEST = JSON.stringify(REQUEST);
  return new Promise((resolve, reject) => {
    const ajax = new XMLHttpRequest();
    ajax.open(METHOD, URI, true);
    ajax.setRequestHeader("Content-type", CONTENT_TYPE);
    ajax.send(REQUEST);
    ajax.onprogress = progress;
    ajax.onreadystatechange = () => {
      if(ajax.readyState === 4 && ajax.status === 200) {
        resolve(responseHandler(ajax.responseText)); // Server response must be converted from JSON to literal Object
      }
    }
  }
  ```


### Queries
The queries opened to this API are static. They contain prescribed data requirements and they output specified type of data.  
The queries must be sent in a *JSON* format via *AJAX* or the *FETCH API*. The schema of a valid query is as follows:
#### Query (JSON)
     * **query**: String denoting name of server operation.
     * **variables**: key/value pair of strings or objects.


### Types of Queries
```js
  const Query = `
    type Query {
      onePalette(options: String): Palette
      oneCustomer(options: String): Customer
      oneViewer(options: String): Viewer
      onePlatform(options: String): Platform
      getpalettes(options: object, limit: Int, sort: {fieldName: 'asc' || 'desc'}): [Palette]
      SearchPalettes(tags: [String!], limit: Int, sort: {fieldName: 'asc' || 'desc'}) [Palette]
      getCustomers(options: object, limit: Int, sort: {fieldName: 'asc' || 'desc'}): [Customer]
      getViewers(options: object, limit: Int, sort: {fieldName: 'asc' || 'desc'}): [Viewer]
      getPlatforms(options: object, limit: Int, sort: {fieldName: 'asc' || 'desc'}): [Platform]
      addCustomer(options: object): Customer
      updateCustomer(options: object): Customer
      addPalette(options: [object]): [Palette]
      updatePalette(options: object): Palette
      addViewer(options: object): Viewer
      updateViewer(options: object): Viewer
      addPlatform(options: [object]): [Platform]
      updatePlatform(options: object): Platform
      removeDocs(options: object): Report
      addTags(tags: TagsInput!): Palette!
      removeTags(tags: TagsInput!): Palette!
      addInterests(interests: InterestsInput!): Viewer!
      removeInterests(interests: InterestsInput!): Viewer!
    }
  `;
```


### Using Queries


#### onePalette
``` js
  const REQUEST  = {
    query: 'onePalette',
    variables: {
      options: '1234567890987654321'
    }
  }
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```
The *onePalette* query returns one document of type *Palette* from the API. The query takes a *variables* object with a key of *options* and a value which represents the unique ID! of the document.


#### oneCustomer
``` js
  const REQUEST  = {
    query: 'oneCustomer',
    variables: {
      options: '1234567890987654321'
    }
  }
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```
The **oneCustomer** query returns one document of type *Customer* from the API. The query takes a *variables* object with a key of **options** and a value which represents the unique ID! of the document.


#### oneViewer
``` js
  const REQUEST  = {
    query: 'oneViewer',
    variables: {
      options: '1234567890987654321'
    }
  }
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```

The **oneViewer** query returns one document of type *Viewer* from the API. The query takes a **variables** object with a key of **options** and a value which represents the unique ID! of the document.


#### onePlatform
``` js
  const REQUEST  = {
    query: 'onePlatform',
    variables: {
      options: '1234567890987654321'
    }
  }
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```

The **onePlatform** query returns one document of type *Platform* from the API. The query takes a **variables** object with a key of **options** and a value which represents the unique ID! of the document.


#### getPalettes
``` js
  const REQUEST  = {
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
      sort: {fieldName: 'asc' || 'desc'}
    }
  }
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```

**NB**: This query translates to => SELECT FROM `palettes` WHERE `_id` = String AND `title` = String AND blah blah blah.

The **getPalettes** query returns an array of documents of type **Palette** from the API. The query takes a **variables** object with the following keys:
   * **options**: it takes an object with the keys specified in the example above.
   * **limit**: it takes a Number type value which determines the number of documents to return. By default, the limit is 1000; so you may omit the limit field.
   * **sort**: it takes a key/value object that determines how returned data is arranged. The data collected can arranged in ASC or DESC based on any field in the document. Example: `sort: {_id:'asc'}` based on field '_id' OR `sort: {_id: 'desc'}` based on field '_id'. By default, data is collected from newest to oldest, so you may omit the sort field.

#### searchPalettes
``` js
  const REQUEST  = {
    query: 'searchPalettes',
    variables: {
      options: [String],
      limit: Number,
      sort: {fieldName: 'asc' || 'desc'}
    }
  }
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```

*NB*: This query translates to => SELECT FROM `palettes` WHERE `tags` IN (options).

The *searchPalettes* query returns an array of documents of type *Palette* from the API. The query takes a *variables* object with the following keys:
* options: it takes an array of tags to search against. This query is suited for searching the database against the interests of the viewer.
* limit: it takes a Number type value which determines the number of documents to return. By default, the limit is 1000; so you may omit the limit field.
* sort: it takes a key/value object that determines how returned data is arranged. The data collected can arranged in ASC or DESC based on any field in the document. Example: `sort: {_id:'asc'}` based on field '_id' OR `sort: {_id: 'desc'}` based on field '_id'. By default, data is collected from newest to oldest, so you may omit the sort field.


#### getCustomers
``` js
  const REQUEST  = {
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
      sort: {fieldName: 'asc' || 'desc'}
    }
  }
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```

*NB*: This query translates to => SELECT FROM `customers` WHERE `_id` = String AND `_name` = String AND blah blah blah.

The *getCustomers* query returns an array of documents of type *Customer* from the API. The query takes a *variables* object with the same explanation as mentioned above for *Palettes*


#### getViewers
``` js
  const REQUEST  = {
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
      sort: {fieldName: 'asc' || 'desc'}
    }
  }
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```

*NB*: This query translates to => SELECT FROM `Viewers` WHERE `_id` = String AND `_name` = String AND blah blah blah.

The *getViewers* query returns an array of documents of type *Viewer* from the API. The query takes a *variables* object with the same explanation as mentioned above for *Palettes*


#### getPlatforms
``` js
  const REQUEST  = {
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
      sort: {fieldName: 'asc' || 'desc'}
    }
  }
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```

*NB*: This query translates to => SELECT FROM `Platforms` WHERE `_id` = String AND `_name` = String AND blah blah blah.

The *getPlatforms* query returns an array of documents of type *Platform* from the API. The query takes a *variables* object with the same explanation as mentioned above for *Palettes*


#### addPalettes
``` js
  const REQUEST  = {
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
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```

*NB*: This query translates to => INSERT INTO `Palettes` VALUES (`_id`, `title`, blah blah blah.

The *addPalettes* query returns an array of palette ID!s.


#### addPlatforms
``` js
  const REQUEST  = {
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
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```

*NB*: This query translates to => INSERT INTO `Platform` VALUES (`_id`, `title`, blah blah blah.

The *addPlatform* query returns an array of platform ID!s.

*NB*: The _addPalettes_ and _addPlatforms_ query take an array of values for the _options_ key in the _variables_ object, and they return an array of ID!s


#### addCustomers
``` js
  const REQUEST  = {
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
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```

*NB*: This query translates to => INSERT INTO `Customers` VALUES (`_id`, `_name`, blah blah blah.

The *addCustomers* query returns a Customer ID!.


#### addViewers
``` js
  const REQUEST  = {
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
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```

*NB*: This query translates to => INSERT INTO `Viewers` VALUES (`_id`, `_name`, blah blah blah.

The *addViewers* query returns a Viewer ID!.


#### addTags
``` js
  const REQUEST  = {
    query: 'addTags',
    variables: {
      options: {
        _id: String,
        tags: [String]
      }
    }
  }
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```

*NB*: This query translates to => UPDATE `palettes` SET `tags` = options WHERE `_id` = _id;

The *addTags* query returns a palette ID! and new tags.


#### removeTags
``` js
  const REQUEST  = {
    query: 'removeTags',
    variables: {
      options: {
        _id: String,
        tags: [String]
      }
    }
  }
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```

*NB*: This query translates to => UPDATE `palettes` SET `tags` = null WHERE `_id` = _id;

The *removeTags* query returns a palette ID! and remaining tags.


#### addinterests
``` js
  const REQUEST  = {
    query: 'addinterests',
    variables: {
      options: {
        _id: String,
        interests: [String]
      }
    }
  }
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```

*NB*: This query translates to => UPDATE `viewers` SET `interests` = `[String]` WHERE `_id` = _id;

The *addinterests* query returns a viewer ID! and new interests.


#### removeInterests
``` js
  const REQUEST  = {
    query: 'removeInterests',
    variables: {
      options: {
        _id: String,
        interests: [String]
      }
    }
  }
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```

*NB*: This query translates to => UPDATE `viewers` SET `interests` = null WHERE `_id` = _id;

The *removeInterests* query returns a viewer ID! and remaining interests.


#### updateViewer
``` js
  const REQUEST  = {
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
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```

*NB*: This query translates to => UPDATE `Viewers` SET `_name` = String, `email` = String WHERE `_id` = String...blah blah blah.  
The `_id` is the auto-generated primary key for all documents. Use it as the ultimate identifier for all records.  
The *addViewers* query returns an updated Viewer document.


#### updateCustomer
``` js
  const REQUEST  = {
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
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```

*NB*: This query translates to => UPDATE `Customers` SET `_name` = String, `email` = String WHERE `_id` = String...blah blah blah.  
The `_id` is the auto-generated primary key for all documents. Use it as the ultimate identifier for all records.  
The *addCustomers* query returns an updated Customer document.


#### updatePalette
``` js
  const REQUEST  = {
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
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```

*NB*: This query translates to => UPDATE `Palettes` SET `title` = String, `caption` = String WHERE `_id` = String...blah blah blah.  
The `_id` is the auto-generated primary key for all documents. Use it as the ultimate identifier for all records.  
The *addPalettes* query returns an updated Palette document.


#### updatePlatform
``` js
  const REQUEST  = {
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
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```

*NB*: This query translates to => UPDATE `Platforms` SET `title` = String, `caption` = String WHERE `_id` = String...blah blah blah.  
The `_id` is the auto-generated primary key for all documents. Use it as the ultimate identifier for all records.  
The *addPlatforms* query returns an updated Platform document.


#### removeDocs
``` js
  const REQUEST  = {
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
  REQUEST = JSON.stringify(REQUEST); // convert REQUEST to a JSON object
  const serverResponse = sendQueryAsynchronously(REQUEST);
```

*NB*: This query translates to => DELETE FROM DATABASE WHERE `palette _id` = String, `paltform _id` = String ... blah blah blah.  
The _String_ in the query must point to the `_id` of the document you want to delete. 
The query returns a *boolean* for the type of document removed.


### Server Response
The response of the server to a valid query is a JSON object containing a field named *_data_*. It must be parsed to an object format before use. In the case of an error, the *_data_* field is *_null_* and an *_error_* field is gotten instead giving information about the error.  
The schema of a valid server response is represented below:
``` js
  // If query is successful
  const response = {
    data: __NAME OF QUERY OPERATION__,
    error: null
  }

  // If query is unsuccessful
  const errorResponse = {
    data: null,
    error: __ERROR INFO_
  }
```