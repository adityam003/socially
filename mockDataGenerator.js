const fs = require('fs');

const generateMockData = (numPosts = 100) => {
  const postTypes = ['carousel', 'reel', 'static', 'story'];
  const hashtags = ['#marketing', '#business', '#viral', '#trending', '#photography', '#lifestyle'];

  const baseMetrics = {
    carousel: { likes: [100, 500], comments: [10, 50], shares: [5, 30], saves: [20, 100] },
    reel: { likes: [200, 1000], comments: [20, 100], shares: [50, 200], saves: [30, 150] },
    static: { likes: [50, 300], comments: [5, 30], shares: [2, 20], saves: [10, 50] },
    story: { likes: [20, 100], comments: [0, 10], shares: [1, 10], saves: [5, 20] }
  };

  const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  const randomDate = () => {
    const start = new Date('2024-01-01').getTime();
    const end = new Date('2024-01-10').getTime();
    return new Date(start + Math.random() * (end - start)).toISOString();
  };

  return Array.from({ length: numPosts }, (_, i) => {
    const postType = postTypes[Math.floor(Math.random() * postTypes.length)];
    const metrics = baseMetrics[postType];

    return {
      post_type: postType,
      timestamp: randomDate(),
      likes: randomNumber(...metrics.likes),
      comments: randomNumber(...metrics.comments),
      shares: randomNumber(...metrics.shares),
      saves: randomNumber(...metrics.saves),
      hashtags: Array.from(
        { length: randomNumber(1, 4) },
        () => hashtags[Math.floor(Math.random() * hashtags.length)]
      ).join(';'),
      reach: randomNumber(800, 8000)
    };
  });
};

const data = generateMockData(10);
const headers = Object.keys(data[0]).join(',');
const rows = data.map(obj => Object.values(obj).join(','));
const csv = [headers, ...rows].join('\n');

fs.writeFileSync('mock_data.csv', csv);
