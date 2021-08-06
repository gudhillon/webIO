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
6. Collision detection:
   - if player bigger than other player and they overlap (> 50% overlap),
     smaller player dies
7. Send dead players to game over screen -> reconnect screen
8. Add score attribute to player
9. Add a leaderboard of top 10 players, and position of current player as 11th
10. Create basic skins, allow user to choose (and create default)
11. Use Databases
    - Store leaderboard records
    - Authentication (account register -> select pre-custom skins)
12. Adjust HTML/CSS of main page
13. Add different loading screens for initial render and stop render (when reconnect or death)
14. Add potentially spherical grid map
15. Remove Radius Cap/Endgame randomness -> Scale screen as player gets bigger, integrate scale to nearby blobs/players
16. Add Documentation/Sources
