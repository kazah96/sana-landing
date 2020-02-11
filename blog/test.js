const fs = require("fs")
const gifFrames = require("gif-frames")
const http = require("http")

const gifFolder = "video-thumbs/gif"
const imgFolder = "video-thumbs/pic"

if (!fs.existsSync(gifFolder)) fs.mkdirSync(gifFolder, { recursive: true })
if (!fs.existsSync(imgFolder)) fs.mkdirSync(imgFolder, { recursive: true })

// const file = fs.createWriteStream("ff/asd/file.jpg")

const serverUrl = "http://localhost:1337"

function processGif()

async function make() {

  const resp = await http.get(`${serverUrl}/articles`, { json: true }, res => {
    res.on("data", data => {
      const parsedData = JSON.parse(data)

      parsedData.forEach(item => {
        let file

        if ((file = item.ffwe[0])) {
          const fileUrl = `${serverUrl}/${file.url}`

          const savedFile = fs.createWriteStream(file.name)
          const request = http.get(fileUrl, function(response) {
            response.pipe(savedFile)

            gifFrames({ url: path.resolve(gifFolder, file), frames: 0 }).then(
              function(frameData) {
                frameData[0]
                  .getImage()
                  .pipe(
                    fs.createWriteStream(
                      path.resolve(imgFolder, `${filename}.jpg`)
                    )
                  )
              }
            )



          })
        }
      })
    })
  })
}

make()
