let header = `
<header class="d-flex justify-content-between align-items-center" style="height: 4rem;">
    <nav>
    <a href="/index.html" class="btn btn-primary">홈</a>
        <a href="/templates/emoticon_list.html" class="btn btn-primary">이모티콘 리스트 보기</a>
        <a href="/templates/emoticon_create.html" class="btn btn-primary">이모티콘 만들기</a>
        <a href="/templates/article_create.html" class="btn btn-primary">게시글 작성</a>
    </nav>
    <div class="sign d-flex justify-content-between align-items-center">
    <nav>
        <a href="/templates/login.html" class="btn btn-primary">로그인페이지로 이동</a>
        <a href="/templates/signup.html" class="btn btn-primary">회원가입페이지로 이동</a>
        <a style="cursor:pointer;" href="javascript:void(0);" onclick="handleLogout()" class="btn btn-primary">로그아웃</a>
    </nav><!-- e:sign -->
        </header>
`

document.body.insertAdjacentHTML('afterbegin', header);
