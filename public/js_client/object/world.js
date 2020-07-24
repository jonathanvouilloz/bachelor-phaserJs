let world = {
    tilemap:null,
    tileset:null,
    downLayer:null,
    topLayer:null,
    worldLayer:null,

    initalizeWorld : function(){
        this.tilemap = gameObject.scene.make.tilemap({key:"map"});
        this.tileset = this.tilemap.addTilesetImage("tilesheet", "tiles");
        //layer world
        this.downLayer = this.tilemap.createStaticLayer("bot", this.tileset,0,0);
        this.worldLayer = this.tilemap.createStaticLayer("world", this.tileset,0,0);
        this.topLayer = this.tilemap.createStaticLayer("top", this.tileset,0,0);

        this.worldLayer.setCollisionByProperty({collide : true});

        gameObject.scene.physics.world.setBounds(0,0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);
    },

    manageCollider : function(){
        gameObject.scene.physics.add.collider(gameObject.player.aPlayer, this.worldLayer);
    },

    manageCamera : function(){
        gameObject.scene.cameras.main.startFollow(gameObject.player.aPlayer);
        gameObject.scene.cameras.main.setBounds(0,0,this.tilemap.widthInPixels, this.tilemap.heightInPixels)
    }
}