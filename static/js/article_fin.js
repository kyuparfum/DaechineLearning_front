const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const article_id = urlParams.get('id')

async function getArticlesDetail() {
    const response = await fetch(`http://127.0.0.1:8080//articles/${article_id}`)
    const article_detail_data = await response.json()
    console.log(article_detail_data)

    console.log(article_id)
    // 가져온 데이터를 화면에 출력
    document.querySelector('#article_id').textContent = article_detail_data.id
    document.querySelector('#article_title').textContent = article_detail_data.title
    document.querySelector('#article_user').textContent = article_detail_data.user
    document.querySelector('#music_id').textContent = article_detail_data.music_id
    document.querySelector('#article_content').textContent = article_detail_data.content


    let genre = ''
    article_detail_data.genre.forEach(element => {
        genre += `${element.name}, `
    });
    genre = genre.substring(0, genre.length - 2)

    document.querySelector('#genre').textContent = genre
    const images = urlParams.get('images')
    console.log(images)
    const imagesP = document.getElementById('images_p')
    const imageMusic = document.createElement('img')
    imageMusic.setAttribute('src', images)
    imagesP.appendChild(imageMusic)
    // img.alt = '앨범 자켓';

    return article_detail_data
}

getArticlesDetail()

async function articleDelete() {
    console.log(article_id)
    const access = localStorage.getItem("access");

    if (confirm("삭제하시겠습니까?")) {
        const response = await fetch(
            `${back_base_url}/articles/${article_id}/`,
            {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
                method: "DELETE",
            }
        );
        if (response.status == 204) {
            alert("삭제되었습니다.");
            window.opener.location.reload()
            window.close()
        } else {
            alert("권한이 없습니다!");
        }
    } else {
        // 취소 버튼을 눌렀을 경우
        return false;
    }
}
