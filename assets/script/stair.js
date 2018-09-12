cc.Class({
  extends: cc.Component,

  properties: {
    // 障碍物个数
    barrierNum: 0,
    // 障碍位置数
    posiNum: 0,
    // 障碍位置数组
    barrierPositions: [],
    barriers: [],
    noBarrier: false,
    barrierPrefab: cc.Prefab,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    if (!this.noBarrier) {
      // 随机位置
      this.randomPosition();
      // 根据随机位置添加障碍物
      this.createBarrier();
    }
  },

  start () {
  },
  // 随机出现障碍物位置
  randomPosition() {
    this.barrierPositions.length = 0;
    let arr = [], i = 0, j = 0, ran = 0;
    while (i < this.posiNum) arr.push(i ++);
    while (j < this.barrierNum) {
      ran = parseInt(arr.length * Math.random(), 10);
      this.barrierPositions.push(arr[ran]);
      arr.splice(ran, 1);
      j += 1;
    }
    this.barrierPositions.sort((a, b) => (a > b));
  },
  createBarrier() {
    // 如果是重置stair位置的话，barriers里本来就有一些barrier的，所以得用长度去判断是否需要增加
    // 在setBarrierPosition的时候也需要遍历设置位置，不能在下面的while中设置位置
    while (this.barrierPositions.length !== this.barriers.length) {
      const newBarrier = cc.instantiate(this.barrierPrefab);
      this.barriers.push(newBarrier);
      this.node.addChild(newBarrier);
    }
    this.setBarrierPosition();
  },
  setBarrierPosition() {
    this.barriers.forEach((barrier, i) => {
      barrier.setPosition(cc.v2(42 + (74 * this.barrierPositions[i]) - 375, 50));
    });
  },

  // update (dt) {},
});
