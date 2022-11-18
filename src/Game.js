// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
// const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const runInteractiveConsole = require('./keyboard');
const Boomerang = require('./game-models/Boomerang');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.hero = new Hero({ position: 0, boomerang: new Boomerang() });
    this.enemy = new Enemy(this.trackLength);
    this.view = new View();
    this.track = [];
    this.regenerateTrack();
    this.runInteractiveConsole = runInteractiveConsole(this);
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = (new Array(this.trackLength)).fill('\u202F');
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.hero.boomerang.position] = this.hero.boomerang.skin;
    this.track[this.enemy.position] = this.enemy.skin;
  }

  check() {
    const enemyPos = this.enemy.position;
    const boomerangPos = this.hero.boomerang.position;
    const boomerangIsDeadly = this.hero.boomerang.isDeadly;
    const heroPos = this.hero.position;
    if ((enemyPos === boomerangPos && boomerangIsDeadly)
      || (enemyPos === boomerangPos + 1 && boomerangIsDeadly)
      || (enemyPos === boomerangPos - 1 && boomerangIsDeadly)) {
      this.enemy.die();
      this.hero.score += 1;
    }
    if (heroPos === enemyPos - 1
      || heroPos === enemyPos
      || heroPos === enemyPos + 1) {
      this.hero.die();
    }
  }

  play() {
    setInterval(() => {
      // Let's play!
      this.check();

      if (this.hero.isDead) {
        this.regenerateTrack();
        this.view.render(this.track, this.hero.score);
        this.end();
      } else if (this.enemy.isDead) {
        this.regenerateTrack();
        this.enemy = new Enemy(this.trackLength);
        this.enemy.moveLeft();
        this.view.render(this.track, this.hero.score);
      } else {
        this.regenerateTrack();
        this.enemy.moveLeft();
        this.view.render(this.track, this.hero.score);
      }
    }, 50);
  }

  end() {
    console.log('You are dead(');
    
    process.exit();
  }
}

module.exports = Game;
