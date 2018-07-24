# ionic-todo
Code snippets from an Ionic phone app I created at home. My goals were to learn how to write an Ionic application, use some native phone functionality (like the calendar and pedometer), and deploy a real app to my phone to test these out. 

Ionic is a Typescript wrapper for Cordova which is a open-source mobile development framework that allows developers to write phone applications using web technologies.

## Main functions
### Todo List
- Create/delete a Todo List
- Reorder these lists
- Add new items to a Todo List
- Edit list items
- Delete list items
- Check these items as done
- Reorder the list items

### Upcoming Events 
- Pulls calendar events from the phones native calendar 
- View events from within the app

### Step Counter
- Records steps taken whilst the app is running
- Adds these towards a goal and calculates the percentage
- Displays a cat sprite that walks whilst the user is walking

## Technologies

### Developed with:
- Ionic
- Ionic Native
- HTML5
- CSS3
- Javascript ES6
- Angular
- Cordova
- Webpack
- Sass
- Typescript 
- UUID

### Tested with:
- Karma
- Jasmine
- ionic-mocks

## Challenges
The main challenge I faced whilst playing around with Ionic is that testing code that uses native phone elements is very difficult when not actually running the app natively. These makes developing on a laptop much slower as code has to be deployed to a real phone after each change. The structure of objects received from the Android platform can vary depending on the Android version, and the phone model. Ionic also supports iOS native however I didn't have an iphone to test with.

I ended up writing debug statements to display the objects received from my phones particular native Android platform, then I would build the code into a debug apk and then deploy it on my phone to view these objects. 

This also makes writing unit tests a little more difficult as these native elements also have to be mocked, some libraries like ionic-mocks exist however they are fairly limited.

