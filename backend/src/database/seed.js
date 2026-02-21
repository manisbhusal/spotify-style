const pool = require('../database/connection');

const sampleSongs = [
  {
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    cover_url: 'https://lh3.googleusercontent.com/1yqzGnR-w_VC_dLKBzzfKVLM8iKDVa0GCpYqBdXekNDQqN1C0v2aEqnLxo0y7h0hhVwQQQNqkG1t=w226-h226-l90-rj',
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    title: 'Heat Waves',
    artist: 'Glass Animals',
    album: 'Dreamland',
    duration: 239,
    cover_url: 'https://lh3.googleusercontent.com/xUU6vWzBJUL6XkZb2F1BRqjzHvwZmOEm3Z7NhABfZNADGTZn-E3XvqSqYPGl-7K6vA=w226-h226-l90-rj',
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    title: 'As It Was',
    artist: 'Harry Styles',
    album: 'Harry\'s House',
    duration: 173,
    cover_url: 'https://lh3.googleusercontent.com/0-sJ_QZFXY8jsqJqKpf86QcVbfKKxmOJz8c1aVXNY2z27QlQUZ2KV3bfQPb_7q2rBBKQY4=w226-h226-l90-rj',
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    title: 'Anti-Hero',
    artist: 'Taylor Swift',
    album: 'Midnights',
    duration: 229,
    cover_url: 'https://lh3.googleusercontent.com/9z7zKdlhk5E7nK-Wf-ZL2I8vqhBzL5K7=w226-h226-l90-rj',
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  },
  {
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: 203,
    cover_url: 'https://lh3.googleusercontent.com/xG4wbXqJ7X6xK7qL3zM8z=w226-h226-l90-rj',
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
  },
  {
    title: 'Flowers',
    artist: 'Miley Cyrus',
    album: 'Endless Summer Vacation',
    duration: 218,
    cover_url: 'https://lh3.googleusercontent.com/qK7fH_bR2zZ9yX_J5qL=w226-h226-l90-rj',
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'
  },
  {
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷',
    duration: 234,
    cover_url: 'https://lh3.googleusercontent.com/8zK_9pR_J6K7yM_L2tN=w226-h226-l90-rj',
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3'
  },
  {
    title: 'Perfect Duet',
    artist: 'Ed Sheeran, Beyoncé',
    album: '÷',
    duration: 263,
    cover_url: 'https://lh3.googleusercontent.com/5mL_8qT_K7J6zN_O3uP=w226-h226-l90-rj',
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
  },
  {
    title: 'Bad Habit',
    artist: 'Steve Lacy',
    album: 'Gemini Rights',
    duration: 248,
    cover_url: 'https://lh3.googleusercontent.com/3rN_7pS_L8K9yO_P4vQ=w226-h226-l90-rj',
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3'
  },
  {
    title: 'Sunroof',
    artist: 'Nicky Youre',
    album: 'Sunroof',
    duration: 176,
    cover_url: 'https://lh3.googleusercontent.com/6sO_9qU_M9L0yP_Q5wR=w226-h226-l90-rj',
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3'
  },
  {
    title: 'Starboy',
    artist: 'The Weeknd',
    album: 'Starboy',
    duration: 230,
    cover_url: 'https://lh3.googleusercontent.com/7tP1ArV0O0M1zQ_R6xS=w226-h226-l90-rj',
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3'
  },
  {
    title: 'Take Me Back to Eden',
    artist: 'Sleep Token',
    album: 'Take Me Back to Eden',
    duration: 427,
    cover_url: 'https://lh3.googleusercontent.com/8uQ2BsW1P1N2yR_S7yT=w226-h226-l90-rj',
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3'
  }
];

const seedDatabase = async () => {
  try {
    console.log('Seeding database with sample songs...');

    for (const song of sampleSongs) {
      // Check if song already exists
      const exists = await pool.query(
        'SELECT * FROM songs WHERE title = $1 AND artist = $2',
        [song.title, song.artist]
      );

      if (exists.rows.length === 0) {
        await pool.query(
          'INSERT INTO songs (title, artist, album, duration, cover_url, file_url) VALUES ($1, $2, $3, $4, $5, $6)',
          [song.title, song.artist, song.album, song.duration, song.cover_url, song.file_url]
        );
        console.log(`✓ Added: ${song.title} - ${song.artist}`);
      } else {
        console.log(`✓ Already exists: ${song.title} - ${song.artist}`);
      }
    }

    console.log('✓ Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
