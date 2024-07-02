# Rest Api NodeJS

This project is a REST API implementation designed to efficiently manage databases using cURL.

## Retrieving All Data from Table
```
curl -X GET http://localhost:3000/api/{name_table}
```
## Retrieving Data Based on ID (Rule: column name required id)
```
curl -X GET http://localhost:3000/api/{name_table}/{id}
```

## Adding Data to a Table
```
curl -X POST http://localhost:3000/api/{name_table} \
     -H "Content-Type: application/json" \
     -d '{"colom": "value"}'
```

## Updating Data Based on ID (Rule: column name required id)
```
curl -X PUT http://localhost:3000/api/{name_table}/{id} \
     -H "Content-Type: application/json" \
     -d '{"colom": "value"}'
```

## Deleting Data Based on ID (Rule: column name required id)
```
curl -X DELETE http://localhost:3000/api/{name_table}/{id}
```

## Displaying Data From Join Table
```
curl -X GET http://localhost:3000/api/{name_table1},{name_table2}, more...
```

## Instalation
```
git clone https://github.com/fitri-hy/rest-api-nodejs.git
cd rest-api-nodejs
npm install
npm start
```