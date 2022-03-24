import Phaser from 'phaser'

import Game from './scenes/HelloWorldScene'

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 700,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	},
	scene: [Game]
}

export default new Phaser.Game(config)
