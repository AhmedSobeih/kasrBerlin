Project Title:
--------------

Flight Reservation Systsem
The purpose of the project, is to create a complete Airline Reservation System, that is, a web application
for flights in order to travel to different cities. The system has an admin whose job is to manage the
flights that are reserved by the registered users or viewed by the guests.
```
```
Project Motivation:
---------------
This project was implemented as a method to learn and make use of the MERN stack (MongoDB,
Express JS, React JS and Node JS). 
```
```
Build Status:
---------------
This project assumes that a user is consistent in his choice of the cabin class and the number of passengers
he wants to reserve. This means that when he/she chooses the seats class to be economy class. The system assumes
the user will indeed choose economy seats when the time comes to choose. When he chooses to reserve a trip, say
for one adult and one child, the system expects the user to choose exactly two seats. Any incosistency may result
in an error.
```
```
Framework Used:
--------------
This project was implemented using the MERN stack (MongoDB,
Express JS, React JS and Node JS). The project made use of:
-Nodemailer to notify a registered user of his activity and reservations by sending him emails. 
-Jsonwebtoken that helped in authorization of the user.
-Stripe.js was used to handle the payment of the user whenever reserving or changing a flight.
-Bootstrap@4.0.0 was used to style the html pages.
The project was done in the agile methodology and was divied into 3 sprints.
```
```
Features:
--------------
This system allows the admin to:
1-Create a new flight in the system with specified features and add it to the database. 
2-List any of the available flights with or without a search criteria. 
3-Update or delete any of the available flights.  

This system allows a registered user to:
1-View the available round trips (departure and return flights) based on his preferences.
2-Specify the class and the places of the seats he/she wants to reserve.
3-Reserve a specific round trip including the payment and confirmation processes.  
4-Change any flight he/she reserved.
5-Change the seats reserved in any of the flights reserved.  

This system allows a guest user to:
1-Register to become a user with an account that allows him to reserve flights.
2-View the available round trips (departure and return flights) based on his preferences.
```
```
Installations:
--------------
In order to run the project you need to type install the project dependencies by typing "npm install" in two directories:<--  
1- kasrBerlin/
to install dependencies of the frontend
2- kasrBerlin/Backend/
to install dependencies of the backend
```
```
How to Run?
---------------
To run the frontend code:
cd kasrBerlin 
cd src
npm start

to run the backend code:
cd KasrBerlin
cd Backend
node app
```
```
Tests:
---------------
In order to test the features of the system, the following journey isrecommended:
1-Login using username: 'Adminstrator' and password: 'Adminstrator'. This will login as an admin.
2-Press on create flight button and start entering the properties of the created flight. It is recommended to 
create two flights in order to reserve a round trip later in the journey.
3-Register a new user with a new username and password.
4-Login using the username and passwords you registered with.
5-Press on reserve a trip and follow the whole path to reserve this trip. 
6-When it comes to payment, type in the card number as 4242 4242 4242 4242, expiry date: 02/22 and 222.
7-Once reserving the trip you can go to view reservations and change either the whole flights reserved or the just the
seats reserved.
```
