// 30 Korean-style student names (15 men, 15 women)
export const students = [
  // Men
  { name: 'Kim Min-jun', gender: 'M' },
  { name: 'Lee Ji-hoon', gender: 'M' },
  { name: 'Park Jae-hyun', gender: 'M' },
  { name: 'Choi Dong-hyun', gender: 'M' },
  { name: 'Jung Woo-jin', gender: 'M' },
  { name: 'Kang Hyun-woo', gender: 'M' },
  { name: 'Yoon Seok-jin', gender: 'M' },
  { name: 'Lim Tae-hyun', gender: 'M' },
  { name: 'Han Joon-seo', gender: 'M' },
  { name: 'Seo Min-seok', gender: 'M' },
  { name: 'Shin Dong-min', gender: 'M' },
  { name: 'Hwang Jun-ho', gender: 'M' },
  { name: 'Oh Seung-hyun', gender: 'M' },
  { name: 'Song Ji-ho', gender: 'M' },
  { name: 'Baek Sung-min', gender: 'M' },
  // Women
  { name: 'Kim Seo-yeon', gender: 'F' },
  { name: 'Lee Ji-eun', gender: 'F' },
  { name: 'Park Soo-min', gender: 'F' },
  { name: 'Choi Eun-ji', gender: 'F' },
  { name: 'Jung Hye-jin', gender: 'F' },
  { name: 'Kang Min-ji', gender: 'F' },
  { name: 'Yoon Ha-eun', gender: 'F' },
  { name: 'Lim Da-hye', gender: 'F' },
  { name: 'Han Ji-won', gender: 'F' },
  { name: 'Seo Yeon-woo', gender: 'F' },
  { name: 'Shin Hye-soo', gender: 'F' },
  { name: 'Hwang Soo-yeon', gender: 'F' },
  { name: 'Oh Min-seo', gender: 'F' },
  { name: 'Song Hye-jin', gender: 'F' },
  { name: 'Baek Ji-woo', gender: 'F' }
];

// Subjects and lecturers
export const subjects = [
  { name: 'JavaScript', lecturer: 'Mr. Kim Jong Un' },
  { name: 'Cybersecurity', lecturer: 'Yim Si-wan' },
  { name: 'AI Ethics & Security', lecturer: 'Lee Jung-jae' }
];

// Generate dummy scores for each student, subject, semester, and year
export const scores = [];
const years = ['2024-2025'];
const semesters = ['Semester 1', 'Semester 2'];

students.forEach((student, idx) => {
  subjects.forEach((subject, sidx) => {
    years.forEach(year => {
      semesters.forEach(semester => {
        scores.push({
          student: student.name,
          gender: student.gender,
          subject: subject.name,
          lecturer: subject.lecturer,
          year,
          semester,
          score: Math.floor(Math.random() * 60) + 40 // 40-100
        });
      });
    });
  });
});
