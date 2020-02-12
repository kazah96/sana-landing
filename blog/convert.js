const path = require(`path`)

const fs = require("fs")
const ffmpeg = require("ffmpeg")

const config = require("./convert-settings")

config.getVideoSize = function() {
  return [
    `${this.outWidth}x${this.outHeight}`,
    config.keepPixelAspectRatio,
    config.keepAspectRatio,
  ]
}

if (!fs.existsSync(config.inputFolder)) fs.mkdirSync(config.inputFolder)
if (!fs.existsSync(config.outFolder)) fs.mkdirSync(config.outFolder)

fs.readdir(config.inputFolder, (err, files) => {
  if (!files || files.length === 0) {
    console.warn("No files in directory " + config.inputFolder + ' to convert');
    process.exit()
  }
  files.forEach(file => {
    if (path.extname(file) === `.${config.inputFormat}`) {
      const filename = file.slice(0, config.inputFormat.length)
      const outFileName = path.join(
        config.outFolder,
        `${filename}.${config.outputFormat}`
      )
      if (fs.existsSync(outFileName)) {
        fs.unlinkSync(outFileName)
      }

      new ffmpeg(path.join(config.inputFolder, file)).then(video => {
        video
          .setDisableAudio()
            // .setVideoBitRate(config.bitrate)
          .setVideoFormat(config.outputFormat)
          .setVideoAspectRatio(config.aspectRatio)
          .setVideoFrameRate(config.frameRate)
          //   .setVideoCodec(config.codec)
          .setVideoSize(...config.getVideoSize())
          .save(outFileName)
      })
    }
  })
})
