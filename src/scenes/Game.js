import Phaser from 'phaser'
import { debugDraw } from '../utils/debug'
import { createLizardAnims } from '../anims/EnemyAnims'
import { createCharacterAnims } from '../anims/CharacterAnims'
import Lizard from '../enemies/Lizard'

let gamestate = {}

export default class Game extends Phaser.Scene {

    // 

    constructor() {
        super('game')
    }

    preload() {

    }

    create() {
        createCharacterAnims(this.anims)
        createLizardAnims(this.anims)
        gamestate.cursors = this.input.keyboard.createCursorKeys()

        const map = this.make.tilemap({ key: 'dungeon' })
        const tileset = map.addTilesetImage('dungeon', 'tiles')
        map.createLayer('Floor', tileset)
        const wallsLayer = map.createLayer('Walls', tileset)

        wallsLayer.setCollisionByProperty({ collides: true })

        // debugDraw(wallsLayer, this)

        gamestate.faune = this.physics.add.sprite(128, 128, 'faune', 'walk-down-3.png')
        gamestate.faune.body.setSize(gamestate.faune.width * 0.5, gamestate.faune.height * 0.8)
        gamestate.faune.anims.play('faune-idle-down')

        gamestate.lizards = this.physics.add.group({
            classType: Lizard, createCallback: (go) => {
                const lizGo = go
                lizGo.body.onCollide = true
            }
        })
        gamestate.lizards.get(256, 100, 'lizard')

        this.physics.add.collider(gamestate.faune, wallsLayer)
        this.physics.add.collider(gamestate.lizards, wallsLayer)
        this.cameras.main.startFollow(gamestate.faune, true)


    }

    update(t, dt) {
        const speed = 100
        if (gamestate.cursors.left.isDown) {
            gamestate.faune.anims.play('faune-run-side', true)
            gamestate.faune.setVelocity(-speed, 0)
            gamestate.faune.scaleX = -1
            gamestate.faune.body.offset.x = 24
        } else if (gamestate.cursors.right.isDown) {
            gamestate.faune.anims.play('faune-run-side', true)
            gamestate.faune.setVelocity(speed, 0)
            gamestate.faune.scaleX = 1
            gamestate.faune.body.offset.x = 8
        } else if (gamestate.cursors.up.isDown) {
            gamestate.faune.anims.play('faune-run-up', true)
            gamestate.faune.setVelocity(0, -speed)
        } else if (gamestate.cursors.down.isDown) {
            gamestate.faune.anims.play('faune-run-down', true)
            gamestate.faune.setVelocity(0, speed)
        } else {
            const parts = gamestate.faune.anims.currentAnim.key.split('-')
            parts[1] = 'idle'
            gamestate.faune.anims.play(parts.join('-'))
            gamestate.faune.setVelocity(0, 0)
        }
    }
}
