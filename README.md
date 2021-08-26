# webIO - Simple Agar.io Clone

![Picture](https://user-images.githubusercontent.com/66855895/128808819-e3f98f31-26e3-4ac8-b535-6dc0a4b1d978.png)

https://user-images.githubusercontent.com/66855895/131027176-fcea7b8a-dfd1-425f-af75-0a34319bc3a6.mov

Welcome! The objective of this project is to replicate the popular io game, [Agar.io](https://en.wikipedia.org/wiki/Agar.io) as best as possible. The project is using express to power the web server, html5 canvas to render the game, and socket.io to establish communication between the browser and server.

I was inspired from the [The Coding Train](https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw) and [Victor Zhou's](https://victorzhou.com/) io programming tutorials to go above and beyond by trying to replicate Agar.io. I learned the fundamentals of web development in terms of multiplayer games through this process.

<h4 align="center">
  <a href="https://agent-name-d156c.uc.r.appspot.com">Play Agar.io Clone Here</a>
</h4>

NOTE: gcloud application is currently running slowly, so I would recommend the local setup below in order to best demo the game.

## Description

The objective of this game is to consume as many blobs and players on the map to increase your score and size. I made a bit of a twist to this agar.io clone where once you reach a certain radius/speed, you are capped between that radius/speed and some arbitruary limit above that radius/speed. Furthermore, everytime you consume a blob or player at that point, your speed and radius is slightly altered. You can still increase your score normally and try to reach the top, but that comes with a risk that in order to increase your score, you must also be willing to alter your speed and size. This will create an interesting endgame dynamic between the players.

I created the map and display with a mix of UI styles from agar.io and slither.io (another popular io game). We have a grid layout very similar to Agar.io, though the borders are easily visible (red color), much like the borders in slither.io. In terms of the rank/leaderboard display, its also very similar to slither.io, since I believe its better to display the score of each user on the leaderboard as compared to agar.io.

## Installation

First, setup [Node](https://nodejs.org/en/download/) and [NPM](https://docs.npmjs.com/getting-started). Afterwards, follow the process below.

```
% git clone https://github.com/gudhillon/webIO.git
% cd webIO
% npm install
```

## Usage

```
% npm run develop
```

Then visit [localhost:3000](http://localhost:3000/).

In terms of a production setting, we can do the following.

```
% npm run build
% npm start
```

## Agar.io clone tasks

Here are the list of tasks that I created for myself to record my progress.

- [x] Foundational IO Tasks:

  - [x] get basic http server setup to server simple html page
  - [x] add sockets and check that broadcast/emitting works
  - [x] canvas rendering views relative to position

- [x] Main Tasks:

  - [x] change design of background
  - [x] Add randomized food (collectible points) throughout map
  - [x] Increase size of player and decrease speed as they consume food
  - [x] Bigger the player's size, the slower they will go
  - [x] Add a minimum speed, maximum radius
  - [x] Add score attribute to player
  - [x] Collision detection:
    - [x] if player bigger than other player and they overlap (> 50% overlap),
          smaller player dies
  - [x] Send dead players to game over screen -> reconnect screen
  - [x] Add a leaderboard of top 10 players, current position of player, score display
  - [x] Adjust HTML/CSS of main page
  - [x] Add different loading screens for initial render and stop render (when reconnect or death)
  - [x] Add Documentation/Sources

- [ ] Optional Tasks:

  - [ ] Highlight current player on leaderboard
  - [ ] Create basic skins, allow user to choose (and create default)
    - Path: index.html -> index.js -> networking.js -> server.js -> game.js -> player.js -> render.js
  - [ ] Use Databases
    - Store leaderboard records
    - Authentication (account register -> select pre-custom skins)
  - [ ] User input, change direction accounting for multiple devices, ex: click, touchmove, etc.
  - [ ] Create disconnect feature on client side (networking)
  - [ ] Fix rendering smallest players to then biggest players on map
  - [x] Add grids as background instead of gradient
  - [ ] Remove Radius Cap/Endgame randomness -> Scale screen as player gets bigger, integrate scale to nearby blobs/players
  - [ ] Do not show portion of player that is out of bounds

## Sources

- [The Coding Train - Basic Game Mechanics](https://www.youtube.com/watch?v=JXuxYMGe4KI&ab_channel=TheCodingTrain)
- [The Coding Train - Basics of using socket.io and node.js](https://www.youtube.com/watch?v=ZjVyKXp9hec&ab_channel=TheCodingTrain)
- [Victor Zhou - Creating io foundation pt1, client side programming](https://victorzhou.com/blog/build-an-io-game-part-1/)
- [Victor Zhou - Creating io foundation pt2, server side programming](https://victorzhou.com/blog/build-an-io-game-part-2/)
- [Agar.io mechanics explained in depth](https://www.reddit.com/r/Agario/comments/34x2fa/game_mechanics_explained_in_depth_numbers_and/)
- [Understanding how to draw agar.io grid map](https://stackoverflow.com/questions/4172246/grid-drawn-using-a-canvas-element-looking-stretched)
- [Using Lodash escape to display usernames](https://www.geeksforgeeks.org/lodash-_-escape-method/)
- [Understanding function.prototype.bind with null as argument](https://stackoverflow.com/questions/27654149/function-prototype-bind-with-null-as-argument)
- [Playing Agar.io to gain a further understanding of how game works](https://agar.io/)
- [Background of initial screen](https://backgroundcheckall.com/agario-background-6-2/)

## License

This Project is distributed under the [MIT License](https://mit-license.org/). Copyright for portions of project webIO are held by [Victor Zhou, 2019] as part of project [example-.io-game](https://github.com/vzhou842/example-.io-game). All other copyright for project webIO are held by [Gurpreet Dhillon, 2021]. See [LICENSE](https://github.com/gudhillon/webIO/blob/main/LICENSE) for more information.
