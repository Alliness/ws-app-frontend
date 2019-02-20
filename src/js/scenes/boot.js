
export default class Boot extends Phaser.Scene {

    constructor(){
        super({key : "Boot"});
    }

    init(storage){
        this.storage = storage;
    }

    preload(){
        this.load.image( 'player', './images/next.png');
    }


    create(){
        this.add.text(100, 100, "Boot");
        this.storage.player = this.physics.add.image(200, 200,'player');
    }

}