const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// const img = document.querySelector('#album-cover');
// console.log(img)

// 쿼리 문자열에서 데이터를 가져옴
const article_id = urlParams.get('id')
// console.log(article_id)
// const article_title = urlParams.get('title')
// const article_user = urlParams.get('user')
// const music_id = urlParams.get('music_id')
// const article_content = urlParams.get('content')
// const genre = urlParams.get('genre')

// // 가져온 데이터를 화면에 출력
// const temptemp = document.getElementById(article_id)
// temptemp.innerText = article_id
// document.querySelector('#article_title').textContent = article_title
// document.querySelector('#article_user').textContent = article_user
// document.querySelector('#music_id').textContent = music_id
// document.querySelector('#article_content').textContent = article_content
// document.querySelector('#genre').textContent = genre
// img.src = images;
// img.alt = '앨범 자켓';

console.log('zzzzzzzzz')

// const articleBox = document.getElementById('article_box')

// const articleTitle = document.createElement('p')

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
}

getArticlesDetail()
