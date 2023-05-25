window.onload = () => {
    console.log("회원가입, 로그인 api")
}

// csrfToken 가져오기
function getCookie(name) {
    if (!document.cookie) {
        return null;
    }

    const xsrfCookies = document.cookie.split(';')
        .map(c => c.trim())
        .filter(c => c.startsWith(name + '='));

    if (xsrfCookies.length === 0) {
        return null;
    }
    return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}
const csrfToken = getCookie('csrftoken');
if (csrfToken != '') {
    console.log('csrf값은:' + csrfToken);
}

// 회원가입
async function handleSignin() {
    const email = document.getElementById("email").value
    const username = document.getElementById("username").value
    const password1 = document.getElementById("password1").value
    const password2 = document.getElementById("password2").value
    console.log(email, username, password1, password2)

    let formData = new FormData();
    formData.append(email, email)
    formData.append(username, username)
    formData.append(password1, password1)
    formData.append(password2, password2)
    console.log(formData)

    const response = await fetch(`${back_base_url}/users/signup/`, {
        headers: {

            'content-type': 'multipart/form-data',
            'X-CSRF-TOKEN': csrfToken,

        },
        // xhr.setRequestHeader('X-CSRF-Token', csrf_cookieValue);
        method: 'POST',
        // body: JSON.stringify({
        //     "email": email,
        //     "username": username,
        //     "password1": password1,
        //     "password2": password2
        // })
        body: formData
    })

    if (response.status == 201) {
        alert("이메일을 확인해주세요.")
    } else {
        alert("이미가입된 유저입니다.")
    }

    console.log(response)

}

// 이메일 인증 재전송
async function handleEmailValify() {
    const email = document.getElementById("email").value
    console.log(email)

    const response = await fetch(`${back_base_url}/users/dj-rest-auth/login/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })
}

// 로그인
async function handleLogin() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    console.log(username, password)

    const response = await fetch(`${back_base_url}/users/login/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
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
        window.location.replace(`${front_base_url}/index.html`)
    } else {
        alert("이메일 인증먼저 ")
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
    const response = await fetch(`${back_base_url}/users/mock/`, {
        headers: {
            "Authorization": 'Bearer ' + localStorage.getItem("access")
        },
        method: 'GET',
    })

    console.log(response)
}

// 로그아웃
async function handleLogout() {
    const response = await fetch(`${back_base_url}/users/logout/`, {
        headers: {
            "Authorization": 'Bearer ' + localStorage.getItem("access")
        },
        method: 'GET',
    })
    alert("로그아웃!")
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    location.reload();
    console.log(response)
}
