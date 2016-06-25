/// <reference path="level.ts"/>
/// <reference path="playerone.ts" />
/// <reference path="playertwo.ts" />


class Game {
    
    private score:number = 0;   
    private level:Level;
    
    private playerone:Playerone;
    private playertwo:Playertwo;
    
    private utils:Utils;
    
    private timeid:number;
    private numelements:number;
    
    constructor() {
        
        this.numelements = 0;
        this.timeid = setInterval(this.createElements.bind(this),50);
        this.level = new Level(this);
        this.playerone = new Playerone(65, 68, 87, 83);
        this.playertwo = new Playertwo(37, 39, 38, 40);
            
        this.utils = new Utils();
            
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    
    public updateScore(i:number){
        this.score += i;
    }
    
    private gameLoop(){
        this.playerone.move();
        this.playertwo.move();
        
        this.level.update();
        this.level.draw();
        
        let hit:boolean = this.utils.objectsCollide(this.playerone, this.playertwo);
               
        this.playerone.showHit(hit);
        this.playertwo.showHit(hit);
               
        // hiermee wordt de gameloop opnieuw aangeroepen
        requestAnimationFrame(this.gameLoop.bind(this));
     }
     
     private createElements():void {
         
         let snotspawn:Snotspawn = new Snotspawn();
         
         this.numelements++;
         if(this.numelements > 100){
             clearInterval(this.timeid);
         }
     }
} 

