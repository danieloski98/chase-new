export const compressFile = async file => {
  return new Promise((resolve, reject) => {
    const maxSize = 20 // Desired maximum file size in KB
    const reader = new FileReader()

    reader.onload = event => {
      const image = new Image()

      image.onload = () => {
        let width = image.width
        let height = image.height
        let fileType = file.type
        let quality = 1

        // Compress file to meet required file size
        while (file.size > maxSize * 1024) {
          const canvas = document.createElement("canvas")
          const context = canvas.getContext("2d")

          canvas.width = width
          canvas.height = height

          context.clearRect(0, 0, width, height)
          context.drawImage(image, 0, 0, width, height)

          const compressedDataUrl = canvas.toDataURL(fileType, quality)
          const compressedFileSize = Math.round(
            (compressedDataUrl.length * 3) / 4
          )

          if (compressedFileSize <= maxSize * 1024) {
            resolve(compressedDataUrl)
            return
          }

          quality *= 0.9
        }

        // Already at required file size
        resolve(reader.result)
      }

      image.src = event.target.result
    }

    reader.onerror = error => {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}
