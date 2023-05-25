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

    let tracks = data['tracks'];
    tracks = await Promise.all(tracks.map(async track => {
        const previewUrl = await preview_music(track);
        return {
            ...track,
            preview_url: previewUrl
        };
    }));

    let resultEl = document.querySelector('#result')
    let h2_add = document.querySelector('#add_h2')
    let trackHtml = ``
    for (let i = 0; i < tracks.length; i++) {
        let track = tracks[i]

        let images = track.album.images
        let imageUrl = ''
        if (images && images.length > 0) {
            imageUrl = images[0].url
        }

        trackHtml += `
        <div class="track-container">
          <div class="col">
            <div class="card h-100">
              <img src="${imageUrl}" height="300" width="300" class="card-img-top">
              <div class="card-body">
                <h2 class="card-title">${i + 1}. ${track.name}</h2>
                <p class="card-text">Artist: ${track.artist} / Album: ${track.album.name}</p>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <small class="text-body-secondary fs-5">발매일 : ${track.album.release_date}</small>
                <button onclick="save_db(${JSON.stringify(track)})" type="button" class="btn btn-primary">저장</button>
              </div>
              <div class="audio">
                <audio style="width:100%;" controls="" name="media" class="mt-4 mb-4 ps-3 pe-3">
                  <source src="${track.preview_url}" type="audio/mpeg">
                </audio>
              </div>
            </div>
          </div>
        </div>`
    }

    h2_add.innerHTML = `<h2>Tracks (${tracks.length})</h2>`
    resultEl.innerHTML = trackHtml
}

async function preview_music(track) {
    let response = await fetch('http://127.0.0.1:8000/articles/music/api/music-id-search', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            music_id: track.id
        })
    });
    let data = await response.json();
    return data.preview_url;
}

async function save_db(track) {
    let formdata = new FormData()
    formdata.append('name', track.name)
    formdata.append('artist', track.artist)
    formdata.append('album', track.album.name)
    formdata.append('music_id', track.album.id)

    let response = await fetch(`http://127.0.0.1:8000/articles/save_music`, {
        method: "POST",
        body: formdata
    })

    let data = await response.json()
    console.log(data)
    alert(data["message"])
}