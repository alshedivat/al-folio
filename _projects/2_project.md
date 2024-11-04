---
layout: page
title: Flight Ticket Management System in Java
description: This project is a Java application for purchasing airline tickets, connected to a MySQL database, which allows managing clients, flights and reservations through a graphical interface and user roles.
img: assets/img/Progra_Portada.jpg
importance: 2
category: Academic
giscus_comments: false
---

In this project, a Java application was developed using the Object Oriented Programming (OOP) paradigm to manage the purchase of airline tickets. The application was connected to a MySQL database to store and manage customer, flight and ticket information.


**Main Functionalities:** 

**Customer and Flight Registration and Administration:** CRUD (Create, Read, Update, Delete) functionalities were implemented for customers and flights. Customer data includes ID, name, and date of birth, which allows discounts to be calculated when purchasing tickets. For flights, details such as origin, destination, and other specific data are stored.

**Ticket Management:** A class was created to manage tickets, allowing the customer to generate a ticket, verify seat availability, and store the information in the database. Verifications will be included to ensure that the customer is registered, and discounts will be applied for minors or seniors.

**Seat Assignment and Control:** The system differentiates between VIP and tourist class seats, which are identified and marked in the database. The application verifies the occupancy of each seat, which allows for precise management of reservations for each flight.

**User Roles:** Two main roles are configured, the customer role and the administrator role. Both roles have different permissions and accesses in the application, such as the administrator's ability to delete flights or manage customer and flight information through specific graphical interfaces (JFrames).




<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Progra_Login.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Progra_Boleto.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Progra_Cliente.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
Several JFrames are designed to allow user interaction with the system.    
    
**Main Menu:** Provides access to the client and administrator functionalities.    

**Administrator Login:** Protected with username and password.   

**Registration and Ticket Purchase Form:** Allows the client to register and purchase tickets, applying discounts based on the client's data.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Progra_RegistroVuelos.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Flight registration by the administrator.
</div>

The **"Flight Ticket Management System in Java"** database was designed to store all customer, flight, and ticket information. The connection was made through NetBeans and was structured with primary and foreign keys to maintain data integrity. In addition, the interface was updated to make parameterized SQL queries, which improves security and prevents vulnerabilities such as SQL injection.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/Progra_ComprarBoleto.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
  
</div>
<div class="caption">
    The purchase of a ticket by the user.
</div>
