import Phaser from "phaser";
const Direction = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
}

export default class Lizard extends Phaser.Physics.Arcade.Sprite {

    constructor(Scene, x, y, texture, frame) {
        super(Scene, x, y, texture, frame)
        this.anims.play('lizard-run')
        this.direction = Direction.DOWN
        this.speed = 50
        this.scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileCollision, this)
        this.moveEvent = this.scene.time.addEvent({
            delay: 2000,
            callback: () => {
                this.direction = this.randomDirection()
            },
            loop: true
        })
    }

    destroy = (fromScene) => {
        this.moveEvent.destroy()
        super.destroy(fromScene)
    }

    handleTileCollision = (GameObject, tile) => {
        if (GameObject !== this) {
            return
        }

        this.direction = this.randomDirection()
    }

    randomDirection = (exclude) => {

        let newDirection = Phaser.Math.Between(0, 3)
        while (newDirection === exclude) {
            newDirection = Phaser.Math.Between(0, 3)
        }
        return newDirection
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt)

        switch (this.direction) {
            case Direction.UP:
                this.setVelocity(0, -this.speed)
                break

            case Direction.DOWN:
                this.setVelocity(0, this.speed)
                break

            case Direction.LEFT:
                this.setVelocity(-this.speed, 0)
                break

            case Direction.RIGHT:
                this.setVelocity(this.speed, 0)
                break

        }
    }
}