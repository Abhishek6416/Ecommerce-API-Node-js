# Ecommerce-API-Node-js

# Overview
This project will deliver a comprehensive e-commerce API set that enables seamless product and category management, user authentication, secure cart management, and order processing. The integration of MongoDB as the database and token management system ensures efficient data storage and user authentication with minimal server-side setup.

## Live/deploy link on the render
https://node-ecom-j5u0.onrender.com

## Installation & Tech Stack

Clone the Repository from GitHub. Then do the following steps:

```bash
    npm init -y

    npm i express mongoose cors bcrypt dotenv jsonwebtoken nodemon express-rate-limit
```
## To run server (PORT = 8080)
```bash
    npm run server
```

## Some HTTP (Hyper Text Transfer Protocol) Status Code Which I used :
     
     200 --->  OK/Success/get/put/Created/post

     500 ---> Not Found/failure

### NOTE: Used Timestamps & Date datatypes which allow by BSON.

## Database Name:
Ecommerce
# Schema

#### 1) *cart-schema*:

Collection Name: cart

- title --> String

- description --> String

- category --> String

- image --> String

- qty --> Number

- price --> String

#### 2) *product-schema*:
  Collection Name: products

   - title --> String

   - description --> String

  - category --> String

  - image --> String

  - price --> Number
  
   
#### 3) *user-schema*:
Collection Name: users

   - name --> String

   - email --> String

   - password --> String

  


#### 4) *payment-schema*:
Collection Name: orders

   - userName --> String

   - paymentId --> String

   - totalAmount --> String


## NOTE: I used Thunder Client Extension for testing all REST APIs.

### Routes / End Points tested by Thunder Client Extension :

#### 1. */api/v1/user-register*: (POST)

###### Sample Input: 

 "name":"siwet",

  "email":"s@gmail.com",

  "password":"1234"
 
##### Output: Success Message and data will store in MongoDB

#### 2.  */api/v1/user-login*: (POST)

if you use the same existing details for login then you got the JWT token, Login Successfully Message and user_id
else you got Wrong Password || Wrong Username || Login failed (according to your wrong credential)

##### Sample Input: 

  "email":"s@gmail.com",

  "password":"1234"
 
##### Output: Success Message and JSON web token

##### Sample Input: 

 "email":"siwet@gmail.com",

  "password":"1234"
##### Output: Wrong Email

##### Sample Input: 

 "email":"s@gmail.com",

  "password":"12345678"
 
##### Output: Wrong Password


#### 3) */api/v1/all-products*: (GET)


##### Output: Retrieves all products and that we have stored in an array for displaying


#### 4) */api/v1/add-cart*: (POST)

##### Sample Input:

{
  "title":"rohit sharma",
  "description":"product no 3",
  "price":"600",
  "category":"abak"
}

##### Output: Success Message and data will store in MongoDB

#### 5) */api/v1/all-carts*: (GET)
##### Output: Retrieves all products and provide jwt token for authorisation

#### 6) */api/v1/single-product/`${id}`*: (GET)
##### output: Retrieves Particular products by id

## NOTE:  For the Below routes pass the token from headers (Required)

#### 7) *api/v1/inc-cart/`${id}`: update quantities* --> (PATCH)
Used for add to cart / Update quantities (default 1 quantity at first addToCart)

##### Input Sample: 
  - productId:"64be95a1f0dd493feb5c8210",
  -  "qty": 3
##### Output:  
{
  "msg": "Product added in cart",
  "cart": {
    "userId": "64be861288ff9ba7252aa32e",
    "products": [
      {
        "productId": "64be95a1f0dd493feb5c8210",
        "quantity": 1,
        "_id": "64beab3bd64361dbbb125fa1"
      }
    ],
    "active": true,
    "_id": "64beab3bd64361dbbb125fa0",
    "modifiedOn": "2023-07-24T16:47:55.609Z",
    "createdAt": "2023-07-24T16:47:55.612Z",
    "updatedAt": "2023-07-24T16:47:55.612Z"
  }
}

#### 8) *api/v1/dec-cart/`${id}`: update quantities* --> (PATCH)

##### Input Sample: 
   - productId:"64be95a1f0dd493feb5c8210",
  -  "qty": 2

##### Output: Particular Product Quantity will be deleted and get updated

#### 9) */api/v1/delete-cart/`${id}`*: (DELETE)

##### Input Sample: 
   - productId:"64be95a1f0dd493feb5c8210",
  -  "qty": 2


##### Output: Particular Quantity will be deleted 
## NOTE: Ignore Payment Gateway Methods API like Razorpay, Braintree, etc.

#### 10) */api/v1/payment*: (POST)

Used for orderconfirmed / Order Placement by particluar authenticated user

##### Input Sample: 

  - "cardNumber":"1234561234561234",,
  - "expireDate":"0224" 
  
##### Output: 

{
  "msg": "OK",
  "newOrder": {
    "userId": "64be861288ff9ba7252aa32e",
    "cartId": "64bebf684ac081d8292327a8",
    "status": [
      "orderconfirmed"
    ],
    "currentStatus": "orderconfirmed",
    "priceTotal": 36,
    "paymentMethod": "Net Banking",
    "DeliveryAdress": "Kanpur UP",
    "OrderDelivered": false,
    "DeliveryDate": "29/07/2023",
    "_id": "64bf4d78a141a7319b7aa1e7",
    "createdAt": "2023-07-25T04:20:08.451Z",
    "updatedAt": "2023-07-25T04:20:08.451Z"
  }
}


## NOTE:  API rate limiting to prevent abuse and maintain server stability.

API RATE LIMIT used for the amount of time and no.of req valid for your application.

middleware --> express-rate-limit

##### Example Which I set in this assignment: 
 - max: 2, //no. of req users can make within the time
 - windowMs: 60000  // time frame in (ms)

After 60000ms you got the Error: "Too many requests, please try again later" with a 500 status code if you try to make more than 2 requests.
##### So Finally you can make 2 requests in 1 Minute.
