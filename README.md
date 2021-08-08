# webIO

Basic:

1. get basic http server setup to server simple html page ✓
2. add sockets and check that broadcast/emitting works ✓

To do list:

1. change design of background ✓
2. Add randomized food (collectible points) throughout map ✓
3. Increase size of player and decrease speed as they consume food ✓
4. Bigger the player's size, the slower they will go ✓
5. Add a minimum speed, maximum radius ✓
6. Add score attribute to player ✓
7. Collision detection:
   - if player bigger than other player and they overlap (> 50% overlap),
     smaller player dies ✓
8. Send dead players to game over screen -> reconnect screen ✓
9. Add a leaderboard of top 10 players, current position of player, score display
10. Create basic skins, allow user to choose (and create default)
11. Adjust HTML/CSS of main page ✓
12. Add different loading screens for initial render and stop render (when reconnect or death) ✓
13. Add Documentation/Sources
14. Use Databases
    - Store leaderboard records
    - Authentication (account register -> select pre-custom skins)

Extra:

1. User input, change direction accounting for multiple devices, ex: click, touchmove, etc.
2. Create disconnect feature on client side (networking)
3. Fix rendering smallest players to then biggest players on map
4. Add grids as background instead of gradient
5. Remove Radius Cap/Endgame randomness -> Scale screen as player gets bigger, integrate scale to nearby blobs/players
