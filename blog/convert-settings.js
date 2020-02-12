const path = require(`path`)

module.exports = {
  // библиотека которая непосредственно кодирует
  // Так же можно попробовать вариант "fluent-ffmpeg"
  library: 'fluent-ffmpeg',
  outWidth: '350',
  outHeight: '200',
  keepPixelAspectRatio: false,
  keepAspectRatio: false,
  bitrate: '2k', // больше - качественнее, но больше размер (не работает в ffmpeg, только в fluent-ffmpeg)
  frameRate: 1,
  aspectRatio: 5,
  outputFormat: 'webm', // в принципе менять не надо
  inputFormat: 'mp4', // это тоже наверно не стоит менять
  codec: 'mpeg4', // ПОКА НЕ РАБОТАЕТ
  outFolder: './video-thumbs/output',
  inputFolder: './videos',
}
