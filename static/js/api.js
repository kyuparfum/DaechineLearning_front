window.onload = () => {
    console.log("회원가입, 로그인 api")
}

let token = localStorage.getItem("access")
// const headers = {
//     'Access-Control-Allow-Headers': 'Authorization',
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
//     'Access-Control-Allow-Methods': '*',
//     "Content-Type": "application/json"
// }

// callback(null, {
//     statusCode: 200,
//     body: "Hello, world!",
//     headers: {
//         "access-control-allow-origin": "*",
//         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//         'Access-Control-Allow-Methods': '*',
//         'Access-Control-Allow-Credentials': 'True',
//     },
// });

// 회원가입
async function handleSignin() {
    // try {
    const email = document.getElementById("email").value
    const username = document.getElementById("username").value
    const password1 = document.getElementById("password1").value
    const password2 = document.getElementById("password2").value
    console.log(email, username, password1, password2)

    if (password2 !== password1) {
        alert("비번 잘못된입력입니다. 확인해주세요.")
        window.location.reload()
    } else if (!email || !username || !password1 || !password2) {
        alert("공란 잘못된입력입니다. 확인해주세요.")
        window.location.reload()
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
    console.log(response)

    if (response.status == 201) {
        alert("이메일을 확인해주세요.")
        window.location.reload()
    } else {
        console.error(error.msg)
        // alert(error)
        alert("이미가입된 유저입니다.")
    }
    // } catch (err) {
    //     errorText.innerHTML = '에러메시지 : ' + err;
    // }
    // } catch (error) {
    //     error.text().then(msg => alert(msg))
    //     // alert(error.msg)
    //     alert("이미가입된 유저입니다.")
    // }
}

// 이메일 인증 재전송
async function handleEmailValify() {
    const email = document.getElementById("email").value
    console.log(email)

    const response = await fetch(`${back_base_url}/users/dj-rest-auth/registration/resend-email/`, {
        headers: {
            headers,
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
        })
    })
    console.log(response)
    if (response.status == 200) {
        alert("이메일을 확인해주세요.")
        window.location.reload()
    } else {
        console.error(error.msg)
        // alert(error)
        alert("가입되지 않은 이메일입니다. 다시확인해주세요.")
    }

}

// 로그인
async function handleLogin() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    console.log(username, password)

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

    console.log(response_json)

    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);

    if (response.status == 200) {
        alert("로그인되었습니다.")
        window.location.replace(`${front_base_url}/index.html`)
    } else {
        alert("이메일 인증먼저")
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
            // ${ back_base_url }
            'Authorization': `Bearer ${token}`,
            // 'Access-Control-Allow-Credentials': 'true'
        },
        method: 'POST',
    })
    alert("로그아웃!")
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    location.reload();
    console.log(response)
}
