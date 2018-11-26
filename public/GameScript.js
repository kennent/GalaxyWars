function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class Rect {
    constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class GameObject {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.collisionRect = new Rect();
    }
}

class Sprite extends GameObject {
    constructor(game, sourceImageRect,imageType, obj) {
        super();
        this.game = game;
        this.imageRect = sourceImageRect;
        this.imageType = imageType;
        this.camera = game.mainCamera;
        this.obj = obj;
        this.rot = 0;
    }

    render() {
        if(this.imageType === "UI"){
            let { x, y, width, height } = this.imageRect;
    
            this.game.context.drawImage(this.game.bullet_image,
                x, y, width, height,
                (this.game.canvas.width/2 - this.game.player1.x + this.x), 
                (this.game.canvas.height/2 - this.game.player1.y + this.y), 
                width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
            );
        }

        else if(this.imageType === "EllipseGalaxy"){
            let { x, y, width, height } = this.imageRect;
    
            this.game.context.drawImage(this.game.EllipseGalaxy_Image[this.obj.owner],
                x, y, width, height, 
                (this.camera.x + this.x),
                (this.camera.y + this.y),
                width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
            );
        }
        else if(this.imageType === "LensGalaxy"){
            let { x, y, width, height } = this.imageRect;
    
            this.game.context.drawImage(this.game.LensGalaxy_Image[this.obj.owner],
                x, y, width, height, 
                (this.camera.x + this.x),
                (this.camera.y + this.y),
                width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
            );
        }

        else if(this.imageType === "StickGalaxy"){
            let { x, y, width, height } = this.imageRect;
    
            this.game.context.drawImage(this.game.StickGalaxy_Image[this.obj.owner],
                x, y, width, height, 
                (this.camera.x + this.x),
                (this.camera.y + this.y),
                width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
            );
        }

        else if(this.imageType === "SpiralGalaxy"){
            let { x, y, width, height } = this.imageRect;
    
            this.game.context.drawImage(this.game.SpiralGalaxy_Image[this.obj.owner],
                x, y, width, height, 
                (this.camera.x + this.x),
                (this.camera.y + this.y),
                width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
            );
        }

        else if(this.imageType === "ChemicalSpaceShip"){
            let { x, y, width, height } = this.imageRect;
    
            this.game.context.drawImage(this.game.ChemicalSpaceShip_Image[this.obj.owner - 1],
                x + this.rot * width, y, width, height, 
                (this.camera.x + this.x),
                (this.camera.y + this.y),
                width * UntitledGame.config.SCALE * 0.65, height * UntitledGame.config.SCALE * 0.65
            );
        }

        else if(this.imageType === "ChemicalBullet"){
            let { x, y, width, height } = this.imageRect;
            
            this.game.context.drawImage(this.game.ChemicalBullet_Image[this.obj.owner - 1],
                x + this.rot * width, y, width, height, 
                (this.camera.x + this.x),
                (this.camera.y + this.y),
                width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
            );
        }

        else if(this.imageType === "Explain_Panel"){
            let { x, y, width, height } = this.imageRect;

            this.game.context.drawImage(this.game.ExplainPanel_Image,
                x, y, width, height, 
                0, this.game.canvas.height - this.game.canvas.width * UntitledGame.config.Panel_Height_RATE,
                this.game.canvas.width, 
                this.game.canvas.width * UntitledGame.config.Panel_Height_RATE
            );
        }

        else if(this.imageType === "Bang"){
            let { x, y, width, height } = this.imageRect;

            this.game.context.drawImage(this.game.BangParticle_Image,
                x, y, width, height, 
                (this.camera.x + this.x),
                (this.camera.y + this.y),
                width * UntitledGame.config.SCALE, height * UntitledGame.config.SCALE
            );
        }

        else if(this.imageType === "SpaceMine"){
            let { x, y, width, height } = this.imageRect;

            this.game.context.drawImage(this.game.SpaceMine_NonActive_Image,
                x, y, width, height, 
                (this.camera.x + this.x),
                (this.camera.y + this.y),
                width * UntitledGame.config.SCALE * 0.4, height * UntitledGame.config.SCALE * 0.4
            );
        }

        else if(this.imageType === "SpaceMineActive"){
            let { x, y, width, height } = this.imageRect;

            this.game.context.drawImage(this.game.SpaceMine_Active_Image,
                x, y, width, height, 
                (this.camera.x + this.x),
                (this.camera.y + this.y),
                width * UntitledGame.config.SCALE * 0.4, height * UntitledGame.config.SCALE * 0.4
            );
        }
    }

    update(deltaTime) {
        
    }

    get width() {
        return this.imageRect.width;
    }

    get height() {
        return this.imageRect.height;
    }
}
class Animation extends Sprite {
    constructor(game, sourceImageRect, imageType, totalFrame, fps, obj) {
        super(game, sourceImageRect, imageType, obj);

        this.imageType = imageType;
        this.frames = [];
        this.currentFrame = 0;
        this.totalFrame = totalFrame;
        this.fps = fps;

        // 스프라이트 시트 상에서 항상 옆으로 이어져 있으니 야매로
        for (let i = 0; i < this.totalFrame; ++i) {
            this.frames[i] = new Rect(
                sourceImageRect.x + i * sourceImageRect.width,
                sourceImageRect.y,
                sourceImageRect.width,
                sourceImageRect.height
            );
        }

        this.imageRect = this.frames[0];
    }

    update(deltaTime) {
        this.currentFrame += deltaTime * this.fps;

        let frameToRender = Math.floor(this.currentFrame);

        if (frameToRender >= this.totalFrame) {
            this.currentFrame = frameToRender = 0;
        }

        this.imageRect = this.frames[frameToRender];
    }
}
class Line extends Sprite {
    constructor(game, sourceImageRect, imageType, totalFrame, fps) {
        super(game, sourceImageRect, imageType);

        this.imageType = imageType;
        this.frames = [];
        this.currentFrame = 0;
        this.totalFrame = totalFrame;
        this.fps = fps;

        // 스프라이트 시트 상에서 항상 옆으로 이어져 있으니 야매로
        for (let i = 0; i < this.totalFrame; ++i) {
            this.frames[i] = new Rect(
                sourceImageRect.x + i * sourceImageRect.width,
                sourceImageRect.y,
                sourceImageRect.width,
                sourceImageRect.height
            );
        }

        this.imageRect = this.frames[0];
    }

    update(deltaTime) {
        this.currentFrame += deltaTime * this.fps;

        let frameToRender = Math.floor(this.currentFrame);

        if (frameToRender >= this.totalFrame) {
            frameToRender = this.totalFrame - 1;
        }

        this.imageRect = this.frames[frameToRender];
    }
}

/************************
 * 
 * 좌표값(x,y), generateTime, owner
 * maxDefensiveForce ~ defendiveFoce
 * 행성 업그레이드
 * 
 * */
class Galaxy extends GameObject {
    constructor(game, galaxyType, galaxyName, gID = __gID) {
        super();
        this.game = game;

        this.gID = gID;
        __gID++;

        this.x = 0; this.y = 0; //해당 오브젝트가 그려지는 X,Y좌표
        this.centerX = 0; this.centerY = 0; //해당 오브젝트의 중심

        this.animation;

        this.generateTime = 0; //1초마다 자원을 생산하는 걸 구연할때 시간을 담는 변수

        //현재 주인(0 : 없음, 1 ~ 4 : 각각 플레이어 1 ~ 4)
        this.owner = 0;

        //defensiveForce는 방어막이란 뜻임
        this.maxDefensiveForce = (galaxyType + 1) * 100; //최대체력이라 보면 됨
        this.generativeForce = (galaxyType + 1) * 100;
        this.defensiveForce = this.maxDefensiveForce; //현 체력

        switch(galaxyType){ //해당 은하의 타입 지정
            case 0:
            this.galaxyType = "불규칙 은하"
            break;
            case 1:
            this.galaxyType = "타원 은하"
            this.animation = new Animation(game,
                UntitledGame.spriteDefinition.EllapseGALAXY,"EllipseGalaxy",24,15, this);
            break;
            case 2:
            this.galaxyType = "렌즈 은하"
            this.animation = new Animation(game,
                UntitledGame.spriteDefinition.LensGALAXY,"LensGalaxy",12,13, this);
            break;
            case 3:
            this.galaxyType = "막대 은하"
            this.animation = new Animation(game,
                UntitledGame.spriteDefinition.StickGALAXY,"StickGalaxy",12,13, this);
            break;
            case 4:
            this.galaxyType = "나선 은하"
            this.animation = new Animation(game,
                UntitledGame.spriteDefinition.SpiralGALAXY,"SpiralGalaxy",12,10, this);
            break;
            case 5:
            this.galaxyType = "퀘이사 은하"
            break;
        }
        this.generativeAdd = this.generativeForce / 10;
        this.defensiveAdd = this.defensiveForce / 10;

        this.galaxyName = galaxyName; //정보 뷰에 표시될 은하 이름
 
        //해당 은하의 업그레이드된 정도
        this.terraforming = 0;
        this.beamBarrier = 0;
    }
    render(){
        this.animation.render();
        this.animation.x = this.x;
        this.animation.y = this.y;

        this.centerX = this.x + this.animation.imageRect.width * UntitledGame.config.SCALE * 0.5
        this.centerY = this.y + this.animation.imageRect.height * UntitledGame.config.SCALE * 0.5
        
        this.showHealth();
    }

    update(deltaTime) {
        this.animation.update(deltaTime);
        
        this.generateTime += deltaTime;
        //1초지나면 자원 생산 함수 실행
        if(this.generateTime > UntitledGame.config.PLANET_RESOURCE_TERM){
            this.generateTime = 0;
            this.resourceGenerate(this.generativeForce);
        }
    }

    //데미지(데미지량, 누가 때렸는지)
    Damage(dmg, owner){
        this.defensiveForce -= dmg;
        if(this.defensiveForce <= 0)
            this.Death(owner);
    }

    //죽음
    Death(owner){
        this.owner = owner;
        this.defensiveForce = this.maxDefensiveForce;
    }

    //체력 표시
    showHealth(){
        if(this.game.gameEnd) return;
        //체력 0미만은 0으로 바꿔줌
        if(this.defensiveForce < 0)
            this.defensiveForce = 0;

        this.game.context.font = "20px 나눔바른펜";
        this.game.context.fillStyle = 'White';
        this.game.context.textBaseline = 'top';
        this.game.context.textAlign = 'center';
        this.game.context.fillText(this.galaxyName + "(" + this.galaxyType + ")",
         this.game.mainCamera.x + this.x + (this.animation.width * UntitledGame.config.SCALE * 0.5), 
         this.game.mainCamera.y + this.y - 50);

         if(this.defensiveForce < this.maxDefensiveForce || this.game.nowClicked_Obj == this || 
            this.owner == this.game.playerID){
            this.game.context.fillStyle="#FFFFFF";
            this.game.context.fillRect(
                this.game.mainCamera.x + this.x + (this.animation.width * UntitledGame.config.SCALE * 0.5)
                - this.maxDefensiveForce * 0.35, 
                this.game.mainCamera.y + this.y - 20, 
                this.maxDefensiveForce * 0.7, 15);
            this.game.context.fillStyle="#FE2E2E";
            this.game.context.fillRect(
                this.game.mainCamera.x + this.x + (this.animation.width * UntitledGame.config.SCALE * 0.5)
                - this.maxDefensiveForce * 0.35, 
                this.game.mainCamera.y + this.y - 20, 
                this.defensiveForce * 0.7, 15);
        }
    }

    //자원 생산
    resourceGenerate(generativeForce){
        if(this.owner != 0) //cameras는 플레이어1 ~ 4의 카메라를 담고 있음
            this.game.cameras[this.owner - 1].carbonAdd(generativeForce);
    }

    //생산력 업그레이드
    terraformingUpgrade(){
        if(this.terraforming < 10){
            if(this.game.mainCamera.carbon >= 2000){
            this.game.mainCamera.carbon -= 2000;
            this.terraforming++;
            this.generativeForce += this.generativeAdd;
            }
            else
                this.game.ExplainUI.explainSet("Carbon이 부족합니다", 3, "Red");
        }
        else
            this.game.ExplainUI.explainSet("더이상 업그레이드 할 수 없습니다.", 3, "Red");
    }

    //체력 업그레이드
    barrierUpgrade(){
        if(this.beamBarrier < 10){
            if(this.game.mainCamera.carbon >= 2000){
            this.game.mainCamera.carbon -= 2000;
            this.beamBarrier++;
            this.defensiveForce += this.defensiveAdd;
            this.maxDefensiveForce += this.defensiveAdd;
            }
            else
                this.game.ExplainUI.explainSet("Carbon이 부족합니다", 3, "Red");
        }
        else
            this.game.ExplainUI.explainSet("더이상 업그레이드 할 수 없습니다.", 3, "Red");
    }
}

/************
 * 
 * 
 *  좌표 x, y, targetX, targetY
 *  this.attack
 * 
 * 
 * 
 * 
 ************/

class SpaceShip extends GameObject {
    constructor(game, spaceshipType, spaceshipName) {
        super();
        this.game = game;
        this.spaceshipID = 0

        this.x = 0; this.y = 0;
        this.centerX = 0; this.centerY = 0;

        //해당 타깃을 향해 가기위한 벡터량(X, Y)
        this.targetVectorX = 0; this.targetVectorY = 0;
        //해당 타깃의 위치(X, Y)
        this.targetX = 0; this.targetY = 0;

        this.animation = new Animation(game,
            UntitledGame.spriteDefinition.CHEMICALSPACE_SHIP,"ChemicalSpaceShip",1,2, this);

        //최대 발사가능 범위
        this.range = 300; 
        //공격 명령을 내릴 시 움직임을 멈추는 거리
        this.stopDistance = 250;
    
        //공격 딜레이, 공격시 주는 데미지
        this.attackTerm = 1; this.attack = 10;
        this.attackTime = 1;

            // max health ~ rot : 바뀌는 값

        ///최대 체력, 현재 체력
        this.maxHealth = 200;  this.health = this.maxHealth;
        //자원 소모량
        this.useCoin = 100;
        //이동속도
        this.moveSpeed = 5;

        //각도
        this.rot = 0;

        //업글시 증가량
        this.attackAdd = this.attack / 10; this.healthAdd = this.health / 10;
        this.moveSpeedAdd = this.moveSpeed / 10;
        //공격 업글, 방어력 업글
        this.autoReload = 0; this.avoid = 0;
        //현재 설치한 기뢰 량, 속도 업글
        this.mine = 0; this.engine = 0;

        // autoReload ~ engine : 바뀌는 값

        this.spaceshipName = spaceshipName;
        this.spaceshipType = spaceshipType;

        this.attackTarget =null; // 바뀌는 값 ~ isAtking, useful
        this.isAttacking = false;
        this.canUse = true;
        this.useTime = 0;

        this.useful = true;

        this.owner = 0;
    }
    render(){
        this.animation.render();
        this.animation.x = this.x;
        this.animation.y = this.y;

        this.centerX = this.x + this.animation.imageRect.width * UntitledGame.config.SCALE * 0.65 * 0.5
        this.centerY = this.y + this.animation.imageRect.height * UntitledGame.config.SCALE * 0.65 * 0.5

        this.showHealth();
    }

    update(deltaTime) {
        this.animation.update(deltaTime);

        this.useTime += deltaTime;
        if(this.useTime > UntitledGame.config.PLANET_RESOURCE_TERM){
            this.useTime = 0;
            this.resourceUse(this.useCoin);
        }

        if(!this.canUse)
            return;

        this.attackTime -= deltaTime;

        if (this.game.isKeyStay('KeyF'))
            this.Damage(5);
        if (this.game.isKeyStay('KeyG'))
            this.game.mainCamera.carbon -= 50

        this.attackState();
        this.setVector();
        this.movement();
    }

    //아픔..
    Damage(dmg, owner){
        this.health -= dmg;
        if(this.health <= 0 && this.useful)
            this.Death(owner);
    }

    //주금..
    Death(owner){
        var newBang = new BangParticle(this.game, this.x, this.y);
        this.game.Particles.push(newBang);
        this.useful = false;
        
        if(this.owner == this.game.playerID){
            if(this.game.mainCamera.nowCount > 0)
            this.game.SpaceShipButtons[this.game.mainCamera.nowCount - 1].index = 1;
            this.game.SpaceShipButtons[this.game.mainCamera.nowCount].index = 0;
            this.game.SpaceShipButtons[this.game.mainCamera.nowCount].connectedObj = null;
            this.game.mainCamera.nowCount--;
        }
    }
    
    //자원 소모
    resourceUse(useCoin){
        if(this.owner != 0){
            if(this.game.cameras[this.owner - 1].carbon >= useCoin){
                //this.canUse = true;
            }
            else{
                //this.canUse = false;
            }
            this.game.cameras[this.owner - 1].carbonAdd(-useCoin);
        }
    }

    //공격 FSM처리
    attackState(){
        if(!this.isAttacking && this.attackTarget != null){
            if(this.attackTarget.owner == this.game.playerID)
                this.attackTarget = null;
            else{
                this.setDestination(this.attackTarget.x, this.attackTarget.y)

                var distX = this.attackTarget.x - this.x;
                var distY = this.attackTarget.y - this.y;
        
                var dist = Math.sqrt(distX * distX + distY * distY);
                if(dist < this.stopDistance){
                    this.isAttacking = true;
                    this.targetVectorX = 0; this.targetVectorY = 0;
                    this.targetX = this.x; this.targetY = this.y;
                }
            }
        }
        if(this.isAttacking){
            if(this.attackTarget.owner == this.game.playerID || this.attackTarget.health <= 0){
                this.attackTarget = null;
                this.isAttacking = false;
            }
            else{
                var distX = this.attackTarget.x - this.x;
                var distY = this.attackTarget.y - this.y;
        
                var dist = Math.sqrt(distX * distX + distY * distY);
                if(dist > this.range){
                    this.isAttacking = false;
                    this.setDestination(this.attackTarget.x, this. attackTarget.y)
                }
                else{
                    if(this.attackTime <= 0){
                        this.attackTime = this.attackTerm;
                        this.shotBullet(this.attackTarget.centerX, this.attackTarget.centerY);
                    }
                }
            }
        }
    }

    //총알 발사
    shotBullet(x, y){
        var offsetX = x - this.centerX;
        var offsetY = -y + this.centerY;
        //각도 계산해준 다음 총알 생성
        var bulletRot = Math.atan2(offsetY,offsetX) / Math.PI * 180 + 180
        var newBullet = new ChemicalBullet(this.game, this.centerX, this.centerY,
            bulletRot, this.owner, this.attack);
        //게임쪽 총알 배열에 newBullet추가
        this.game.bullets.push(newBullet);
    }

    //해당 오브젝트 체력및 정보 표시
    showHealth(){
        if(this.game.gameEnd) return;

        if(this.health < 0)
            this.health = 0;
        if(this.health < this.maxHealth || this.game.nowClicked_Obj == this || this.owner != this.game.playerID){
            this.game.context.fillStyle="#FFFFFF";
            this.game.context.fillRect(
                this.game.mainCamera.x + this.x + (this.animation.width * UntitledGame.config.SCALE *0.5 * 0.65) 
                - this.maxHealth / 2 * 0.7, 
                this.game.mainCamera.y + this.y - 20,        
                this.maxHealth * 0.7, 15);
            this.game.context.fillStyle="#FE2E2E";
            this.game.context.fillRect(
                this.game.mainCamera.x + this.x + (this.animation.width * UntitledGame.config.SCALE *0.5 * 0.65) 
                - this.maxHealth / 2 * 0.7, 
                this.game.mainCamera.y + this.y - 20, 
                this.health * 0.7, 15);
                
            this.game.context.font = "20px 나눔바른펜";
            this.game.context.fillStyle = 'White';
            this.game.context.textBaseline = 'top';
            this.game.context.textAlign = 'center';

            this.game.context.fillText(this.spaceshipName + "(" + this.spaceshipType + ")", 
                this.game.mainCamera.x + this.x + this.animation.width * UntitledGame.config.SCALE *0.5 * 0.65, 
                this.game.mainCamera.y + this.y - 50);
        }
    }

    //타겟 위치 설정
    setDestination(targetX, targetY){
        this.targetX = targetX - (this.animation.width - 100) * UntitledGame.config.SCALE / 2;
        this.targetY = targetY - (this.animation.height - 20)* UntitledGame.config.SCALE / 2;
    } 

    setVector(){
        var offsetX = this.targetX - this.x;
        var offsetY = this.targetY - this.y;

        //각도랑 정규벡터 계산식(걍 무시해)
        var offset = Math.sqrt(offsetX*offsetX + offsetY*offsetY);

        this.targetVectorX = offsetX;
        this.targetVectorY = offsetY;
        if(offset != 0){
            this.targetVectorX = offsetX / offset;
            this.targetVectorY = offsetY / offset;
            if(Math.abs(offset) < 3 * this.moveSpeed/5){
                this.targetVectorX = 0;
                this.targetVectorY = 0;
                this.x = this.targetX;
                this.y = this.targetY;
            }
            else if(Math.abs(offset) > 10){
                this.rot = Math.atan2(offsetY,offsetX) / Math.PI * 180 + 180
                if(this.rot < 22.5) this.animation.rot = 6;
                if(this.rot > 22.5 && this.rot < 67.5) this.animation.rot = 7;
                if(this.rot > 67.5 && this.rot < 112.5) this.animation.rot = 0;
                if(this.rot > 112.5 && this.rot < 157.5) this.animation.rot = 1;
                if(this.rot > 157.5 && this.rot < 202.5) this.animation.rot = 2;
                if(this.rot > 202.5 && this.rot < 247.5) this.animation.rot = 3;
                if(this.rot > 247.5 && this.rot < 292.5) this.animation.rot = 4;
                if(this.rot > 292.5 && this.rot < 337.5) this.animation.rot = 5;
                if(this.rot > 337.5) this.animation.rot = 6;
            }
        }
        else{
            this.targetVectorX = 0;
            this.targetVectorY = 0;
        }
    }

    //움직임 처리
    movement(){
        this.x += this.targetVectorX * this.moveSpeed;
        this.y += this.targetVectorY * this.moveSpeed;
    }

    atkUpgrade(){
        if(this.autoReload < 10){
            if(this.game.mainCamera.carbon >= 2000){
                this.game.mainCamera.carbon -= 2000;
                this.autoReload++;
                this.attack += this.attackAdd;
            }else
                this.game.ExplainUI.explainSet("Carbon이 부족합니다", 3, "Red");
        }
        else
            this.game.ExplainUI.explainSet("더이상 업그레이드 할 수 없습니다.", 3, "Red");
    }

    healthUpgrade(){
        if(this.avoid < 10){
            if(this.game.mainCamera.carbon >= 2000){
                this.game.mainCamera.carbon -= 2000;
                this.avoid++;
                this.health += this.healthAdd;
                this.maxHealth += this.healthAdd;
            }else
                this.game.ExplainUI.explainSet("Carbon이 부족합니다", 3, "Red");
        }
        else
            this.game.ExplainUI.explainSet("더이상 업그레이드 할 수 없습니다.", 3, "Red");
    }

    speedUpgrade(){
        if(this.engine < 10){
            if(this.game.mainCamera.carbon >= 2000){
                this.game.mainCamera.carbon -= 2000;
                this.engine++;
                this.moveSpeed += this.moveSpeedAdd;
            }else{
                this.game.ExplainUI.explainSet("Carbon이 부족합니다", 3, "Red");
            }
        }
        else{
            this.game.ExplainUI.explainSet("더이상 업그레이드 할 수 없습니다.", 3, "Red");
        }
    }

    //기뢰 설치 준비
    mineSetting(){
        if(this.mine < 5){
            if(this.game.mainCamera.carbon >= 2000){
                this.game.mineSetting = true;
                this.game.ExplainUI.explainSet("기뢰 설치 [좌클릭] / 취소 [우클릭]", 10, "White");
            }else{
                this.game.ExplainUI.explainSet("Carbon이 부족합니다", 3, "Red");
            }
        }
        else{
            this.game.ExplainUI.explainSet("더이상 기뢰를 설치할 수 없습니다.", 3, "Red");
        }
    }
}

class BangParticle extends GameObject{
    constructor(game, x, y){
        super();
        this.game = game;
        
        this.animation = new Line(game, UntitledGame.spriteDefinition.BANG,"Bang",6,12, this);
            
        this.x = x; this.y = y;
        this.lifeTime = 0.5;

        this.useful = true;
    }
    render(){
        this.animation.render();
        this.animation.x = this.x;
        this.animation.y = this.y;
    }
    update(deltaTime) {
        this.animation.update(deltaTime);

        if(this.lifeTime > 0)
            this.lifeTime -= deltaTime;
        else
            this.useful = false;
    }
}

/*****
 * x, y, target, useful
 */

class SpaceMine extends GameObject{
    constructor(game, x, y, owner, ownerObj){
        super();
        this.game = game;
        
        this.owner = owner;
        this.ownerObj = ownerObj;
        this.nonActive_animation = new Animation(game,
            UntitledGame.spriteDefinition.SPACEMINE,"SpaceMine",20,10, this);
        this.active_animation = new Animation(game,
            UntitledGame.spriteDefinition.SPACEMINE,"SpaceMineActive",20,8, this);
        this.animation = this.nonActive_animation;
            
        this.x = x; this.y = y;
        this.centerX = 0; this.centerY = 0;
        this.targetVectorX = 0;
        this.targetVectorY = 0;

        this.rot = 0;
        //적이 들어왔을때 쫓아가는 범위
        this.range = 300;
        //적에 닿으면 터지는 범위
        this.attackRange = 30;
        this.speed = 20;
        this.damage = 200;

        //활성화되는데에 걸리는 시간
        this.activeTime = 2;

        //활성화 되어서 적을 쫓아갈때 몇초간 쫓아가는지
        this.lifeTime = 4;

        this.target = null;

        this.useful = true;
    }
    render(){
        this.animation.render();
        this.animation.x = this.x;
        this.animation.y = this.y;

        this.centerX = this.x + this.animation.imageRect.width * UntitledGame.config.SCALE * 0.2;
        this.centerY = this.y + this.animation.imageRect.height * UntitledGame.config.SCALE * 0.2;
    }
    update(deltaTime) {
        this.animation.update(deltaTime);

        if(this.activeTime > 0)
            this.activeTime -= deltaTime;
        else{
            this.animation = this.active_animation;
            this.animation.x = this.x;
            this.animation.y = this.y;
            if(this.target != null){
                this.setVector();

                this.x += this.targetVectorX * this.speed;
                this.y += this.targetVectorY * this.speed;
                
                this.lifeTime -= deltaTime;
                if(this.lifeTime <= 0)
                    this.useful = false;
            }
            this.collision();
        }
    }

    //타겟을 향해 가기위한 벡터 계산
    setVector(){
        var offsetX = this.target.centerX - this.centerX;
        var offsetY = this.target.centerY - this.centerY;

        var offset = Math.sqrt(offsetX*offsetX + offsetY*offsetY);

        this.targetVectorX = offsetX;
        this.targetVectorY = offsetY;
        if(offset != 0){
            this.targetVectorX = offsetX / offset;
            this.targetVectorY = offsetY / offset;
        }
        else{
            this.targetVectorX = 0;
            this.targetVectorY = 0;
        }
    }
    //충돌 계산
    collision(){
        for(let s of this.game.spaceships)
        {
            if(s.owner != this.game.playerID){
                var offsetX = s.centerX - this.centerX;
                var offsetY = s.centerY - this.centerY;

                if(offsetX * offsetX + offsetY * offsetY < this.range * this.range){
                    this.target = s;
                }

                if(offsetX * offsetX + offsetY * offsetY < this.attackRange * this.attackRange){
                    s.Damage(this.damage, this.owner)
                    this.useful = false;
                    this.ownerObj.mine--;
                }
            }
        }
    }
}

/**
 * useful
 */

class ChemicalBullet extends GameObject{
    constructor(game, x, y, rot, owner, damage){
        super();
        this.game = game;
        
        this.owner = owner;
        this.animation = new Animation(game,
            UntitledGame.spriteDefinition.CHEMICALSPACE_SHIP,"ChemicalBullet",1,2, this);
            
        this.x = x; this.y = y;
        this.centerX = 0; this.centerY = 0;
        this.rot = rot * Math.PI / 180;
        this.range = 80;
        this.speed = 20;
        this.lifeTime = 0.8;
        this.damage = damage;

        this.useful = true;
    }
    render(){
        this.animation.render();
        this.animation.x = this.x;
        this.animation.y = this.y;

        this.centerX = this.x + this.animation.imageRect.width * UntitledGame.config.SCALE * 0.5;
        this.centerY = this.y + this.animation.imageRect.height * UntitledGame.config.SCALE * 0.5;
    }
    update(deltaTime) {
        this.animation.update(deltaTime);
        this.x -= Math.cos(this.rot) * this.speed;
        this.y += Math.sin(this.rot) * this.speed;
        
        this.lifeTime -= deltaTime;
        if(this.lifeTime <= 0)
        this.useful = false;

        this.collision();
    }
    //충돌 계산
    collision(){
        for(let g of this.game.galaxys)
        {
            if(g.owner != this.game.playerID){
                var offsetX = g.centerX - this.x;
                var offsetY = g.centerY - this.y;
                
                if(offsetX * offsetX + offsetY * offsetY < this.range * this.range){
                    g.Damage(this.damage, this.owner)
                    this.useful = false;
                }
            }
        }
        for(let s of this.game.spaceships)
        {
            if(s.owner != this.game.playerID){
                var offsetX = s.centerX - this.x;
                var offsetY = s.centerY - this.y;

                if(offsetX * offsetX + offsetY * offsetY < this.range * this.range){
                    s.Damage(this.damage, this.owner)
                    this.useful = false;
                }
            }
        }
    }
}

class PlayerInfo extends GameObject{
    constructor(game){
        super();
        this.game = game;
        this.context = game.context;
        this.sprite = new Sprite(game, UntitledGame.spriteDefinition.EXPLAIN_PANEL,"Explain_Panel", this);
        this.x = this.game.canvas.width/2;
        this.y = this.game.canvas.height;
        this.line_offset = 45;
    }

    render(){
        this.line_offset = 45 * this.game.canvas.width / 1505 
        this.sprite.render();

        if(this.game.nowClicked_Obj != null){
            //현재 클릭한 오브젝트가 은하 클래스 일경우
            if(this.game.nowClicked_Obj instanceof Galaxy){
                this.showGalxyExplain();
            }
            //현재 클릭한 오브젝트가 우주선 클래스 일경우
            else if(this.game.nowClicked_Obj instanceof SpaceShip){
                this.showSpaceShipExplain();
            }
        }
    }
    update(deltaTime){
        this.x = this.game.canvas.width/2;
        this.y = this.game.canvas.height;
    }

    showGalxyExplain(){
        var obj = this.game.nowClicked_Obj;
        //현재 선택한 은하의 주인에 따라 색상교체
        if(obj.owner == this.game.playerID)
        this.context.fillStyle = 'White';
        else if(obj.owner == 0)
        this.context.fillStyle = '#BABABA';
        else
        this.context.fillStyle = this.game.teamColor[obj.owner - 1];

        this.context.font = (25 * this.game.uiScale) + "px 나눔바른펜";
        this.context.textBaseline = 'top';
        this.context.textAlign = 'left';

        if(obj.owner == this.game.playerID){
            this.context.fillText("생산력 : " + obj.generativeForce, this.x - 250 * this.game.canvas.width / 1505 , this.y - this.line_offset * 3.4);
            this.context.fillText("테라포밍 Lv." + obj.terraforming, this.x - 250 * this.game.canvas.width / 1505 , this.y - this.line_offset * 2);
            this.context.fillText("방어력 : " + obj.defensiveForce + "/" + obj.maxDefensiveForce, 
            this.x + 10, this.y - this.line_offset * 3.4);
            this.context.fillText("배리어 Lv." + obj.beamBarrier, this.x + 10, this.y - this.line_offset * 2);
        }
        else{
            this.context.fillText("생산력 : " + obj.generativeForce, this.x - 250 * this.game.canvas.width / 1505 , this.y - this.line_offset * 3.4);
            this.context.fillText("방어력 : " + obj.defensiveForce + "/" + obj.maxDefensiveForce, 
            this.x- 20, this.y - this.line_offset * 3.4);
        }
    }

    showSpaceShipExplain(){
        var obj = this.game.nowClicked_Obj;
        //현재 선택한 우주선의 주인에 따라 색상교체
        if(obj.owner == this.game.playerID)
        this.context.fillStyle = 'White';
        else
        this.context.fillStyle = this.game.teamColor[obj.owner - 1];

        this.context.font = (25 * this.game.uiScale) + "px 나눔바른펜";
        this.context.textBaseline = 'top';
        this.context.textAlign = 'left';
        this.context.fillText("ATK : " + obj.attack, this.x - 250 * this.game.canvas.width / 1505 , this.y - this.line_offset * 3.4);
        this.context.fillText("HP : " + obj.health + "/" + obj.maxHealth, this.x - 130 * this.game.canvas.width / 1505 , this.y - this.line_offset * 3.4);
        this.context.fillText("UR : " + obj.useCoin, this.x + 45 * this.game.canvas.width / 1505 , this.y - this.line_offset * 3.4);
        this.context.fillText("SP : " + obj.moveSpeed, this.x + 175 * this.game.canvas.width / 1505 , this.y - this.line_offset * 3.4);
        if(obj.owner == this.game.playerID){
            this.context.fillText("무기 Lv." + obj.autoReload, this.x - 250 * this.game.canvas.width / 1505 , this.y - this.line_offset * 2);
            this.context.fillText("방어 Lv." + obj.avoid, this.x + 10 * this.game.canvas.width / 1505 , this.y - this.line_offset * 2);
            this.context.fillText("엔진 Lv." + obj.engine, this.x - 250 * this.game.canvas.width / 1505 , this.y - this.line_offset * 1);
            this.context.fillText("기뢰 " + obj.mine + "P", this.x + 10 * this.game.canvas.width / 1505 , this.y - this.line_offset * 1);
        }
    }
}

class CarbonBoard extends GameObject{
    constructor(game){
        super();
        this.game = game;
        this.context = game.context;
        this.offset = 15;
        this.x = this.game.canvas.width - this.offset; 
        this.y = this.offset;
    }
    render(){
        this.offset = 15 * this.game.canvas.width / 1605 
        this.x = this.game.canvas.width - this.offset; 
        this.y = this.offset;
        this.context.font = (30 * this.game.uiScale) + "px Agency FB";
        this.context.fillStyle = 'White';
        this.context.textBaseline = 'top';
        this.context.textAlign = 'right';
        this.context.fillText("Carbon (Plus/Minus) : " + this.game.mainCamera.carbonPlus + 
        "/" + this.game.mainCamera.carbonUse, this.x, this.y);
        this.context.fillText("Carbon : " + this.game.mainCamera.carbon, this.x, 
        this.y * this.game.uiScale + 38 * this.game.uiScale);
    }
    update(deltaTime){
        this.x = this.game.canvas.width - this.offset; 
    }
}

class RankBoard extends GameObject{
    constructor(game){
        super();
        this.game = game;
        this.context = game.context;
        this.offset = 15;
        this.line_offset = 40;
        this.x = this.game.canvas.width - this.offset; this.y = 120;

        //등수대로 정렬된 카메라 배열
        this.sortedCameras = [];
        //깊은 복사
        for(var i = 0; i<this.game.cameras.length;i++){
            this.sortedCameras[i] = this.game.cameras[i];
        }
    }
    render(){
        this.carbonSort();
        this.context.textBaseline = 'top';
        this.context.textAlign = 'right';
        for(var i=0;i<4; i++){
            this.context.fillStyle = this.game.teamColor[this.sortedCameras[i].owner - 1];
            this.game.cameras[this.sortedCameras[i].owner - 1].rank = i + 1;

            if(this.sortedCameras[i].owner == this.game.playerID){
            this.context.font = "bold " + (30 * this.game.uiScale) + "px Agency FB";
            this.context.fillText((i + 1) + ". " + this.sortedCameras[i].playerName + " : "
            + this.sortedCameras[i].carbon, 
            this.x - 15 * this.game.uiScale, this.y * this.game.uiScale + this.line_offset * i * this.game.uiScale);
            }
            else{
            this.context.font = (30 * this.game.uiScale) + "px Agency FB";
            this.context.fillText((i + 1) + ". " + this.sortedCameras[i].playerName + " : "
            + this.sortedCameras[i].carbon,  
            this.x, this.y * this.game.uiScale + this.line_offset * i * this.game.uiScale);
            }
        }
        this.context.font = (30 * this.game.uiScale) + "px Agency FB";
    }
    update(deltaTime){
        this.x = this.game.canvas.width - this.offset; 
    }

    carbonSort(){
        this.sortedCameras.sort(function(a, b)
            { 
                return b.carbon - a.carbon;
            });
    }
}

class UpgradeButton extends GameObject{
    constructor(game, abX, abY, index){
        super();
        this.game = game;
        this.context = game.context;
        this.canvas = game.canvas;
        this.imageRect = UntitledGame.spriteDefinition.UPGRADE_BUTTON;

        this.abX = abX; this.abY = abY;

        this.x = 500; this.y = 120;
        this.width = 0; this.height = 0;

        this.index = index;
    }
    render(){
        if(((this.game.nowClicked_Obj instanceof Galaxy && (this.index == 0 || this.index == 1)) || 
        this.game.nowClicked_Obj instanceof SpaceShip) && this.game.nowClicked_Obj.owner == this.game.playerID){
            let { x, y, width, height } = this.imageRect;
            this.x = this.canvas.width - this.abX * this.canvas.width / 1465;
            this.y = this.canvas.height - this.abY * this.canvas.width / 1465;
            this.width = width * 0.45 * this.canvas.width / 1465;
            this.height = height * 0.55 * this.canvas.width / 1465;
    
            this.context.drawImage(this.game.UpgradeButton_Image, x, y, width, height, this.x, this.y, this.width, this.height
            );
        }
    }
    update(deltaTime){
        
    }
    //버튼 눌렀을때 실행되는 함수
    buttonClick(obj){
        if(obj.owner == this.game.playerID){
            //자신이 주인인 오브젝트만 가능
            if(obj instanceof Galaxy){
                switch(this.index){
                    case 0: //테라포밍
                    obj.terraformingUpgrade();
                    break;
                    case 1: //배리어
                    obj.barrierUpgrade();
                    break;
                }
            }
            else if(obj instanceof SpaceShip){
                switch(this.index){
                    case 0: //공격
                    obj.atkUpgrade();
                    break;
                    case 1: //방어
                    obj.healthUpgrade();
                    break;
                    case 2: //엔진
                    obj.speedUpgrade();
                    break;
                    case 3: //기뢰
                    obj.mineSetting();
                    break;
                }
            }
        }
    }
}

class SpaceShipButton extends GameObject{
    constructor(game, abX, abY, pos){
        super();
        this.game = game;
        this.context = game.context;
        this.canvas = game.canvas;
        this.imageRect = UntitledGame.spriteDefinition.SPACESHIP_BUTTON;

        this.abX = abX; this.abY = abY; //절대좌표(UI위치 계산용)

        this.x = 500; this.y = 120;
        this.width = 0; this.height = 0;

        this.index = 0; //0:비어있는 칸 1:추가 칸 2:이미 우주선이 있음
        this.connectedObj = null; //현재 연결된 우주선

        this.pos = pos;
    }
    render(){
        let { x, y, width, height } = this.imageRect;
        this.x = this.canvas.width - this.abX * this.canvas.width / 1465;
        this.y = this.canvas.height - this.abY * this.canvas.width / 1465;
        this.width = width * 0.35 * this.canvas.width / 1465;
        this.height = height * 0.35 * this.canvas.width / 1465;
        switch(this.index){
            case 1:
            this.context.drawImage(
                this.game.SpaceShipAddIcon_Image, x, y, width, height, this.x, this.y, this.width, this.height);
                break;
            case 2:
            this.context.drawImage(
                this.game.SpaceShipIcon_Image, x, y, width, height, this.x, this.y, this.width, this.height);
                break;
        }
    }
    update(deltaTime){
    }

    buttonClick(){
        switch(this.index){
            case 1:
                this.game.spaceShipSetting = true;
                this.game.ExplainUI.explainSet("우주선 추가 [좌클릭] / 취소 [우클릭]", 10, "White");
            break;
            case 2:
                this.game.mainCamera.x = - this.connectedObj.x + this.canvas.width * 0.5;
                this.game.mainCamera.y = - this.connectedObj.y + this.canvas.height * 0.4;
                this.game.nowClicked_Obj = this.connectedObj;
            break;
        }
    }
}

class ExplainText extends GameObject{
    constructor(game, abY){
        super();
        this.game = game;
        this.context = game.context;
        this.canvas = game.canvas;
        
        this.abY = abY;

        this.x = 0; this.y = 0;

        this.explainTime = 0;
        this.explainText = "";
        this.color = "White";
    }
    render(){
        this.x = this.canvas.width * 0.5;
        this.y = this.canvas.height - this.abY * this.canvas.width / 1465;
        if(this.explainTime > 0){
            this.game.context.font = "25px 나눔바른펜";
            this.game.context.fillStyle = this.color;
            this.game.context.textBaseline = 'top';
            this.game.context.textAlign = 'center';
            this.context.fillText(this.explainText, this.x, this.y);
        }
    }

    update(deltaTime){
        if(this.explainTime > 0){
            this.explainTime -= deltaTime;
        }
    }

    explainSet(text, time, color){
        this.explainText = text;
        this.explainTime = time;
        this.color = color;
    }
}

// 나중에 서버에서 시간 받는식으로 개선
class TimeText extends GameObject{
    constructor(game){
        super();
        this.game = game;
        this.context = game.context;
        
        this.nowTime = 0;
        this.maxTime = 600;

        this.min = 0;
        this.sec = 0;
    }
    render(){
    }

    update(deltaTime){
        this.nowTime += deltaTime;
        this.game.context.font = (35 * this.game.uiScale) + "px 나눔바른펜";
        this.game.context.fillStyle = "White";
        this.game.context.textBaseline = 'top';
        this.game.context.textAlign = 'left';
        
        if(this.nowTime > 1)
            this.min = Math.floor(Math.floor(this.nowTime - 1) / 60); 
        else
            this.min = Math.floor(Math.floor(this.nowTime) / 60); 
        this.sec = Math.round(this.nowTime) % 60;
        var time = (this.min < 10) ? "0" + this.min : this.min;
        time = time + " : " + ((this.sec < 10) ? "0" + this.sec : this.sec); 
        this.context.fillText(time, 0, 0);

        if(this.nowTime >= this.maxTime || this.game.isKeyStay('KeyP')){
            this.game.endGame();
        }
    }
}

class MiniMap extends GameObject{
    constructor(game){
        super();
        this.game = game;
        this.context = game.context;
        this.canvas = game.canvas;
        this.map_Width = UntitledGame.config.MAP_WIDTH * UntitledGame.config.MAP_SCALE; 
        this.map_Height = UntitledGame.config.MAP_HEIGHT * UntitledGame.config.MAP_SCALE;

        this.x = this.canvas.width - this.map_Width;
        this.y = this.canvas.height - this.map_Height;

        this.camera = game.mainCamera;
    }
    render(){
        this.context.fillStyle="#FFFFFF";
        this.game.context.fillRect(
            this.canvas.width - this.map_Width, this.canvas.height - this.map_Height, 
            this.map_Width, this.map_Height);
        this.drawCamera();
        this.drawIcon();
    }
    
    update(deltaTime){
        this.map_Width = UntitledGame.config.MAP_WIDTH * UntitledGame.config.MAP_SCALE * this.canvas.width / 1465; 
        this.map_Height = UntitledGame.config.MAP_HEIGHT * UntitledGame.config.MAP_SCALE * this.canvas.width / 1465;
        this.x = this.canvas.width - this.map_Width;
        this.y = this.canvas.height - this.map_Height;
    }

    drawCamera(){
        var mapX = this.canvas.width - this.map_Width - this.camera.x * UntitledGame.config.MAP_SCALE * this.canvas.width / 1465;
        var mapY = this.canvas.height - this.map_Height - this.camera.y * UntitledGame.config.MAP_SCALE * this.canvas.width / 1465;
        var mapWidth = this.canvas.width * UntitledGame.config.MAP_SCALE * this.canvas.width / 1465;
        var mapHeight = this.canvas.height * UntitledGame.config.MAP_SCALE * this.canvas.width / 1465;
        // if(mapY > 675){
        //     mapHeight = mapHeight - (mapY - 675)
        // }

        this.context.fillStyle = "#E6E6E6";
        this.context.fillRect(mapX, mapY, mapWidth, mapHeight)
            
        this.context.strokeStyle = "#0000FF";
        this.context.lineWidth = 1.5;
        this.context.beginPath();
        this.context.moveTo(mapX, mapY)
        this.context.lineTo(mapX + mapWidth * 0.1, mapY)
        this.context.lineTo(mapX, mapY)
        this.context.lineTo(mapX, mapY + mapHeight * 0.1)
        this.context.closePath();
        this.context.stroke();

        this.context.beginPath();
        this.context.moveTo(mapX + mapWidth, mapY + mapHeight)
        this.context.lineTo(mapX + mapWidth - mapWidth * 0.1, mapY + mapHeight)
        this.context.lineTo(mapX + mapWidth, mapY + mapHeight)
        this.context.lineTo(mapX + mapWidth, mapY + mapHeight - mapHeight * 0.1)
        this.context.closePath();
        this.context.stroke();
    }

    drawIcon(){
        for(let g of this.game.galaxys)
        {
            if(g.animation.imageType === "EllipseGalaxy"){
                this.context.drawImage(this.game.EllipseGalaxy_Image[g.owner],
                    10, 10, 304, 304, 
                    this.x + g.x * UntitledGame.config.MAP_SCALE * this.game.uiScale,
                    this.y + g.y * UntitledGame.config.MAP_SCALE * this.game.uiScale,
                    g.animation.width * UntitledGame.config.Icon_SCALE, g.animation.height * UntitledGame.config.Icon_SCALE
                );
            }
            else if(g.animation.imageType === "LensGalaxy"){
                this.context.drawImage(this.game.LensGalaxy_Image[g.owner],
                    10, 10, 304, 304, 
                    this.x + g.x * UntitledGame.config.MAP_SCALE * this.game.uiScale,
                    this.y + g.y * UntitledGame.config.MAP_SCALE * this.game.uiScale,
                    g.animation.width * UntitledGame.config.Icon_SCALE, g.animation.height * UntitledGame.config.Icon_SCALE
                );
            }
            else if(g.animation.imageType === "StickGalaxy"){
                this.context.drawImage(this.game.StickGalaxy_Image[g.owner],
                    10, 10, 304, 304, 
                    this.x + g.x * UntitledGame.config.MAP_SCALE * this.game.uiScale,
                    this.y + g.y * UntitledGame.config.MAP_SCALE * this.game.uiScale,
                    g.animation.width * UntitledGame.config.Icon_SCALE, g.animation.height * UntitledGame.config.Icon_SCALE
                );
            }
            else if(g.animation.imageType === "SpiralGalaxy"){
                this.context.drawImage(this.game.SpiralGalaxy_Image[g.owner],
                    10, 10, 304, 304, 
                    this.x + g.x * UntitledGame.config.MAP_SCALE * this.game.uiScale,
                    this.y + g.y * UntitledGame.config.MAP_SCALE * this.game.uiScale,
                    g.animation.width * UntitledGame.config.Icon_SCALE, g.animation.height * UntitledGame.config.Icon_SCALE
                );
            }
        }

        for(let s of this.game.spaceships)
        {
            this.context.drawImage(this.game.ChemicalSpaceShip_Image[s.owner - 1],
                0 + s.animation.rot * s.animation.imageRect.width, 0, 310, 310, 
                this.x + s.x * UntitledGame.config.MAP_SCALE * this.game.uiScale,
                this.y + s.y * UntitledGame.config.MAP_SCALE * this.game.uiScale,
                s.animation.width * UntitledGame.config.Icon_SCALE * 0.8, 
                s.animation.height * UntitledGame.config.Icon_SCALE * 0.8
            );
        }
    }
}

class AudioClip extends GameObject{
    constructor(game, src, lifeTime){
        super();
        var newClip = new Audio(src); 
        this.game = game;
        this.lifeTime = lifeTime;
        this.useful = 0;
        
        // newClip.volume = this.game.setting_effect_volume;
        //newClip.play(); //정책때메 음악이 안나옴
    }
    // update(deltaTime){
    //     newClip.volume = this.game.setting_effect_volume;
    //     if(this.lifeTime > 0){
    //         this.lifeTime -= deltaTime;
    //     }
    //     else{
    //         this.useful = false;
    //     }
    // }
}

/****
 * 
 * x, y, carbon, isDead, rank
 * 
 */

class Camera extends GameObject {
    constructor(game, owner) {
        super();
        this.game = game;

        this.x = 0; this.y=0;
        this.moveSpeed = 8;
        
        this.carbon = 1000;

        this.carbonPlus = 0;
        this.carbonUse = 0;

        this.maxCount = 9;
        this.nowCount = 1;
        
        this.playerName = "";
        this.owner = owner;
        this.rank = 0;

        this.isDead = false;
    }

    render(){
        this.carbonPlus = this.carbonUse = 0;
        for(let g of this.game.galaxys)
        {
            if(g.owner == this.game.playerID)
                this.carbonPlus += g.generativeForce;
        }
        for(let s of this.game.spaceships)
        {
            if(s.owner == this.game.playerID)
                this.carbonUse += s.useCoin;
        }
    }

    update(deltaTime) {
        if(this.game.isKeyStay('Space'))
            this.moveSpeed = 15
        else
            this.moveSpeed = 8

        if (this.game.isKeyStay('KeyW')) 
            this.y += this.moveSpeed;
        if (this.game.isKeyStay('KeyS')) 
            this.y -= this.moveSpeed;
            
        if (this.game.isKeyStay('KeyA')) 
            this.x += this.moveSpeed;
        if (this.game.isKeyStay('KeyD')) 
            this.x -= this.moveSpeed;
            
        if(this.carbon < -1000){
            this.gameOver();
        }

        if(this.x > 0) this.x = 0;
        if(this.x < -UntitledGame.config.MAP_WIDTH + this.game.canvas.width) 
        this.x = -UntitledGame.config.MAP_WIDTH + this.game.canvas.width;
        if(this.y > 0) this.y = 0;
        if(this.y < -UntitledGame.config.MAP_HEIGHT + this.game.canvas.height - 130) 
        this.y = -UntitledGame.config.MAP_HEIGHT + this.game.canvas.height - 130;
    }

    carbonAdd(num){
        this.carbon += num;
    }

    gameOver(){
        this.isDead = true;
        for(let g of this.game.galaxys){
            if(g.owner == this.game.playerID){
                g.owner = 0;
            }
        }
        for(let s of this.game.spaceships){
            if(s.owner == this.game.playerID){
                s.Death(0)
            }
        }
        for(let m of this.game.Mines){
            if(m.owner == this.game.playerID){
                m.damage = 0;
                m.useful = false;
            }
        }
    }
 }

class UntitledGame {
    /* 초기화 */
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.context = canvasElement.getContext('2d');

        this.uiScale = 0;
        {
            this.EllipseGalaxy_Image = new Array(5);
            for(var i = 0;i<5;i++){
                this.EllipseGalaxy_Image[i] = new Image();
                this.EllipseGalaxy_Image[i].src = 'Resources/' + i + 'EllipseGalaxy.png';
            }

            this.LensGalaxy_Image = new Array(5);
            for(var i = 0;i<5;i++){
                this.LensGalaxy_Image[i] = new Image();
                this.LensGalaxy_Image[i].src = 'Resources/' + i + 'LensGalaxy.png';
            }

            this.StickGalaxy_Image = new Array(5);
            for(var i = 0;i<5;i++){
                this.StickGalaxy_Image[i] = new Image();
                this.StickGalaxy_Image[i].src = 'Resources/' + i + 'StickGalaxy.png';
            }

            this.SpiralGalaxy_Image = new Array(5);
            for(var i = 0;i<5;i++){
                this.SpiralGalaxy_Image[i] = new Image();
                this.SpiralGalaxy_Image[i].src = 'Resources/' + i + 'SpiralGalaxy.png';
            }
            
            this.ChemicalSpaceShip_Image = new Array(4);
            for(var i = 0;i<4;i++){
                this.ChemicalSpaceShip_Image[i] = new Image();
                this.ChemicalSpaceShip_Image[i].src = 'Resources/' + (i + 1) + 'ChemicalSpaceship.png';
            }
            
            this.ChemicalBullet_Image = new Array(4);
            for(var i = 0;i<4;i++){
                this.ChemicalBullet_Image[i] = new Image();
                this.ChemicalBullet_Image[i].src = 'Resources/' + (i + 1) + 'ChemicalBullet.png';
            }

            this.ExplainPanel_Image = new Image();
            this.ExplainPanel_Image.src = 'Resources/ExplainPanel.png';

            this.UpgradeButton_Image = new Image();
            this.UpgradeButton_Image.src = 'Resources/UpgradeButton.png';

            this.SpaceShipIcon_Image = new Image();
            this.SpaceShipIcon_Image.src = 'Resources/SpaceShipIcon.png';

            this.SpaceShipAddIcon_Image = new Image();
            this.SpaceShipAddIcon_Image.src = 'Resources/SpaceShipAddIcon.png';

            this.BangParticle_Image = new Image();
            this.BangParticle_Image.src = 'Resources/Bomb.png';

            this.SpaceMine_NonActive_Image = new Image();
            this.SpaceMine_NonActive_Image.src = 'Resources/SpaceMine_NonActive.png';

            this.SpaceMine_Active_Image = new Image();
            this.SpaceMine_Active_Image.src = 'Resources/SpaceMine_Active.png';

            this.RankingScreen_Image = new Image();
            this.RankingScreen_Image.src = 'Resources/RankScreen.png';

            this.BackMain_Image = new Image();
            this.BackMain_Image.src = 'Resources/BackButton.png';
            
            this.EndText_Image = new Array(4);
            for(var i = 0;i<4;i++){
                this.EndText_Image[i] = new Image();
                this.EndText_Image[i].src = 'Resources/' + (i + 1) + 'EndText.png';
            }
        }
        this.teamColor = ["#2ECCFA", "#58FA82", "#FA5882", "Yellow"];
        
        this.nowClicked_Obj;

        this.cameras = [];
        this.UIs = [];
        this.Buttons = [];
        this.SpaceShipButtons = [];
        this.Mines = [];
        this.Particles = [];
        
        // 혼모노
        this.sounds = [];
        this.galaxys = [];
        this.spaceships = [];
        this.bullets = [];
        this.stayKeys = {};
        
        this.paused = false;
        this.canControl = true;
        this.canUse = true;
        this.backSound = true;
        this.updatePending = false;

        this.mineSetting = false;
        this.spaceShipSetting = false;

        this.gameEnd = false;
        this.gameendAnimTime = 0;

        window.addEventListener('blur', this.onVisibilityChange.bind(this));
        window.addEventListener('focus', this.onVisibilityChange.bind(this));
        document.addEventListener('visibilitychange', this.onVisibilityChange.bind(this));
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }
    
    realPlay() {
        this.playerID = pID; //플레이어 아이디

        this.camera1 = new Camera(this, 1); this.cameras.push(this.camera1);
        this.camera2 = new Camera(this, 2); this.cameras.push(this.camera2);
        this.camera3 = new Camera(this, 3); this.cameras.push(this.camera3);
        this.camera4 = new Camera(this, 4); this.cameras.push(this.camera4);
        this.camera1.playerName = p1Name; this.camera1.x = this.camera3.x = 0
        this.camera2.playerName = p2Name; this.camera2.x = this.camera4.x = this.canvas.width - UntitledGame.config.MAP_WIDTH
        this.camera3.playerName = p3Name; this.camera1.y = this.camera2.y = 0
        this.camera4.playerName = p4Name; this.camera3.y = this.camera4.y = this.canvas.height - UntitledGame.config.MAP_HEIGHT;

        this.mainCamera = this.cameras[this.playerID - 1];

        this.infoUI1 = new PlayerInfo(this); this.UIs.push(this.infoUI1);
        this.infoUI2 = new PlayerInfo(this); this.UIs.push(this.infoUI2);
        this.infoUI3 = new PlayerInfo(this); this.UIs.push(this.infoUI3);
        this.infoUI4 = new PlayerInfo(this); this.UIs.push(this.infoUI4);
        
        this.UpgradeButton1 = new UpgradeButton(this, 840, 93, 0); 
        this.Buttons.push(this.UpgradeButton1);
        this.UpgradeButton2 = new UpgradeButton(this, 590, 93, 1); 
        this.Buttons.push(this.UpgradeButton2);
        this.UpgradeButton3 = new UpgradeButton(this, 840, 48, 2); 
        this.Buttons.push(this.UpgradeButton3);
        this.UpgradeButton4 = new UpgradeButton(this, 590, 48, 3); 
        this.Buttons.push(this.UpgradeButton4);

        this.ExplainUI = new ExplainText(this, 250); this.UIs.push(this.ExplainUI);
        this.TimeUI = new TimeText(this); this.UIs.push(this.TimeUI);

        
        this.mouseX = 0, this.mouseY = 0;

        this.rankUI1 = new RankBoard(this); this.UIs.push(this.rankUI1);
        this.carbonUI1 = new CarbonBoard(this); this.UIs.push(this.carbonUI1);

        this.galaxyGenerate();
    }

    pause() {
        this.paused = true;
    }
    run() {
        this.updatePending = false;

        if(this.canUse){
            const now = performance.now();
            const deltaTime = (now - this.time) / 1000;
            this.time = now;

            this.clearCanvas();
            this.update(deltaTime);

            this.render();

            this.scheduleNextUpdate();
        }
    }

    endGame(){
        this.gameEnd = true;
    }

    play() {
        this.realPlay();
        
        this.paused = false;
        this.time = performance.now();
        this.scheduleNextUpdate();
        var backgroundMusic = new AudioClip(game,'Sounds/BackgroundMusic.mp3', -1);
    }

    render() {
        //게임끝!
        if(this.gameEnd){
            for(let c of this.cameras) c.render();
            for(let g of this.galaxys) g.render();
            for(let s of this.spaceships) s.render();
            for(let p of this.Particles) p.render();
            for(let m of this.Mines)  m.render();
            for(let b of this.bullets) b.render();
            
            //게임 끝난후 애님
            if(this.gameendAnimTime > 0){
                var x = 150 * this.uiScale; var y = 320 * this.uiScale;
                //랭킹 스크린
                {
                    let { x, y, width, height } = UntitledGame.spriteDefinition.RANKING_SCREEN;
                    this.context.drawImage(this.RankingScreen_Image,
                        x, y, width, height, -30 * this.uiScale, y,
                        width * 0.7 * this.uiScale, height * 0.7  * this.uiScale
                    );
                    
                    this.context.drawImage(this.BackMain_Image,
                        x, y, 800, 300, 680 * this.uiScale, 460 * this.uiScale,
                        800 * 0.5 * this.uiScale, 300 * 0.5 * this.uiScale
                    );
                }
                //랭킹 텍스트
                {
                    this.context.drawImage(this.EndText_Image[this.cameras[this.playerID - 1].rank - 1],
                        0, 0, 1500, 300, 
                        660 * this.uiScale, 15 * this.uiScale,
                        1500 * 0.7 * this.uiScale, 300 * 0.7 * this.uiScale
                    );
                }
                //랭킹 표시 텍스트
                {
                    x = 230 * this.uiScale; y = 180 * this.uiScale;
                    var line_offset = 80 * this.uiScale;

                    this.context.textBaseline = 'top';
                    this.context.textAlign = 'left';

                    for(var i=0;i<4;i++){
                        var rank = this.cameras[i].rank - 1;
                        this.context.fillStyle = this.teamColor[i];
                        if(this.cameras[i].owner == this.playerID)
                        {
                            this.context.font = "bold " + (60 * this.uiScale) + "px Agency FB";
                            this.context.fillText(this.cameras[i].playerName + " : "
                            + this.cameras[i].carbon, 
                            x, y + line_offset * rank);
                        }
                        else
                        {
                            this.context.font = (60 * this.uiScale) + "px Agency FB";
                            this.context.fillText(this.cameras[i].playerName + " : "
                            + this.cameras[i].carbon,  
                            x, y + line_offset * rank);
                        }
                    }
                }
            }
            return;
        }

        for(let c of this.cameras)
            c.render();

        for(let g of this.galaxys)
            g.render();

        for(let s of this.spaceships)
            s.render();
            
        for(let p of this.Particles)
            p.render();
    
        for(let m of this.Mines)
            m.render();

        for(let b of this.bullets)
            b.render();

        for(let ui of this.UIs)
            ui.render();

        for(let b of this.Buttons)
            b.render();
            
        for(let sb of this.SpaceShipButtons)
            sb.render();
    }

    update(deltaTime) {
        this.socketUpdate();

        this.uiScale = this.canvas.width / 1465;

        if(this.gameEnd){
            this.gameendAnimTime += deltaTime;
            return;
        }

        for(let c of this.cameras)
            c.update(deltaTime);

        for(let g of this.galaxys)
            g.update(deltaTime);

        for(let s of this.spaceships)
            s.update(deltaTime);

        this.spaceships = this.spaceships.filter(
            function(s) {
                return s.useful;
            }
        );
            
        for(let p of this.Particles)
            p.update(deltaTime);

        this.Particles = this.Particles.filter(
            function(p) {
                return p.useful;
            }
        );

        for(let ui of this.UIs)
            ui.update(deltaTime);

        for(let b of this.Buttons)
            b.update(deltaTime);
            
        for(let sb of this.SpaceShipButtons)
            sb.update(deltaTime);

        for(let m of this.Mines)
            m.update(deltaTime);

        this.Mines = this.Mines.filter(
            function(m) {
                return m.useful;
            }
        );

        for(let b of this.bullets){
            b.update(deltaTime);
        }
            
        this.bullets = this.bullets.filter(
            function(b) {
                return b.useful;
            }
        );

        for(let obj of this.sounds){
            obj.lifeTime -= deltaTime;
            if(obj.lifeTime <= 0){
                obj.useful = false;
            }
        }
        this.sounds = this.sounds.filter(
            function(obj) {
                return obj.useful;
            }
        );
        // this.socketUpdate();
    }

    socketUpdate() {
        if (localID == 1) {
            var myGalaxy = [];
            var mySpaceShip = [];
            for (var i = 0; i < this.galaxys.length;i++) {
                if (this.galaxys[i].owner == localID) {
                    var tmp = {
                        gID: this.galaxys[i].gID,
                        health: this.galaxys[i].defensiveForce,
                        owner: localID
                    };
                    myGalaxy.push(tmp);
                }
            }
            for (var i = 0; i < this.spaceships.length;i++) {
                if (this.spaceships[i].owner == localID) {
                    var tmp = {
                        ssID: this.spaceships[i].spaceshipID,
                        health: this.spaceships[i].health,
                        x: this.spaceships[i].x,
                        y: this.spaceships[i].y,
                        owner: localID
                    }
                    mySpaceShip.push(tmp);
                }
            }
            socket.emit("update", {
                camera: {
                    carbon: this.camera1.carbon,
                    x: this.camera1.x,
                    y: this.camera1.y,
                    isDead: this.camera1.isDead,
                    rank: this.camera1.rank
                },
                spaceShips: mySpaceShip,
                galaxys: myGalaxy,
                ID: localID
            });
        }
        
        if (localID == 2) {
            var myGalaxy = [];
            var mySpaceShip = [];
            for (var i = 0; i < this.galaxys.length;i++) {
                if (this.galaxys[i].owner == localID) {
                    var tmp = {
                        gID: this.galaxys[i].gID,
                        health: this.galaxys[i].defensiveForce,
                        owner: localID
                    };
                    myGalaxy.push(tmp);
                }
            }
            for (var i = 0; i < this.spaceships.length;i++) {
                if (this.spaceships[i].owner == localID) {
                    var tmp = {
                        ssID: this.spaceships[i].spaceshipID,
                        health: this.spaceships[i].health,
                        x: this.spaceships[i].x,
                        y: this.spaceships[i].y,
                        owner: localID
                    }
                    mySpaceShip.push(tmp);
                }
            }
            socket.emit("update", {
                camera: {
                    carbon: this.camera2.carbon,
                    x: this.camera2.x,
                    y: this.camera2.y,
                    isDead: this.camera2.isDead,
                    rank: this.camera2.rank
                },
                spaceShips: mySpaceShip,
                galaxys: myGalaxy,
                ID: localID
            });
        }
        
        if (localID == 3) {
            var myGalaxy = [];
            var mySpaceShip = [];
            for (var i = 0; i < this.galaxys.length;i++) {
                if (this.galaxys[i].owner == localID) {
                    var tmp = {
                        gID: this.galaxys[i].gID,
                        health: this.galaxys[i].defensiveForce,
                        owner: localID
                    };
                    myGalaxy.push(tmp);
                }
            }
            for (var i = 0; i < this.spaceships.length;i++) {
                if (this.spaceships[i].owner == localID) {
                    var tmp = {
                        ssID: this.spaceships[i].spaceshipID,
                        health: this.spaceships[i].health,
                        x: this.spaceships[i].x,
                        y: this.spaceships[i].y,
                        owner: localID
                    }
                    mySpaceShip.push(tmp);
                }
            }
            socket.emit("update", {
                camera: {
                    carbon: this.camera3.carbon,
                    x: this.camera3.x,
                    y: this.camera3.y,
                    isDead: this.camera3.isDead,
                    rank: this.camera3.rank
                },
                spaceShips: mySpaceShip,
                galaxys: myGalaxy,
                ID: localID
            });
        }
        
        if (localID == 4) {
            var myGalaxy = [];
            var mySpaceShip = [];
            for (var i = 0; i < this.galaxys.length;i++) {
                if (this.galaxys[i].owner == localID) {
                    var tmp = {
                        gID: this.galaxys[i].gID,
                        health: this.galaxys[i].defensiveForce,
                        owner: localID
                    };
                    myGalaxy.push(tmp);
                }
            }
            for (var i = 0; i < this.spaceships.length;i++) {
                if (this.spaceships[i].owner == localID) {
                    var tmp = {
                        ssID: this.spaceships[i].spaceshipID,
                        health: this.spaceships[i].health,
                        x: this.spaceships[i].x,
                        y: this.spaceships[i].y,
                        owner: localID
                    }
                    mySpaceShip.push(tmp);
                }
            }
            socket.emit("update", {
                camera: {
                    carbon: this.camera4.carbon,
                    x: this.camera4.x,
                    y: this.camera4.y,
                    isDead: this.camera4.isDead,
                    rank: this.camera4.rank
                },
                spaceShips: mySpaceShip,
                galaxys: myGalaxy,
                ID: localID
            });
        }
        if (localID != 1 && updateData1 != undefined) {
            this.camera1.carbon = updateData1.camera.carbon;
            this.camera1.x = updateData1.camera.x;
            this.camera1.y = updateData1.camera.y;
            this.camera1.isDead = updateData1.camera.isDead;
            this.camera1.rank = updateData1.camera.rank;

            for (var i = 0; i < updateData1.spaceShips.length;i++) {
                for (var j = 0; j < this.spaceships.length;j++) {
                    console.log(j + " : " + this.spaceships[j])
                    if (this.spaceships[j].spaceshipID == updateData1.spaceShips[i].ssID) {
                        this.spaceships[j].owner = updateData1.spaceShips[i].owner;
                        this.spaceships[j].health = updateData1.spaceShips[i].health;
                        this.spaceships[j].x = updateData1.spaceShips[i].x;
                        this.spaceships[j].y = updateData1.spaceShips[i].y;
                    }
                }
            }
            for (var i = 0; i < updateData1.galaxys.length;i++) {
                for (var j = 0; j < this.galaxys.length;j++) {
                    if (this.galaxys[j].gID == updateData1.galaxys[i].gID) {
                        this.galaxys[j].owner = updateData1.galaxys[i].owner;
                        this.galaxys[j].defensiveForce = updateData1.galaxys[i].health;
                    }
                }
            }
        }
        if (localID != 2 && updateData2 != undefined) {
            this.camera2.carbon = updateData2.camera.carbon;
            this.camera2.x = updateData2.camera.x;
            this.camera2.y = updateData2.camera.y;
            this.camera2.isDead = updateData2.camera.isDead;
            this.camera2.rank = updateData2.camera.rank;

            for (var i = 0; i < updateData2.spaceShips.length;i++) {
                for (var j = 0; j < this.spaceships.length;j++) {
                    if (this.spaceships[j].spaceshipID == updateData2.spaceShips[i].ssID) {
                        this.spaceships[j].owner = updateData2.spaceShips[i].owner;
                        this.spaceships[j].health = updateData2.spaceShips[i].health;
                        this.spaceships[j].x = updateData2.spaceShips[i].x;
                        this.spaceships[j].y = updateData2.spaceShips[i].y;
                    }
                }
            }
            for (var i = 0; i < updateData2.galaxys.length;i++) {
                for (var j = 0; j < this.galaxys.length;j++) {
                    if (this.galaxys[j].gID == updateData2.galaxys[i].gID) {
                        this.galaxys[j].owner = updateData2.galaxys[i].owner;
                        this.galaxys[j].defensiveForce = updateData2.galaxys[i].health;
                    }
                }
            }
        }
        if (localID != 3 && updateData3 != undefined) {
            this.camera3.carbon = updateData3.camera.carbon;
            this.camera3.x = updateData3.camera.x;
            this.camera3.y = updateData3.camera.y;
            this.camera3.isDead = updateData3.camera.isDead;
            this.camera3.rank = updateData3.camera.rank;

            for (var i = 0; i < updateData3.spaceShips.length;i++) {
                for (var j = 0; j < this.spaceships.length;j++) {
                    if (this.spaceships[j].spaceshipID == updateData3.spaceShips[i].ssID) {
                        this.spaceships[j].owner = updateData3.spaceShips[i].owner;
                        this.spaceships[j].health = updateData3.spaceShips[i].health;
                        this.spaceships[j].x = updateData3.spaceShips[i].x;
                        this.spaceships[j].y = updateData3.spaceShips[i].y;
                    }
                }
            }
            for (var i = 0; i < updateData3.galaxys.length;i++) {
                for (var j = 0; j < this.galaxys.length;j++) {
                    if (this.galaxys[j].gID == updateData3.galaxys[i].gID) {
                        this.galaxys[j].owner = updateData3.galaxys[i].owner;
                        this.galaxys[j].defensiveForce = updateData3.galaxys[i].health;
                    }
                }
            }
        }
        if (localID != 4 && updateData4 != undefined) {
            this.camera4.carbon = updateData4.camera.carbon;
            this.camera4.x = updateData4.camera.x;
            this.camera4.y = updateData4.camera.y;
            this.camera4.isDead = updateData4.camera.isDead;
            this.camera4.rank = updateData4.camera.rank;

            for (var i = 0; i < updateData4.spaceShips.length;i++) {
                for (var j = 0; j < this.spaceships.length;j++) {
                    if (this.spaceships[j].spaceshipID == updateData4.spaceShips[i].ssID) {
                        this.spaceships[j].owner = updateData4.spaceShips[i].owner;
                        this.spaceships[j].health = updateData4.spaceShips[i].health;
                        this.spaceships[j].x = updateData4.spaceShips[i].x;
                        this.spaceships[j].y = updateData4.spaceShips[i].y;
                    }
                }
            }
            for (var i = 0; i < updateData4.galaxys.length;i++) {
                for (var j = 0; j < this.galaxys.length;j++) {
                    if (this.galaxys[j].gID == updateData4.galaxys[i].gID) {
                        this.galaxys[j].owner = updateData4.galaxys[i].owner;
                        this.galaxys[j].defensiveForce = updateData4.galaxys[i].health;
                    }
                }
            }
        }
    }

    scheduleNextUpdate() {
        if (!this.updatePending && !this.paused) {
            this.updatePending = true;
            this.raqId = requestAnimationFrame(this.run.bind(this));
        }
    }

    clearCanvas() {
        if(this.gameEnd)
            this.context.fillStyle="#CEECF5";
        else
            this.context.fillStyle="#170B3B";
        this.context.fillRect(
            0, 0, this.canvas.width, this.canvas.height);
    }

    onVisibilityChange(event) {
        if (document.hidden
            || event.type === 'blur'
            || document.visibilityState !== 'visible') {
            this.canControl = false;
        } else {
            this.canControl = true;
        }
    }
    onKeyDown(event) {
        this.stayKeys[event.code] = true;
    }

    onKeyUp(event) {
        this.stayKeys[event.code] = false;
    }

    isKeyStay(code) {
        if(this.canControl){
            return this.stayKeys[code];
        }
    }

    leftmouseClick(event){
        if(this.gameEnd){
            if(event.x > 680 * this.uiScale &&
                event.x < 680 * this.uiScale + 400 * this.uiScale &&
                event.y > 460 * this.uiScale &&
                event.y < 460 * this.uiScale + 150 * this.uiScale)
                {
                    BackToMain();
                }
            return;
        }
        var flag = false;
        var mousePosX = event.x - this.mainCamera.x;
        var mousePosY = event.y - this.mainCamera.y;

        for(let b of this.Buttons){
            if (
                event.x > b.x && 
                event.x < b.x + b.width &&
                event.y > b.y && 
                event.y < b.y + b.height && this.nowClicked_Obj != null){
                    b.buttonClick(this.nowClicked_Obj);
                    return;
                }
        }

        for(let sb of this.SpaceShipButtons){
            if (
                event.x > sb.x && 
                event.x < sb.x + sb.width * 0.7 &&
                event.y > sb.y && 
                event.y < sb.y + sb.height * 0.7
              ) 
            {
                sb.buttonClick()
                return;
            }
        }

        if(this.mineSetting){
            if(this.mainCamera.carbon >= 2000){
                var offsetX = this.nowClicked_Obj.centerX - mousePosX;
                var offsetY = this.nowClicked_Obj.centerY - mousePosY;
                
                if(offsetX*offsetX + offsetY*offsetY < 400 * 400){
                    this.mainCamera.carbon -= 2000;
                    this.nowClicked_Obj.mine++;
                    this.mineSetting = false;
                    var newMine = new SpaceMine(game, mousePosX, mousePosY, this.nowClicked_Obj.owner, this.nowClicked_Obj)
                    this.Mines.push(newMine);
                    this.ExplainUI.explainSet("", 0.1);
                    return;
                }else{
                    this.ExplainUI.explainSet("우주선으로부터 너무 멀리 설치할 수 없습니다", 10, "Red");
                }
                return;
            }
            else{
                this.ExplainUI.explainSet("Carbon이 부족합니다", 10, "Red");
            }
        }

        for(let s of this.spaceships){
            if (
                event.x > (this.mainCamera.x + s.x) && 
                event.x < (this.mainCamera.x + s.x) + s.animation.width * UntitledGame.config.SCALE &&
                event.y > (this.mainCamera.y + s.y) && 
                event.y < (this.mainCamera.y + s.y) + s.animation.height * UntitledGame.config.SCALE
              ) 
            {
                this.nowClicked_Obj = s;
                this.nowClicked_Obj.attackTarget = null;
                this.nowClicked_Obj.isAttacking = false;
                return;
            }
        }

        for(let g of this.galaxys){
            if (
                event.x > (this.mainCamera.x + g.x) && 
                event.x < (this.mainCamera.x + g.x) + g.animation.width * UntitledGame.config.SCALE &&
                event.y > (this.mainCamera.y + g.y) && 
                event.y < (this.mainCamera.y + g.y) + g.animation.height * UntitledGame.config.SCALE
              ) 
            {
                if(this.spaceShipSetting){
                    if(g.owner == this.playerID){
                        if(this.mainCamera.carbon >= 2000){
                            var newSpaceShip = new SpaceShip(
                                this, "화학 우주선", this.cameras[this.playerID - 1].playerName); 
                            this.spaceships.push(newSpaceShip);
                            newSpaceShip.x = g.centerX;  newSpaceShip.y = g.centerY;
                            newSpaceShip.owner = this.playerID;
                            newSpaceShip.spaceshipID = idCount++;
                            console.log("id : " + newSpaceShip.spaceshipID)
                            newSpaceShip.targetX = g.centerX;  newSpaceShip.targetY = g.centerY;
                            this.spaceShipSetting = false;
                            this.ExplainUI.explainSet("", 0.1);

                            this.SpaceShipButtons[this.mainCamera.nowCount].index = 2;
                            if (this.mainCamera.nowCount < this.mainCamera.maxCount)
                                this.SpaceShipButtons[this.mainCamera.nowCount + 1].index = 1;
                            this.SpaceShipButtons[this.mainCamera.nowCount].connectedObj = newSpaceShip;
                            this.mainCamera.nowCount++;
                        }
                        else{
                            this.ExplainUI.explainSet("Carbon이 부족합니다", 10, "Red");
                        }
                    }
                    else{
                        this.ExplainUI.explainSet("우주선은 자신의 은하에서만 생성 가능합니다", 10, "Red");
                    }
                }
                else{
                    this.nowClicked_Obj = g;
                    this.nowClicked_Obj.attackTarget = null;
                    this.nowClicked_Obj.isAttacking = false;
                }
                return;
            }
        }

        if(!flag && this.nowClicked_Obj != null){
            this.nowClicked_Obj = null;
        }
    }

    rightmouseClick(event){
        if(this.gameEnd)
            return;
        var flag = false;
        var mousePosX = event.x - this.mainCamera.x;
        var mousePosY = event.y - this.mainCamera.y;

        if(this.mineSetting){
            this.mineSetting = false;
            this.ExplainUI.explainSet("", 1, "White");
            return;
        }
        if(this.spaceShipSetting){
            this.spaceShipSetting = false;
            this.ExplainUI.explainSet("", 1, "White");
            return;
        }
        
        for(let s of this.spaceships){
            if (
                event.x > (this.mainCamera.x + s.x) && 
                event.x < (this.mainCamera.x + s.x) + s.animation.width * UntitledGame.config.SCALE &&
                event.y > (this.mainCamera.y + s.y) && 
                event.y < (this.mainCamera.y + s.y) + s.animation.height * UntitledGame.config.SCALE&&
                this.playerID != s.owner &&
                this.nowClicked_Obj != null
              ) 
            {
                this.nowClicked_Obj.attackTarget = s;
                return;
            }
        }

        for(let g of this.galaxys){
            if (
                event.x > (this.mainCamera.x + g.x) && 
                event.x < (this.mainCamera.x + g.x) + g.animation.width * UntitledGame.config.SCALE &&
                event.y > (this.mainCamera.y + g.y) && 
                event.y < (this.mainCamera.y + g.y) + g.animation.height * UntitledGame.config.SCALE&&
                this.playerID != g.owner &&
                this.nowClicked_Obj != null
                ) 
            {
                this.nowClicked_Obj.attackTarget = g;
                return;
            }
        }

        if(this.nowClicked_Obj instanceof SpaceShip && this.nowClicked_Obj.owner == this.playerID
             ){
                this.nowClicked_Obj.setDestination(mousePosX, mousePosY);
                this.nowClicked_Obj.attackTarget = null;
                this.nowClicked_Obj.isAttacking = false;
                return;
        }

        if(!flag && this.nowClicked_Obj != null){
            this.nowClicked_Obj.attackTarget = null;
            this.nowClicked_Obj.isAttacking = false;
            this.nowClicked_Obj = null;
        }
    }

    audioPlay(audio){
        if(this.backSound && this.canControl){
            switch(audio){
                case 0: var newAudio = new AudioClip(game,'Sounds/normal.wav'); break;
                case 1: var newAudio = new AudioClip(game,'Sounds/iceball.wav'); break;
                case 2: var newAudio = new AudioClip(game,'Sounds/shotgun.mp3'); break;
                case 3: var newAudio = new AudioClip(game,'Sounds/teleport.wav'); break;
                case 4: var newAudio = new AudioClip(game,'Sounds/woodenwalk_1.mp3'); break;
                case 5: var newAudio = new AudioClip(game,'Sounds/rune.wav'); break;
                case 6: var newAudio = new AudioClip(game,'Sounds/iceball_frozen.mp3'); break;
                case 7: var newAudio = new AudioClip(game,'Sounds/take.mp3'); break;
                case 8: var newAudio = new AudioClip(game,'Sounds/wall.mp3'); break;
            }
            this.sounds.push(newAudio);
            newAudio.lifeTime = 5;
        }
    }

    //은하 생성
    galaxyGenerate(){
        var newGalaxy = new Galaxy(this, 1, GalaxyName(1)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 250;  newGalaxy.y = 250; newGalaxy.owner = 1;

        newGalaxy = new Galaxy(this, 1, GalaxyName(1)); this.galaxys.push(newGalaxy);
        newGalaxy.x = UntitledGame.config.MAP_WIDTH - 370; newGalaxy.y = 250; 
        newGalaxy.owner = 2;

        newGalaxy = new Galaxy(this, 1, GalaxyName(1)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 250; newGalaxy.y = UntitledGame.config.MAP_HEIGHT - 370; 
        newGalaxy.owner = 3;

        newGalaxy = new Galaxy(this, 1, GalaxyName(1)); this.galaxys.push(newGalaxy);
        newGalaxy.x = UntitledGame.config.MAP_WIDTH - 370;
        newGalaxy.y = UntitledGame.config.MAP_HEIGHT - 370;
        newGalaxy.owner = 4;

        newGalaxy = new Galaxy(this, 1, GalaxyName(1)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 2030; newGalaxy.y = 620;

        newGalaxy = new Galaxy(this, 1, GalaxyName(1)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 2630; newGalaxy.y = 920;

        newGalaxy = new Galaxy(this, 1, GalaxyName(1)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 2430; newGalaxy.y = 1920;
        
        newGalaxy = new Galaxy(this, 1, GalaxyName(2)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 1150; newGalaxy.y = 1500;
        
        newGalaxy = new Galaxy(this, 1, GalaxyName(2)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 1550; newGalaxy.y = 1950;

        newGalaxy = new Galaxy(this, 2, GalaxyName(2)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 1880; newGalaxy.y = 150;

        newGalaxy = new Galaxy(this, 2, GalaxyName(2)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 950; newGalaxy.y = 600;

        newGalaxy = new Galaxy(this, 2, GalaxyName(2)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 1850; newGalaxy.y = 1650;

        newGalaxy = new Galaxy(this, 2, GalaxyName(2)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 2680; newGalaxy.y = 1560;

        newGalaxy = new Galaxy(this, 2, GalaxyName(2)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 3580; newGalaxy.y = 1460;

        newGalaxy = new Galaxy(this, 2, GalaxyName(2)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 2680; newGalaxy.y = 230;

        newGalaxy = new Galaxy(this, 2, GalaxyName(2)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 980; newGalaxy.y = 1160;

        newGalaxy = new Galaxy(this, 3, GalaxyName(3)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 320; newGalaxy.y = 1060;

        newGalaxy = new Galaxy(this, 3, GalaxyName(3)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 920; newGalaxy.y = 1860;

        newGalaxy = new Galaxy(this, 3, GalaxyName(3)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 1020; newGalaxy.y = 160;

        newGalaxy = new Galaxy(this, 3, GalaxyName(3)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 3490; newGalaxy.y = 860;

        newGalaxy = new Galaxy(this, 4, GalaxyName(4)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 1520; newGalaxy.y = 980;

        newGalaxy = new Galaxy(this, 4, GalaxyName(4)); this.galaxys.push(newGalaxy);
        newGalaxy.x = 2320; newGalaxy.y = 1180;

        
        var newSpaceShip = new SpaceShip(this, "화학 우주선", this.camera1.playerName); this.spaceships.push(newSpaceShip);
        newSpaceShip.x = 450;  newSpaceShip.y = 450; newSpaceShip.owner = 1;
        newSpaceShip.targetX = 450;  newSpaceShip.targetY = 450;
        newSpaceShip.spaceshipID = idCount++;
        console.log("id : " + newSpaceShip.spaceshipID)
        
        newSpaceShip = new SpaceShip(this, "화학 우주선", this.camera2.playerName); this.spaceships.push(newSpaceShip);
        newSpaceShip.x = UntitledGame.config.MAP_WIDTH - 570;  newSpaceShip.y = 450; newSpaceShip.owner = 2;
        newSpaceShip.targetX = UntitledGame.config.MAP_WIDTH - 570;  newSpaceShip.targetY = 450;
        newSpaceShip.spaceshipID = idCount++;
        console.log("id : " + newSpaceShip.spaceshipID)
        
        newSpaceShip = new SpaceShip(this, "화학 우주선", this.camera3.playerName); this.spaceships.push(newSpaceShip);
        newSpaceShip.x = 450;  newSpaceShip.y = UntitledGame.config.MAP_HEIGHT - 570; newSpaceShip.owner = 3;
        newSpaceShip.targetX = 450;  newSpaceShip.targetY = UntitledGame.config.MAP_HEIGHT - 570;
        newSpaceShip.spaceshipID = idCount++;
        console.log("id : " + newSpaceShip.spaceshipID)
        
        newSpaceShip = new SpaceShip(this, "화학 우주선", this.camera4.playerName); this.spaceships.push(newSpaceShip);
        newSpaceShip.x = UntitledGame.config.MAP_WIDTH - 570;  
        newSpaceShip.y = UntitledGame.config.MAP_HEIGHT - 570; newSpaceShip.owner = 4;
        newSpaceShip.targetX = UntitledGame.config.MAP_WIDTH - 570;  
        newSpaceShip.targetY = UntitledGame.config.MAP_HEIGHT - 570;
        newSpaceShip.spaceshipID = idCount++;
        console.log("id : " + newSpaceShip.spaceshipID)

        this.SpaceShipButton1 = new SpaceShipButton(this, 1464, 217, 0); 
        this.SpaceShipButtons.push(this.SpaceShipButton1);
        this.SpaceShipButton1.index = 2; this.SpaceShipButton1.connectedObj = this.spaceships[this.playerID - 1];
        this.SpaceShipButton2 = new SpaceShipButton(this, 1391, 217, 1); 
        this.SpaceShipButtons.push(this.SpaceShipButton2);
        this.SpaceShipButton2.index = 1;
        this.SpaceShipButton3 = new SpaceShipButton(this, 1318, 217, 2); 
        this.SpaceShipButtons.push(this.SpaceShipButton3);
        this.SpaceShipButton4 = new SpaceShipButton(this, 1464, 144, 3); 
        this.SpaceShipButtons.push(this.SpaceShipButton4);
        this.SpaceShipButton5 = new SpaceShipButton(this, 1391, 144, 4); 
        this.SpaceShipButtons.push(this.SpaceShipButton5);
        this.SpaceShipButton6 = new SpaceShipButton(this, 1318, 144, 5); 
        this.SpaceShipButtons.push(this.SpaceShipButton6);
        this.SpaceShipButton7 = new SpaceShipButton(this, 1464, 71, 6); 
        this.SpaceShipButtons.push(this.SpaceShipButton7);
        this.SpaceShipButton8 = new SpaceShipButton(this, 1391, 71, 7); 
        this.SpaceShipButtons.push(this.SpaceShipButton8);
        this.SpaceShipButton9 = new SpaceShipButton(this, 1318, 71, 8); 
        this.SpaceShipButtons.push(this.SpaceShipButton9);

        this.miniMap1 = new MiniMap(this); this.UIs.push(this.miniMap1);
    }
}

UntitledGame.spriteDefinition = {//x, y, width, height
    EllapseGALAXY: new Rect(10, 10, 304, 304),
    LensGALAXY: new Rect(0, 0, 333, 332),
    StickGALAXY: new Rect(0, 0, 333, 332),
    SpiralGALAXY: new Rect(0, 0, 310.8, 310.8),

    BULLET1: new Rect(420, 10, 72.5, 72.5),
    BULLET2: new Rect(495, 10, 72.5, 72.5),
    BULLET3: new Rect(422, 81, 72.5, 72.5),
    BULLET4: new Rect(492.5, 80, 72.5, 72.5),
    BULLET5: new Rect(420, 155, 72.5, 72.5),

    CHEMICALSPACE_SHIP:new Rect(0, 0, 310, 310),

    CHEMICALBULLET:new Rect(0, 0, 70, 70),

    EXPLAIN_PANEL:new Rect(0,0,1922,390),
    UPGRADE_BUTTON :new Rect(50,120,205,70),
    SPACESHIP_BUTTON :new Rect(0,0,300,300),
    RANKING_SCREEN :new Rect(0,0,1150,850),
    
    SPACEMINE :new Rect(20,0,303,300),

    BANG :new Rect(0,0,305,305)
}

//메인으로 돌아가기
function BackToMain(){
    window.location.href = "http://localhost";
}

//이름 생성기(짜피 이름이니까 서버에서 안맞춰줘도 되고 맞춰줘도 되고)
function GalaxyName(index){
    switch(index){
        case 0 : //불규칙 은하
        return "I-" + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9);
        case 1 : //타원 은하
        return "E-" + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9);
        case 2 : //렌즈 은하
        return "L-" + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9);
        case 3 : //막대 은하
        return "S-" + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9);
        case 4 : //나선 은하
        return "H-" + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9);
        case 3 : //퀘이사
        return "Q-" + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9);
    }
}

// 게임 설정
UntitledGame.config = {
    PLANET_RESOURCE_TERM : 1,
    MAP_WIDTH : 3840,
    MAP_HEIGHT : 2160,

    MAP_SCALE : 0.1,
    Icon_SCALE : 0.05,
    Panel_Height_RATE : 0.209,
    SCALE : 0.4
}

var socket = io();
var updateData1 = {
    camera: {
        carbon: 1000,
        x: 0,
        y: 0,
        isDead: false,
        rank: 1,
    },
    spaceShips: [{ssID: 0, health: 200, x: 0, y: 0, owner: 1}],
    galaxys: [{gID: 0, health: 200, owner: 1}],
    ID: localID
};
var updateData2 = {
    camera: {
        carbon: 1000,
        x: 0,
        y: 0,
        isDead: false,
        rank: 2,
    },
    spaceShips: [{ssID: 1, health: 200, x: 0, y: 0, owner: 2}],
    galaxys: [{gID: 1, health: 200, owner: 2}],
    ID: localID
};
var updateData3 = {
    camera: {
        carbon: 1000,
        x: 0,
        y: 0,
        isDead: false,
        rank: 1,
    },
    spaceShips: [{ssID: 2, health: 200, x: 0, y: 0, owner: 3}],
    galaxys: [{gID: 2, health: 200, owner: 3}],
    ID: localID
};
var updateData4 = {
    camera: {
        carbon: 1000,
        x: 0,
        y: 0,
        isDead: false,
        rank: 1,
    },
    spaceShips: [{ssID: 3, health: 200, x: 0, y: 0, owner: 4}],
    galaxys: [{gID: 3, health: 200, owner: 4}],
    ID: localID
};

/* socket event */
var __gID = 0;
var idCount = 0;
var p1Name, p2Name, p3Name, p4Name, pID;

    socket.on('start game', data => {
        p1Name = data[0].name;
        p2Name = data[1].name;
        p3Name = data[2].name;
        p4Name = data[3].name;

        roomname = "TestRoom";

        pID = localID;

        game.play();
    });

    socket.on('update1', (data) => {
        updateData1 = data;
    })
    socket.on('update2', (data) => {
        updateData2 = data;
    })
    socket.on('update3', (data) => {
        updateData3 = data;
    })
    socket.on('update4', (data) => {
        updateData4 = data;
    })
    
    socket.on('connect', () => {
    });
    
    socket.on('disconnect', () => {
        socket.emit('gameDisconnect');
    });
    
    var canvas = document.getElementById("game");
    let game = new UntitledGame(canvas);

window.onresize = function(){
    canvas.style.widows = window.innerWidth;
    canvas.style.height = window.innerHeight;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    game.context.fillStyle="#170B3B";
    game.context.fillRect(0, 0, canvas.width, canvas.height);
}

window.onload = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    game.context.fillStyle="#170B3B";
    game.context.fillRect(0, 0, canvas.width, canvas.height);

    canvas.addEventListener('click', function(event)
    {
        game.leftmouseClick(event);
    });
    canvas.addEventListener("contextmenu", function(event)
    {
        event.preventDefault();
        game.rightmouseClick(event);
    });

    canvas.addEventListener("mousemove", function(event)
    {
        // game.mouseX = event.x - game.mainCamera.x;
        // game.mouseY = event.y - game.mainCamera.y;
    });
};