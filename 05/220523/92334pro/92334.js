/* 신고 결과 받기 */

// 유저: 신고받은 횟수 관리, 신고한 유저 관리
// 2회 이상 신고받은 유저를 신고한 유저는 답장 + 1

const solution = (id_list, report, k) => {
  const reportUserMap = {}; // { 신고자: 신고대상 Set }
  const reportCountMap = {}; // { 신고대상: 신고받은횟수 }

  const filteredReport = [...new Set(report)];
  id_list.forEach((id) => {
    reportUserMap[id] = [];
    reportCountMap[id] = 0;
  });

  filteredReport.forEach((string) => {
    const [id1, id2] = string.split(' ');
    reportUserMap[id1].push(id2);
    reportCountMap[id2]++;
  });

  const resultMailCountMap = {};

  Object.entries(reportUserMap).forEach(([reporterId, reportIds]) => {
    let count = 0;
    reportIds.forEach((reportId) => {
      // reportId가 신고받은 횟수가 k개 이상이면
      // reporterId는 메일을 받음
      if (reportCountMap[reportId] >= k) {
        ++count;
      }
    });

    resultMailCountMap[reporterId] = count;
  });

  return id_list.map((id) => resultMailCountMap[id]);
};

const id_list = ['muzi', 'frodo', 'apeach', 'neo'];
const report = [
  'muzi frodo',
  'apeach frodo',
  'frodo neo',
  'muzi neo',
  'apeach muzi',
];
const k = 2;
console.log(solution(id_list, report, k));
