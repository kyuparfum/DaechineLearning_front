let header = `
<header style="left: 0;
top: 0;
width: 100%;
height: 100px;
z-index: 4;
align-items: center;
justify-content: center;
text-align: center;">
    <div style="width: 100%;
    height: 100px;">
        <div style="display: inline-block;
        float: left; margin: 30px;">
            <h2>환영~대신러닝~</h2>
        </div>
        <div type="button" id="postbtn" onclick="location.href='/static/posting.html';"></div>
        <div style="display: inline-block;
        height: 100px;
        justify-items: center;
        float: right;
        margin-top: 10px;
        margin-right: 30px;">
            <div id="header-right" style="margin-right: 100px; margin-top: 20px;">
                <span id="intro" style="cursor:auto;"></span>
                <div>
                    <a id="login" style="margin: 100px; cursor:pointer;" onclick="location.href='/templates/login.html';">로그인</a>
                </div>
            </div>
        </div>
    </div>
    
</header>
        <main style="margin-top: 50px; margin-bottom: 50px;">
    <nav style="margin-bottom: 10px; margin-right: 50px; text-align: right;">
        <a href="/index.html" class="btn btn-primary">홈</a>
        <a href="/templates/emoticon_list.html" class="btn btn-primary">이모티콘 리스트 보기</a>
        <a href="/templates/emoticon_create.html" class="btn btn-primary">이모티콘 만들기</a>
        <a href="/templates/article_create.html" class="btn btn-primary">게시글 작성</a>
    </nav></main>
`
let footer = `
<footer style="border: 4px solid var(--border-color);
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100px;
    background-color: var(--headerfooter-color);
    align-items: center;
    justify-content: space-around;
    text-align: center;">
        <div style="height: 100px; margin-top:20px;">
            <div style="float: left; margin: 10px; background-color: white;">© 대신러닝</div>
            <div style="float: right;">
                <div style="background-image: url('https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU');
            background-size: cover;
            border-radius: 30%;
            height: 50px;
            width: 50px;
            cursor: pointer; margin: 10px;"
                    onclick="location.href='https://github.com/hyeon5819/DaechineLearning_front';">
                </div>
            </div>
        </div>
    </footer>`
document.body.insertAdjacentHTML('afterbegin', header);
document.body.insertAdjacentHTML('afterend', footer);
