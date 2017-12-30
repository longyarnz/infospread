# Using Queries

## Author
* Name: Ayodele Olalekan
* Email: longyarnz@gmail.com


### API Endpoints

There are following endpoints (2) exposed to the API:
1) **infospread.herokuapp.com/api/_xxxx_**: There are 4 options for the *xxxx* fields:
     * **infospread.herokuapp.com/api/customers** loads all the customer data in the database.
     * **infospread.herokuapp.com/api/palettes** loads all the palette data in the database.
     * **infospread.herokuapp.com/api/platforms** loads all the platform data in the database.
     * **infospread.herokuapp.com/api/viewers** loads all the viewer data in the database.

2) **infospread.herokuapp.com/spread**: This endpoint collects queries and executes them against the database. When a request is sent to the API, it validates the request and sends it to the Mongo server.  
Prerequisites for a valid request are:
     * It must be sent via the http **POST** method.
     * It must contain a request object in JSON format.
     * The request JSON must contain contain a **query** field and an optional **variables** field: The posted request must contain a query field where the query name is stored. All possible queries are listed under the *Using Queries Topic*.
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
The **onePalette** query returns one document of type **Palette** from the API. The query takes a **variables** object with a key of **options** and a value which represents the unique ID! of the document.


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
The **oneCustomer** query returns one document of type *Customer* from the API. The query takes a **variables** object with a key of **options** and a value which represents the unique ID! of the document.


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

The **onePlatform** query returns one document of type **Platform** from the API. The query takes a **variables** object with a key of **options** and a value which represents the unique ID! of the document.


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

**NB**: This query translates to => SELECT FROM `palettes` WHERE `_id` = **String** AND `title` = **String** AND blah blah blah.

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

**NB**: This query translates to => SELECT FROM `palettes` WHERE `tags` IN (options).

The **searchPalettes** query returns an array of documents of type **Palette** from the API. The query takes a **variables** object with the following keys:
* **options**: it takes an array of tags to search against. This query is suited for searching the database against the interests of the viewer.
* **limit**: it takes a Number type value which determines the number of documents to return. By default, the limit is 1000; so you may omit the limit field.
* **sort**: it takes a key/value object that determines how returned data is arranged. The data collected can arranged in ASC or DESC based on any field in the document. Example: `sort: {_id:'asc'}` based on field '_id' OR `sort: {_id: 'desc'}` based on field '_id'. By default, data is collected from newest to oldest, so you may omit the sort field.


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

**NB**: This query translates to => SELECT FROM `customers` WHERE `_id` = **String** AND `_name` = **String** AND blah blah blah.

The **getCustomers** query returns an array of documents of type **Customer** from the API. The query takes a **variables** object with the same explanation as mentioned above for **Palettes**


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

**NB**: This query translates to => SELECT FROM `Viewers` WHERE `_id` = **String** AND `_name` = **String** AND blah blah blah.

The **getViewers** query returns an array of documents of type **Viewer** from the API. The query takes a **variables** object with the same explanation as mentioned above for **Palettes**


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

**NB**: This query translates to => SELECT FROM `Platforms` WHERE `_id` = **String** AND `_name` = **String** AND blah blah blah.

The **getPlatforms** query returns an array of documents of type **Platform** from the API. The query takes a **variables** object with the same explanation as mentioned above for **Palettes**


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

**NB**: This query translates to => INSERT INTO `Palettes` VALUES (`_id`, `title`, blah blah blah.

The **addPalettes** query returns an array of palette ID!s.


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

**NB**: This query translates to => INSERT INTO `Platform` VALUES (`_id`, `title`, blah blah blah.

The *addPlatform* query returns an array of platform ID!s.

**NB**: The **addPalettes** and **addPlatforms** query take an array of values for the **options** key in the **variables** object, and they return an array of ID!s


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

**NB**: This query translates to => INSERT INTO `Customers` VALUES (`_id`, `_name`, blah blah blah.

The **addCustomers** query returns a Customer ID!.


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

**NB**: This query translates to => INSERT INTO `Viewers` VALUES (`_id`, `_name`, blah blah blah.

The **addViewers** query returns a Viewer ID!.


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

**NB**: This query translates to => UPDATE `palettes` SET `tags` = options WHERE `_id` = _id;

The **addTags** query returns a palette ID! and new tags.


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

**NB**: This query translates to => UPDATE `palettes` SET `tags` = null WHERE `_id` = _id;

The **removeTags** query returns a palette ID! and remaining tags.


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

**NB**: This query translates to => UPDATE `viewers` SET `interests` = `[String]` WHERE `_id` = _id;

The **addinterests** query returns a viewer ID! and new interests.


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

**NB**: This query translates to => UPDATE `viewers` SET `interests` = null WHERE `_id` = _id;

The **removeInterests** query returns a viewer ID! and remaining interests.


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

**NB**: This query translates to => UPDATE `Viewers` SET `_name` = String, `email` = String WHERE `_id` = **String**...blah blah blah.  
The `_id` is the auto-generated primary key for all documents. Use it as the ultimate identifier for all records.  
The **addViewers** query returns an updated Viewer document.


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

**NB**: This query translates to => UPDATE `Customers` SET `_name` = String, `email` = String WHERE `_id` = **String**...blah blah blah.  
The `_id` is the auto-generated primary key for all documents. Use it as the ultimate identifier for all records.  
The **addCustomers** query returns an updated Customer document.


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

**NB**: This query translates to => UPDATE `Palettes` SET `title` = String, `caption` = String WHERE `_id` = **String**...blah blah blah.  
The `_id` is the auto-generated primary key for all documents. Use it as the ultimate identifier for all records.  
The **addPalettes** query returns an updated Palette document.


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

**NB**: This query translates to => UPDATE `Platforms` SET `title` = String, `caption` = String WHERE `_id` = **String**...blah blah blah.  
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

**NB**: This query translates to => DELETE FROM DATABASE WHERE `palette _id` = String, `paltform _id` = String ... blah blah blah.  
The **String** in the query must point to the `_id` of the document you want to delete. 
The query returns a **boolean** for the type of document removed.