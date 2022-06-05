const solution = (cacheSize, cities) => {
  if (cacheSize === 0) {
    return cities.length * 5;
  }

  let answer = 0;
  const cities_uppercase = cities.map((city) => city.toUpperCase());
  const cache = [];

  cities_uppercase.forEach((city) => {
    const index = cache.indexOf(city);
    const curCacheSize = cache.length;

    // city가 캐시에 없는 경우
    if (index === -1) {
      if (curCacheSize === cacheSize) {
        cache.shift();
      }
      cache.push(city);
      answer += 5;
      return;
    }

    // city가 캐시에 있는 경우
    cache.splice(index, 1);
    cache.push(city);
    answer += 1;
  });

  return answer;
};

const cacheSize = 2;
const cities = ['Jeju', 'Pangyo', 'NewYork', 'newyork'];
console.log(solution(cacheSize, cities));
