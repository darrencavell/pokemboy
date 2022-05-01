class Person {
  constructor (parameters) {
    this.parameters = parameters || {
      x: 0,
      y: 0,
      behavior: {
        type: '',
        direction: ''
      },
      currentBehavior: {
        type: '',
        direction: ''
      },
      movingProgress: 0
    };
  }

  _updateCoordinates(direction) {
    switch (direction) {
      case 'UP':
        this.parameters.y -= 1;
        break;
      case 'DOWN':
        this.parameters.y += 1;
        break;
      case 'LEFT':
        this.parameters.x -= 1;
        break;
      case 'RIGHT':
        this.parameters.x += 1;
        break;
      default:
        break;
    }
  }

  _startBehavior() {
    const behavior = this.parameters.currentBehavior;

    if (behavior) return;

    if (this.parameters.behavior.direction) {
      this.parameters.currentBehavior = this.parameters.behavior;
    } else if (!this.parameters.currentBehavior) {
      this.parameters.currentBehavior = null;
    }
  }

  _endBehavior() {
    if (!this.parameters.currentBehavior) return;

    let isBehaviorFinished = false;

    if (this.parameters.movingProgress >= 32) {
      isBehaviorFinished = true;
      this._updateCoordinates(this.parameters.currentBehavior.direction);
    }

    if (isBehaviorFinished) {
      this.parameters.movingProgress = 0;
      this.parameters.behavior = null;
      this.parameters.currentBehavior = null;
    }
  }

  _move() {
    if (this.parameters.currentBehavior.type === 'walk') {
      if (this.parameters.movingProgress === undefined) {
        this.parameters.movingProgress = 0;
      }
  
      this.parameters.movingProgress += 1;
      this.parameters.isTriggeringCanvas = true;
    }
  }

  update() {
    this._startBehavior();

    if (this.parameters.currentBehavior) {
      this._move();
    }

    this._endBehavior();
  }
}

export default Person;
