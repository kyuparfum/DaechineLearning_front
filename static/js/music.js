async function music_search() {
    console.log('m_search click')
    const query = document.querySelector("#query").value
    let limit = document.querySelector("#limit").value
    console.log(query)
    console.log(limit)
    if (!limit || limit === '') {
        limit = 10
    }

    const formdata = new FormData()

    formdata.append('query', query)
    formdata.append('limit', limit)


    const response = await fetch(`http://127.0.0.1:8000/articles/music/api/search`, {
        method: "POST",
        body: formdata
    })
    const data = await response.json()
    console.log(data)

    let resultEl = document.querySelector('#result')
    let h2_add = document.querySelector('#add_h2')
    tracks = data['tracks']
    let trackHtml = ``
    for (let i = 0; i < tracks.length; i++) {
        track = tracks[i]
        let images = track['album']['images']
        let imageUrl = ''
        if (images && images.length > 0) {
            imageUrl = images[0]['url']
        }

        trackHtml +=
            `<div class="track-container">
                <div class="col">
                    <div class="card h-100">
                    <img src = "${imageUrl}" height = "300" width = "300" class="card-img-top">
                        <div class="card-body">
                            <h2 class="card-title">${i + 1}. ${track['name']}</h2>
                            <p class="card-text">Artist: ${track['artist']} / Album: ${track['album']['name']}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <small class="text-body-secondary fs-4">발매일 : ${track['album']['release_date']}</small>
                            <button onclick="save_db(tracks[${i}])" type="button" class="btn btn-primary">저장</button>
                        </div>
                    </div>
                </div>
            </div>`
    }
    console.log("-------")
    console.log(tracks)
    console.log(track)
    console.log("-------")
    h2_add.innerHTML = `<h2>Tracks (${tracks.length})</h2>`
    resultEl.innerHTML = trackHtml
}

async function save_db(track) {
    console.log(track.album.id)
    const formdata = new FormData()
    formdata.append('name', track.name)
    formdata.append('artist', track.artist)
    formdata.append('album', track.album.name)
    formdata.append('music_id', track.album.id)

    const response = await fetch(`http://127.0.0.1:8000/articles/save_music/`, {
        method: "POST",
        body: formdata
    })

    const data = await response.json()
    console.log(data)
    alert(data["message"])
}