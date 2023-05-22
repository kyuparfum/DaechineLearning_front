window.onload = () => {
    console.log("스크립트 로딩 확인!")
}

// 회원가입
async function handleSignin() {    // handle=눌렀을때 실행(처리)한다는 의미
    const email = document.getElementById("email").value      // 변하지 않는 변수는 const/ var,let은 변하는 변수
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    console.log(email, username, password)


    const response = await fetch("http://127.0.0.1:8000/users/signup/", {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "username": username,
            "password": password
        })
    })

    if (response.status == 201) {
        alert("회원가입이 완료되었습니다. 로그인페이지로 이동합니다")
        window.location.replace('http://127.0.0.1:5500/users/login.html')
    } else {
        alert("이미가입된 유저입니다.")
    }

    console.log(response)
}

// 로그인
async function handleLogin() {
    // const email = document.getElementById("email").value 
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    console.log(username, password)


    const response = await fetch("http://127.0.0.1:8000/users/api/token/", {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            // "email": email,
            "username": username,
            "password": password
        })
    })

    const response_json = await response.json()

    console.log(response_json)

    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);

    if (response.status == 200) {
        alert("로그인되었습니다.")
        window.location.replace('http://127.0.0.1:5500/index.html')
    } else {
        alert("잘못된 정보입니다. 다시입력해주세요")
    }


    // 코드스니펫에는 accessToken.split -> response_json.access(이걸로 변경해야함  Token없다고 에러)
    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    localStorage.setItem("payload", jsonPayload);


}

async function handleMock() {    // handle=눌렀을때 실행(처리)한다는 의미
    const response = await fetch("http://127.0.0.1:8000/users/mock/", {
        headers: {
            "Authorization": 'Bearer ' + localStorage.getItem("access")
        },
        method: 'GET',
    })

    console.log(response)
}

// 로그아웃
async function handleLogout() {
    alert("로그아웃!")
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    location.reload();
    // window.location.replace('http://127.0.0.1:5500/index.html')
}