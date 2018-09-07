cc.Class({
  extends: cc.Component,

  properties: {
    // 障碍物容器个数
    barrierBoxNum: 10,
    // 最小、最大障碍数
    min: 3,
    max: 5,
    // 障碍位置数组
    barrierPositions: [],

    // 阶梯的容器
    container: {
      default: null,
      type: cc.Node
    },
    // 游戏
    game: {
      default: null,
      type: cc.Component
    },
    // 障碍物容器预制对象
    itemPrefab: {
      default: null,
      type: cc.Prefab
    },
    // 障碍物预制对象
    barrierPrefab: {
      default: null,
      type: cc.Prefab
    },
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    // 随机障碍和位置
    this.random();
    // 生成障碍物容器
    this.createBarrierBox();
    // 向下滑动
    this.node.runAction(this.setMoveAction());
  },

  start () {
  },

  setMoveAction() {
    // 渐现
    const fadeIn = cc.fadeIn(1.0);
    // 移动
    const move = cc.moveTo(3, cc.v2(0, 0));
    // 运动到屏幕外之后，销毁阶梯
    const finished = cc.callFunc(this.moveActionBack, this);
    return cc.spawn(cc.sequence(move, finished), fadeIn);
  },
  moveActionBack() {
    this.node.destroy();
    this.game.stairs.shift();
  },
  createBarrierBox() {
    // 根据最大个数计算宽度
    const w = (750 - (this.barrierBoxNum + 1) * 10) / this.barrierBoxNum;
    // 根据最大障碍数添加障碍容器
    for (let i = 0; i < this.barrierBoxNum; i += 1) {
      // 生成障碍容器节点
      const item = cc.instantiate(this.itemPrefab);
      item.width = w;
      // 存在障碍则添加到容器
      if (this.barrierPositions.includes(i + 1)) {
        const barrier = cc.instantiate(this.barrierPrefab);
        item.addChild(barrier);
      }
      // 障碍容器添加到stair中
      this.node.addChild(item);
    }
  },
  // 随机障碍数、随机出现障碍物容器，并设置障碍位置数组
  random() {
    // 障碍数
    const num = this.randomNum(this.min, this.max);
    // 位置
    while (this.barrierPositions.length < num) {
      this.randomPosition();
    }
  },
  randomNum(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  },
  randomPosition() {
    const ran = this.randomNum(1, this.barrierBoxNum);
    if (!this.barrierPositions.includes(ran)) this.barrierPositions.push(ran);
  }

  // update (dt) {},
});
