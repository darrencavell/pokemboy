# Pokemboy

a simplified retro game inspired by pokemon gameboy

all trademarks, logos, brand and names are the property of their respective owners

link: [live website](https://pokemboy.netlify.app/)

**Gameplay GIFS**

![pokemboy-ori](https://user-images.githubusercontent.com/32709094/166911046-fe0981ba-8594-4819-a615-36d1acf49bae.gif)

**Lighthouse**

<img width="1552" alt="Screen Shot 2022-05-05 at 18 25 23" src="https://user-images.githubusercontent.com/32709094/166913811-d4f56832-896e-47e4-b9a2-9ae452bb8448.png">

**Steps**

1. provide simple gameplay that can navigate in the small overworld world
2. user able to move within the world via gamepad or keyboard (wasd, up left down right respectively)
3. set the chances of 50% of encountering wild pokemon when moving, and 50% chances on capturing the wild pokemon, and set their username uniquely
4. user able to see their caught pokemons, and release them
5. user able to see the entire pokemon in the pokedex, and see their details and owned total
6. user able to save their current progress

**Tech Stacks**

1. React with Hooks and Context
2. GraphQL with Apollo Client
3. CSS-in-JS Emotion
4. Jest with React Testing Library
5. PWA

**NB:** for current development phase, the data persist feature only works if you save the current progress within the game menu inside Overworld, it does not save it automatically.