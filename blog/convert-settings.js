const path = require(`path`)

module.exports = {
  outWidth: '12',
  outHeight: '120',
  keepPixelAspectRatio: true,
  keepAspectRatio: false,
  bitrate: 100,  // ПОКА НЕ РАБОТАЕТ
  frameRate: 2,
  aspectRatio: 1.77,
  outputFormat: 'webm', // в принципе менять не надо
  inputFormat: 'mp4', // это тоже наверно не стоит менять
  codec: 'mpeg4', // ПОКА НЕ РАБОТАЕТ
  outFolder: './video-thumbs/output',
  inputFolder: './videos'
}
