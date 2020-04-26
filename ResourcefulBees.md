#Resourceful Bees
Resourceful bees is a mod directed towards modpack developers to give them a unique way of allowing their players of acquiring resources.

Items and resources in this mod are completely dynamic allowing you to add and remove bees all while playing the game.

####What you can change with this mod:

| Key | Values |
| ----------- | ----------- |
| name | This is what you name the file. Ex: Nether_Quartz.json -> Nether Quartz Bee |
| color | Hex value to assign the bee.
| flower| Flowers you want the bee to be able to pollinate Ex.|
| | minecraft:poppy|
| | forge tag |
| | list of flowers|
| baseBlock | The block you want the bee to change into the new block. Ex. You want to change minecraft:stone into minecraft:iron_ore. This block would be minecraft:stone |
| mutationBlock | The block you want the bee to create. This is the iron ore of the previous example (minecraft:iron_ore)
| centrifugeOutput| The item you want to get from the combs after centrifuge processing. Ex. minecraft:diamond |
| spawnInWorld | True or False value. This is if you want the bee to naturally spawn or not. Set to false if you only want the bee through spawn eggs or breeding |
| dimensionList | Array of dimension IDs you want the bee to spawn in. Ex. [0, -1] |
| biomeList | A comma separated list of biomes you want the bee to be able to spawn in. Ex. minecraft:mesa, minecraft:swamp |

####Example file: Nether_Quartz.json
```json
{
  "color": "#FFF8F7",
  "flower": "minecraft:poppy",
  "baseBlock": "minecraft:netherrack",
  "mutationBlock": "minecraft:nether_quartz_ore",
  "centrifugeOutput": "minecraft:nether_quartz",
  "spawnInWorld": true,
  "dimensionList": [0],
  "biomeList": "not really a biome"
}
```
