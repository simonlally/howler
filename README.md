# Howler

### About
[Check out the deployed app on Heroku!](https://howler-react.herokuapp.com/)  Please be patient as both the front and backend are hosted on Heroku and it may take a few minutes to initially load.  If you receive an error from Heroku please refresh the page and the site should load.
[Check out the repo for the backend here](https://github.com/simonlally/mongo-graphql).

Howler is a social media platform where users post, like, and comment on "howls."  The frontend is built with: [Reactjs](https://github.com/facebook/react), [Semantic-UI](https://github.com/Semantic-Org/Semantic-UI) for styling, and [GraphQL](https://github.com/graphql/graphql-js) to interface with the [Howler API](https://github.com/simonlally/mongo-graphql).  Authentication is handled using a JWT stored in local storage.  

### Requirements
This project requires [Nodejs](https://github.com/nodejs).

### Getting Started
1.  In the root directory run the follow command to install Howler's dependencies:
      ```npm install```.
      
2.  Run ```npm start``` to start the application.

3.  Your default browser should open and redirect to ```localhost:3000```.

### Future Implemenations
- Image storage: users can change their personal avatars as well as add pictures to posts.
- Add search and sort feature for howls.
- Add tags / categories to howls.
