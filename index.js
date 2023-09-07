const mineflayer = require('mineflayer')
const mineflayerViewer = require('prismarine-viewer').mineflayer
const { pathfinder, Movements, goals: { GoalNear, GoalPlaceBlock } } = require('mineflayer-pathfinder')
const Vec3 = require('vec3');
const RANGE_GOAL = 1
const bot = mineflayer.createBot({
  host: 'localhost', // minecraft server ip
  username: 'bottest', // minecraft username
  auth: 'offline' // for offline mode servers, you can set this to 'offline'
  // port: 25565,                // only set if you need a port that isn't 25565
  // version: false,             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
  // password: '12345678'        // set if you want to use password-based auth (may be unreliable)
})
bot.loadPlugin(pathfinder)

bot.once('spawn', () => {
  mineflayerViewer(bot, { port: 3000, version: "1.25.0", firstPerson: true }) // port is the minecraft server port, if first person is false, you get a bird's-eye view
  const currentPosition = bot.entity.position;
  mcData = require('minecraft-data')(bot.version);
  console.log(`Posición actual del bot: x=${currentPosition.x}, y=${currentPosition.y}, z=${currentPosition.z}`);
})
bot.on('chat', (username, message) => {
  if (username === bot.username) return

  if (message.startsWith("mine")) {
    let splitedMessge = message.split(" ")
    let vectorr = new Vec3(parseInt(splitedMessge[1]), parseInt(splitedMessge[2]) + 1, parseInt(splitedMessge[3]))
    moveto(new GoalPlaceBlock(vectorr, bot.world, options = { range: 1 }), new Vec3(parseInt(splitedMessge[1])+1, parseInt(splitedMessge[2])+1, parseInt(splitedMessge[3])))
  }

})


async function moveto(goal, pos) {
  const defaultMove = new Movements(bot)
  bot.pathfinder.setMovements(defaultMove)
  bot.pathfinder.setGoal(goal, RANGE_GOAL)
  let moviendose = true
  while (moviendose) {
    console.log(bot.pathfinder.isMoving());
    if (bot.pathfinder.isMoving()) {
      await bot.equip(mcData.itemsByName["diamond_block"].id);
      try {
        let sourceBlock = bot.blockAt(pos);
        let faceVector = { x: 0, y: 1, z: 0 };
        await bot.placeBlock(sourceBlock, faceVector);
        console.log("rere");
      } catch (error) {
        console.log(error);
      }
      moviendose=false
    }
  }
  console.log("salio");
  //mineBlock(1,pos)
}



async function mineBlock(blockType, position) {
  console.log("f")
  const targetBlock = bot.blockAt(position);
  console.log(targetBlock.type)
  if (targetBlock) {
    try {
      await bot.dig(targetBlock)
      bot.chat(`finished digging ${targetBlock.name}`)
    } catch (err) {
      console.log(err.stack)
    }
  } else {
    console.log('No se encontró el bloque objetivo.');
  }
}

function onDigCompleted(err) {
  if (err) {
    console.error('Error al minar:', err);
  } else {
    console.log('Bloque minado exitosamente.');
  }
}

// Log errors and kick reasons:
bot.on('kicked', console.log)
bot.on('error', console.log)