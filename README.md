# Agar.io clone tasks

- [x] Foundational IO Tasks:

  - [x] get basic http server setup to server simple html page
  - [x] add sockets and check that broadcast/emitting works

- [ ] Main Tasks:

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
  - [ ] Add Documentation/Sources

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

# License

This Project is distributed under the [MIT License](https://mit-license.org/). Copyright for portions of project webIO are held by [Victor Zhou, 2019] as part of project [example-.io-game](https://github.com/vzhou842/example-.io-game). All other copyright for project webIO are held by [Gurpreet Dhillon, 2021]. See [LICENSE](https://github.com/gudhillon/webIO/blob/main/LICENSE) for more information.
