function handlelogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    window.location.replace('https://daechinelearning.netlify.app/templates/login.html')
}

async function injectHeader() {
    const payload = localStorage.getItem("payload");
    // payload가 존재 = 로그인되어있다면
    if (payload) {
        const payload_parse = JSON.parse(payload)

        const postbtn = document.getElementById("postbtn")
        postbtn.innerHTML = `<div type="button" class="postbtn" onclick="location.href='/static/posting.html';"></div>`

        const intro = document.getElementById("intro")
        intro.innerHTML = `${payload_parse.username}님`
        intro.style.marginBottom = "5px";

        let headerRight = document.getElementById("header-right")

        let mypage = document.createElement("a")
        mypage.innerText = "마이페이지"
        mypage.style.marginBottom = "0px";
        mypage.setAttribute("href", "/templates/profile.html")

        let logout = document.createElement("p")
        logout.innerText = "로그아웃"
        logout.style.color = "red";
        logout.setAttribute("onclick", "handlelogout()")

        headerRight.appendChild(mypage)
        headerRight.appendChild(logout)

        let login = document.getElementById("login")
        login.style.display = "none";
    }
}

injectHeader();



