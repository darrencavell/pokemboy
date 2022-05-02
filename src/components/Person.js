class Person {
  constructor (parameters, walls) {
    this.parameters = parameters || {
      x: 0,
      y: 0,
      behaviour: {
        type: '',
        direction: ''
      },
      currentBehaviour: {
        type: '',
        direction: ''
      },
      movingProgress: 0,
      isEncounteringWildPokemon: false
    };

    this.walls = walls;
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

  _getNextSpace = function (x, y, direction) {
    if (direction === 'UP') return `${x}x${y - 1}`;
    else if (direction === 'DOWN') return `${x}x${y + 1}`;
    else if (direction === 'LEFT') return `${x - 1}x${y}`;
    else if (direction === 'RIGHT') return `${x + 1}x${y}`;
  }

  _isEncounteringWildPokemon() {
    return Math.round(Math.random());
  }

  _isBehaviourValid() {
    const nextSpace = this._getNextSpace(this.parameters.x, this.parameters.y, this.parameters?.behaviour?.direction);

    const isBlockedByWalls = this.walls[nextSpace];
    if (isBlockedByWalls) return false;

    return true;
  }

  _startBehaviour() {
    const behaviour = this.parameters.currentBehaviour;

    if (behaviour) return;

    if (this.parameters.behaviour.direction) {
      if (this._isBehaviourValid()) {
        if (this._isEncounteringWildPokemon()) {
          this.parameters.isEncounteringWildPokemon = true;
        }
        this.parameters.currentBehaviour = this.parameters.behaviour;
      }
    } else if (!this.parameters.currentBehaviour) {
      this.parameters.currentBehaviour = null;
    }
  }

  _endBehaviour() {
    if (!this.parameters.currentBehaviour) return;

    let isBehaviourFinished = false;

    if (this.parameters.movingProgress >= 16) {
      isBehaviourFinished = true;
      this._updateCoordinates(this.parameters.currentBehaviour.direction);
    }

    if (isBehaviourFinished) {
      this.parameters.movingProgress = 0;
      this.parameters.behaviour = null;
      this.parameters.currentBehaviour = null;
    }
  }

  _move() {
    if (this.parameters.currentBehaviour.type === 'walk') {
      if (this.parameters.movingProgress === undefined) {
        this.parameters.movingProgress = 0;
      }
  
      this.parameters.movingProgress += 1;
      this.parameters.isTriggeringCanvas = true;
    }
  }

  update() {
    this._startBehaviour();

    if (this.parameters.currentBehaviour) {
      this._move();
    }

    this._endBehaviour();
  }
}

export default Person;
