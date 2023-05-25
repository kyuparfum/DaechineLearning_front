async function music_search() {
    const query = document.querySelector("#query").value
    let limit = document.querySelector("#limit").value
    if (query === '') {
        alert("검색어를 입력해주세요.")
        return
    }

    if (!limit || limit === '') {
        limit = 10
    } else if (isNaN(parseInt(limit))) {
        alert("검색 개수는 숫자를 입력해주세요.")
        return
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
                            <small class="text-body-secondary fs-5">발매일 : ${track['album']['release_date']}</small>
                            <button onclick="save_db(tracks[${i}])" type="button" class="btn btn-primary">저장</button>
                            
                            <!-- <button onclick="preview_music(tracks[${i}])" type="button" class="btn btn-primary">미리듣기</button> -->
                        </div>
                    </div>
                </div>
            </div>`
    }

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

    const response = await fetch(`http://127.0.0.1:8000/articles/save_music`, {
        method: "POST",
        body: formdata
    })

    const data = await response.json()
    console.log(data)
    alert(data["message"])
}