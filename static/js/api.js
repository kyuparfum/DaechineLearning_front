let token = localStorage.getItem("access")

// 현재 로그인 유저
let payload = localStorage.getItem("payload");
let payload_parse = JSON.parse(payload);
let current_user = payload_parse.username;

// 이메일 유효성 검사
function CheckEmail(str) {
    var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (!reg_email.test(str)) {
        return false;
    } else {
        return true;
    }
}

// 회원가입
async function handleSignin() {
    // try {
    const email = document.getElementById("email").value
    const email_ = document.getElementById("email")
    const username = document.getElementById("username").value
    const password1 = document.getElementById("password1").value
    const password2 = document.getElementById("password2").value

    if (password2 !== password1) {
        alert("비번 잘못된입력입니다. 확인해주세요.")
        window.location.reload()
    } else if (!email || !username || !password1 || !password2) {
        alert("공란 잘못된입력입니다. 확인해주세요.")
        window.location.reload()
    } else if (!CheckEmail(email)) { // 존재한다면 -1이 아닌 숫자가 반환됨
        alert("이메일 형식이 아닙니다.");
        email_.focus();
        return false;
    }

    const response = await fetch(`${back_base_url}/users/dj-rest-auth/registration/`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "username": username,
            "password1": password1,
            "password2": password2
        })

    })

    if (response.status == 201) {
        alert("이메일을 확인해주세요.")
        window.location.reload()
    } else {
        console.error()
        alert("이미가입된 유저입니다.")
        alert(response.status)
        window.location.reload()
    }
}

// 이메일 인증 재전송
async function handleEmailValify() {
    const email = document.getElementById("email").value

    const response = await fetch(`${back_base_url}/users/dj-rest-auth/registration/resend-email/`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
        })
    })
    if (response.status == 200) {
        alert("이메일을 확인해주세요.")
        window.location.replace(`${front_base_url}/templates/login.html`)
    } else {
        alert("가입되지 않은 이메일입니다. 다시확인해주세요.")
        alert(response.status)
    }

}

// 로그인
async function handleLogin() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const response = await fetch(`${back_base_url}/users/dj-rest-auth/login/`, {
        headers: {
            "Content-Type": "application/json",

        },
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })

    const response_json = await response.json()


    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);

    if (response.status == 200) {
        alert("로그인되었습니다.")
        window.location.replace(`${front_base_url}/index.html`)
    } else {
        alert("이메일 인증먼저해주세요!")
        alert(response.status)
        window.location.replace(`${front_base_url}/templates/login.html`)
    }


    // 코드스니펫에는 accessToken.split -> response_json.access(이걸로 변경해야함  Token없다고 에러)
    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    localStorage.setItem("payload", jsonPayload);


}

// 로그아웃
async function handleLogout() {
    const response = await fetch(`${back_base_url}/users/dj-rest-auth/logout/`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        method: 'POST',
    })
    alert("로그아웃!")
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    location.reload();
}

// 비번변경-로그인된 상태에서
async function pschange() {
    const password1 = document.getElementById("password1").value
    const password2 = document.getElementById("password2").value

    if (password2 !== password1) {
        alert("비번 잘못된입력입니다. 확인해주세요.")
        window.location.reload()
    } else if (!password1 || !password2) {
        alert("공란 잘못된입력입니다. 확인해주세요.")
        window.location.reload()
    }

    const response = await fetch(`${back_base_url}/users/dj-rest-auth/password/change/`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",

        },
        method: 'POST',
        body: JSON.stringify({
            "password1": password1,
            "password2": password2
        })
    })
    alert("비밀번호가 변경되었습니다.")
    window.location.replace(`${front_base_url}/index.html`)
}
