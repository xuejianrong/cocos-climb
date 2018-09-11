cc.Class({
  extends: cc.Component,

  properties: {
    stairPrefab: cc.Prefab,
    stairs: [cc.Node],
    isStart: false,
    speed: 0,
    player: cc.Node,
  },
  onLoad () {
    this.createStairs();
  },

  start () {
    // this.startGame();
  },

  update (dt) {
    if (this.isStart) {
      this.move(dt);
      this.checkBgReset();
    }
  },

  createStairs() {
    let i = 0;
    while (i < 6) {
      const newStair = cc.instantiate(this.stairPrefab);
      // const stairComponent = newStair.getComponent('stair');
      this.node.addChild(newStair, -1);
      newStair.setPosition(cc.v2(0, (205 * i) + 180));
      this.stairs.push(newStair);
      i += 1;
    }
  },
  startGame() {
    this.isStart = true;
    // this.stairs.forEach(item => console.log(item.getBoundingBox()));
  },
  move(t) {
    this.stairs.forEach(item => {
      item.y -= this.speed * t;
    });
  },
  // 检查是否要重置位置
  checkBgReset(){
    // var winSize = cc.director.getWinSize();
    const first_yMax = this.stairs[0].getBoundingBox().yMax;
    if (first_yMax <= 0) {
      const preFirst = this.stairs.shift();
      this.stairs.push(preFirst);
      const curFirst = this.stairs[4];
      preFirst.y = curFirst.getBoundingBox().yMax + 205;
    }
  }
});
