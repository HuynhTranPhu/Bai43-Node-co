/**
 * Sử dụng node co + axios để tải về các đường link sau theo 2 cách:
 */
var urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/todos/3',
    'https://jsonplaceholder.typicode.com/todos/4',
    'https://jsonplaceholder.typicode.com/todos/5'
  ];
  var axios = require('axios');
  var co =require('co');
  function getData(urls) {
    return new Promise(function(resolve,reject){
      var a = axios.get(urls).then(function(response){
      resolve(response.data);
      }).catch(function(err){
        reject(err);
      });
    });
    
  }
  // Cách 1: Sử dụng vòng lặp for
  for(var i=0;i<urls.length;i++)
  axios.get(urls[i]).then(function(response){
   console.log(response.data);
  }).catch(function(err){
    console.log(err);
  });
  
  // Cách 2: Sử dụng array.map
  // Gợi ý: Có thể yield 1 array các Promise
  var readFiles = co.wrap(function*(urls){
    var values = yield urls.map(function(url){
      return getData(url);
    });
    return values
  });
  readFiles(urls).then(function(values){
    console.log(values);
  });
  