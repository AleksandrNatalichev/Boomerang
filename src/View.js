// Сделаем отдельный класс для отображения игры в консоли.
/* eslint-disable class-methods-use-this */
class View {
  render(track, score) {
    const yourTeamName = 'Elbrus';

    // Тут всё рисуем.
    console.clear();
    console.log(track.join(''));
    console.log('\n\n');
    console.log(`Your score:${score}`);
    console.log(`Created by "${yourTeamName}" with love`);
  }
}

module.exports = View;
