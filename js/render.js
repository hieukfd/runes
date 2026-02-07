let score = [];
for (let i = 0; i < days.length; i++) {
  score.push(combineRunes(days[i]));
}

var ViewModel = function (days, score) {
  this.days = ko.observableArray(days);
  this.total = ko.observableArray(days.flat());
  this.arr = ko.observableArray(count(this.total()));
  this.score = ko.observableArray(
    score.map((value, index) => ({
      value,
      index: index + 1,
    })),
  );

  this.scoreSortByValue = ko.computed(() => {
    return [...this.score()].sort((a, b) => a.value - b.value);
  });

  this.daysProcessed = ko.computed(() => {
    return this.days().map((day) => ({
      raw: day,
      list: countRunes(day),
    }));
  });

  this.mappingArr = ko.computed(() => {
    return this.arr().map((item) => ({
      name: item[0],
      quantity: item[1],
    }));
  });

  this.mappingArrSorted = ko.computed(() => {
    return [...this.mappingArr()].sort((a, b) => b.quantity * runePoints[b.name] - a.quantity * runePoints[a.name]);
  });

  this.scoreByMonth = ko.computed(() => {
    const map = {};

    this.score().forEach(({ value, index }) => {
      const monthKey = moment(startDay)
        .add(index - 1, 'day')
        .format('YYYY-MM');

      if (!map[monthKey]) {
        map[monthKey] = 0;
      }

      map[monthKey] += value;
    });

    return Object.entries(map).map(([month, total]) => ({
      month,
      total,
    }));
  });

  this.table = ko.observable(1);
  this.sort = ko.observable(1);
  this.month = ko.observable(0);
};

ko.applyBindings(new ViewModel(days, score));

scrollToBottom();
function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
}
