/* 신규 아이디 추천 */

const isValidate = (id) => {
  if (id.length < 3 && id.length > 15) {
    return false;
  }

  if (id.match(/[^a-z0-9_.-]/g)) {
    return false;
  }

  if (!id.match(/^[^.]{1}[a-z0-9_.-]{0,13}[^.]{1}$/)) {
    return false;
  }

  if (id.match(/[.]{2,}/)) {
    return false;
  }

  return true;
};

const createNewId = (id) => {
  let newId = id.toLowerCase();
  newId = newId.replace(/[^a-z0-9-_.]/g, '');
  newId = newId.replace(/[.]{2,}/g, '.');
  newId = newId.replace(/^\.|\.$/g, '');
  newId = newId.length ? newId : 'a';
  newId =
    newId.length > 15
      ? newId[14] === '.'
        ? newId.slice(0, 14)
        : newId.slice(0, 15)
      : newId;
  while (newId.length < 3) {
    newId += newId[newId.length - 1];
  }
  return newId;
};

function solution(new_id) {
  if (isValidate(new_id)) {
    return new_id;
  } else {
    return createNewId(new_id);
  }
}

console.log(solution('=.='));
