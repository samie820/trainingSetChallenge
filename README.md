# trainingSetChallenge
Backend server for uploading training set data

Get list training Data - http://ec2-34-220-100-79.us-west-2.compute.amazonaws.com/api/v1/training-set/list?page=<number>&limit=<length of response>
  
 Create/Upload training image - http://ec2-34-220-100-79.us-west-2.compute.amazonaws.com/api/v1/training-set/create
 - Body: 
 ```
 {
  label: "<label text>" TYPE: string,
  [{"key":"trainingData","value":{"0":{}},"description":"","type":"file","enabled":true}]
 }
 ```
 - HEADER:
 ```
  { 'Postman-Token': 'a7b33d91-9356-46bd-b9c9-45a03ac7c457',
     'Cache-Control': 'no-cache',
     Accept: 'application/json',
     'Content-Type': 'multipart/form-data',
     'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
 ```
