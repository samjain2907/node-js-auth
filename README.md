## Will be using MVC approach for this. This means that we will be extracting all the auth, routes and handler functions into a separate auth control file which helps in  organisation of our code.
During the development process I have used postman to simulate requests and response which aids in development.
Same routes can be handled differently with different requests.
I have used hashing algorithm to hash the password before saving it to the database. It was achieved by firing a monogoose hooks function and a third party library called bcrypt.
Cookies stores data in the user's browser.
Authentication using Cookies and JWT have some pitfalls. If we have state changing endpoints then we need to take care of CSRF. (Need to study this in detail).
JWT token is an encoded long string of characters which consists of three parts which are the Header, Payload and the Signature.
