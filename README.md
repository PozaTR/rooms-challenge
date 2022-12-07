# rooms-challenge

## Project setup
install NodeJs. Preferably lts/erbium (v12) 
```
git clone git@github.com:PozaTR/rooms-challenge.git
npm install
```

## Decissions taken
- I decided to store two different entities: floor and room. First of them groups the other and just have an id to point them out. Doing that we can handle changes in room entities without updating floor info, and vice versa.
- To allow a direct access to a floor, I've set vue-router and the id from the path param is used to request info from API.
- Because of that reason, and as we need to request a list of rooms available first from the API, an empty view is show when the user lands in the root url. Then when the list is received, the browser replaces that route to the first floor available.
- As all the api calls was based on ApiMocha and it was unstable sometimes, I decided to fake this errors and send the same response from json files placed within the project.

## Challenges achieved
- Handling use cases when the floor is not already stored, cause the call requesting the list of them delays more than a detail from a certain floor.
- As I wanted to explore it, the usage of Vue3 + Typescript was an adventure itself. 
