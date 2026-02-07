function calculateRunePoints(runes) {
  let totalPoints = 0;

  for (let i = 0; i < runes.length; i++) {
    let rune = runes[i];
    if (runePoints[rune] === undefined) {
      return `Lỗi: Rune ${rune} không hợp lệ!`;
    }
    totalPoints += runePoints[rune];
  }

  return totalPoints;
}

function combineRunes(runes) {
  let totalPoints = calculateRunePoints(runes);

  return totalPoints;
}

function countRunes(day) {
  const map = {};
  day.forEach((rune) => {
    map[rune] = (map[rune] || 0) + 1;
  });

  return Object.entries(map)
    .map(([name, quantity]) => ({ name, quantity }))
    .sort((a, b) => b.quantity - a.quantity);
}

function pad(num) {
  return String(num).padStart(2, '0');
}

function count(items) {
  const itemCounts = {};
  items.forEach((item) => {
    itemCounts[item] = (itemCounts[item] || 0) + 1;
  });
  const sortedItems = Object.entries(itemCounts).sort(([, countA], [, countB]) => countB - countA);

  return sortedItems;
}

function getColor(score, factor = 1) {
  let total = score * 1;
  if (total < 1_000) {
    return 'tier-1';
  } else if (total < 1_000_000) {
    return 'tier-2';
  } else if (total < 100_000_000) {
    return 'tier-3';
  } else if (total < 50_000_000_000) {
    return 'tier-4';
  } else if (total < 1_000_000_000_000) {
    return 'tier-5';
  }
  return 'tier-6';
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

console.log(shuffle([]));
