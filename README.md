# food-takeout-chatbot

A simple chatbot that can take food orders and store transaction history using the following
express
express-session
nodemon
socket.io

ensure that nodejs is installed. then in a code editor of initalize the application using `npm init`, 
this will create the package.json file that will store the dependencies and store infomation about the application.
For the express module, the express@4 version was installed. All dependencies execpt nodemon was installed using the `npm install` method
To install nodemon, the `npm install --save-dev nodemon` method was used to install as a dev dependency, and set as "dev":"nodemon app" to restart the application as soon as any changes was made.

An app.js file was created and set as the entry point fot the application

in the app.js file, the modules were imported as seen below:


![Screenshot 2023-03-18 194341](https://user-images.githubusercontent.com/106884340/226130596-dfcc4b1a-a052-4e53-a018-138867cdf2c0.png)



server set up as:

![Screenshot 2023-03-18 194246](https://user-images.githubusercontent.com/106884340/226130859-cb327b62-08b9-4d4a-9ed2-598ebcaf0435.png)


and called on as:

![Screenshot 2023-03-18 200539](https://user-images.githubusercontent.com/106884340/226131279-db63fdce-11ad-4f00-a580-624ad3ca110d.png)

to handle the front end a public folder to house the html, css and JavaScript file

to call on and serve the public folder as it is a static file

![Screenshot 2023-03-18 200445](https://user-images.githubusercontent.com/106884340/226131306-36e31c9c-faa8-4224-80bb-428b9348dd1f.png)


to house secret info .env file was created and installed as `npm install dotenv`. This houses the session secret.
create a .gitignore file to store both the .env file and the node_modules folder that was created when we installed the dependencies



to store session history every time a person interacts with the app express-session is called on and set up as follows:


![Screenshot 2023-03-18 200457](https://user-images.githubusercontent.com/106884340/226131363-a22e100a-cdf9-4570-94f3-7c6691ec385e.png)


