const mineflayer = require('mineflayer')
const mineflayerViewer = require('prismarine-viewer').mineflayer
const bot = mineflayer.createBot({
  host: 'localhost', // minecraft server ip
  username: 'bottest', // minecraft username
  auth: 'offline' // for offline mode servers, you can set this to 'offline'
  // port: 25565,                // only set if you need a port that isn't 25565
  // version: false,             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
  // password: '12345678'        // set if you want to use password-based auth (may be unreliable)
})
bot.once('spawn', () => {
    mineflayerViewer(bot, { port: 3000, version:"1.25.0" }) // port is the minecraft server port, if first person is false, you get a bird's-eye view
    const currentPosition = bot.entity.position;
    console.log(`Posición actual del bot: x=${currentPosition.x}, y=${currentPosition.y}, z=${currentPosition.z}`);
  })
bot.on('chat', (username, message) => {
  if (username === bot.username) return
  bot.chat(message)
})


// Log errors and kick reasons:
bot.on('kicked', console.log)
bot.on('error', console.log)