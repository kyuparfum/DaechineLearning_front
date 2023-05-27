token = localStorage.getItem("access")

function elapsedText(date) {
    // 초 (밀리초)
    const seconds = 1;
    // 분
    const minute = seconds * 60;
    // 시
    const hour = minute * 60;
    // 일
    const day = hour * 24;

    var today = new Date();
    var elapsedTime = Math.trunc((today.getTime() - date.getTime()) / 1000);

    var elapsedText = "";
    if (elapsedTime < seconds + 10) {
        elapsedText = "방금 전";
    } else if (elapsedTime < minute) {
        elapsedText = elapsedTime + "초 전";
    } else if (elapsedTime < hour) {
        elapsedText = Math.trunc(elapsedTime / minute) + "분 전";
    } else if (elapsedTime < day) {
        elapsedText = Math.trunc(elapsedTime / hour) + "시간 전";
    } else if (elapsedTime < day * 15) {
        elapsedText = Math.trunc(elapsedTime / day) + "일 전";
    } else {
        elapsedText = SimpleDateTimeFormat(date, "yyyy.M.d");
    }

    return elapsedText;
}


const getArticles = async () => {
    const response = await fetch(`${back_base_url}/articles/`)
    const articleResult = document.querySelector("#articles")
    if (response.status == 200) {
        response_json = await response.json();

        articles = response_json
        let article_list = ``
        for (let i = 0; i < articles.length; i++) {
            article = articles[i]
            let user = article['user']
            let images = article['images']
            let title = article['title']
            let content = article['content']
            let genre = ''
            article['genre'].forEach(element => {
                genre += `${element.name}, `
                console.log(genre)
            });
            genre = genre.substring(0, genre.length - 2)
            let id = article['id']
            let music_id = article['music_id']
            let music_search = article['music_search']
            let created_at = article['created_at']
            let updated_at = article['updated_at']

            let date = new Date(created_at)
            let time = elapsedText(date)

            article_list += `
                <div class="col">
                    <div class="card h-100">
                        <img src="${images}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">제목 : ${title}</h5>
                            <p class="card-text">작성자 : ${user}</p>
                            <p class="card-text">곡명 : ${music_id}</p>
                            <p class="card-text">내용 : ${content}</p>
                            <p class="card-text" style="overflow-y:scroll; height:80px">장르 : ${genre}.</p>
                            <p class="card-text">${time}</p>
                            <button onclick="getDetailArticles(${id})" type="button" class="btn btn-primary">상세보기</button>
                        </div>
                    </div>
                </div>`
        }
        articleResult.innerHTML = article_list
        return response_json;
    } else {
        alert(`${response.status} error`);
    }
}
const getDetailArticles = async (article_id) => {
    try {
        const response = await fetch(`${back_base_url}/articles/${article_id}`);
        if (!response.ok) {
            throw new Error('상세 정보를 불러오는데 실패했습니다.');
        }
        const articleDetail = await response.json();
        // 새로운 페이지 출력
        window.open(
            `../templates/articles_detail.html?images=${articleDetail.images}&id=${articleDetail.id}&title=${articleDetail.title}&name=${articleDetail.user}&content=${articleDetail.content}&music_id=${articleDetail.music_id}&genre=${articleDetail.genre}`,
            'articleDetailPage',
            'width=600,height=800'
        )
    } catch (error) {
        console.error(error.message);
        alert('게시글 상세 정보를 불러오는데 실패했습니다.');
    }
}

window.onload = () => {
    getArticles()
}
