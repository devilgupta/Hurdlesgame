class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(1800,100);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,300);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,400);
    car4.addImage("car4",car4_img);

    cars = [car1, car2, car3, car4];
    ob1=createSprite(800,380);
   obs=[ob1,ob2];


  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getcars_end();
    
    if(allPlayers !== undefined){
      background("#c68767");
      image(map,-displayWidth*4,0,displayWidth*5,displayHeight);
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 180;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayWidth - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("green");
          ellipse(x,y,70,70);
          cars[index - 1].shapeColor = "red";
          camera.position.x = cars[index-1].x
          camera.position.y = displayWidth/2;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance>4000){
      gameState=2;
      player.rank+=1;
      Player.updatecars_end(player.rank);

    }

    drawSprites();
  }
  end(){
    console.log("GAME ENDED!");
    game.update(2);
    console.log(player.rank);

  }
}
