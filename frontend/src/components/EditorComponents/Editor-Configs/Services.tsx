export async function uploadFile(file) {
  const body = new FormData()
  body.append("file", file)
  const response = await fetch("https://tmpfiles.org/api/v1/upload", {
    method: "POST",
    body: body,
  })
  const data = await response.json()
  return data.data.url.replace("tmpfiles.org/", "tmpfiles.org/dl/")
}

export function handleLocation(setLocation) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => {
        console.error("Error acquiring location:", error)
        alert(
          "Error acquiring location. Please ensure location services are enabled."
        )
      }
    )
  } else {
    alert("Geolocation is not supported by this browser.")
  }
}
// can't figure out how to change image height in the editor might add it to posts db and make it look like its in editor instead
export const insertImageBlock = (editor) => {
  const imageBlock = {
    type: "image",
    content: "",
  }
  editor.insertBlocks(
    [imageBlock],
    editor.document[editor.document.length - 1],
    "after"
  )
}
