<header class="d-flex justify-content-between align-items-center" style="height: 4rem;">
        <h1>메인홈페이지</h1>
        <nav>
            <a href="/templates/emoticon_list.html" class="btn btn-primary">이모티콘 리스트 보기</a>
            <a href="/templates/emoticon_create.html" class="btn btn-primary">이모티콘 만들기</a>
            <a href="/templates/music_search.html" class="btn btn-primary">음악검색</a>
        </nav>
        <div class="sign">
            <button class="btn btn-secondary" type="button"
                onclick="location.href=`${front_base_url}/templates/login.html`">로그인페이지로 이동</button>
            <button class="btn btn-secondary" type="button"
                onclick="location.href=`${front_base_url}/templates/signup.html`">회원가입페이지로 이동</button>
            <button class="btn btn-secondary" type="button" onclick="handleLogout()">로그아웃</button><br><br>
        </div><!-- e:sign -->
    </header>