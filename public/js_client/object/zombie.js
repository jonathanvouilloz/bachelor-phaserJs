let zombie = {
    aZombie:null,

    createZombie : function(){
        this.aZombie = gameObject.scene.physics.add.sprite(400, 350, "zombie", "zombie_stand");
        this.aZombie.setCollideWorldBounds(true);
        this.aZombie.setOrigin(0.5, 1)
    },

    generateZombieAnimations: function () {
        gameObject.scene.anims.create({
            key: "zombieWalk",
            frames: game.anims.generateFrameNames("zombie", { prefix: "zombie_walk", start: 1, end: 2 }),
            frameRate: 5,
            repeat: -1
        });
    },

    destroyZombie: function(){
        this.aZombie.destroy();
    },

    generateMovingZombie : function(){
        this.aZombie.anims.play("zombieWalk");
        let tween = gameObject.scene.tweens.add({
            targets: this.aZombie,
            x:500,
            ease: "Linear",
            duration:1200,
            yoyo:true,
            repeat:-1,
            onStart : function(){},
            onComplete : function(){},
            onYoyo : function(){gameObject.zombie.aZombie.flipX = !gameObject.zombie.aZombie.flipX},
            onRepeat : function(){gameObject.zombie.aZombie.flipX = !gameObject.zombie.aZombie.flipX}
        })
    }
}