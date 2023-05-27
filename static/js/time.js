async function endtime() {
    let token = localStorage.getItem("access")
    const formdata = new FormData();
    formdata.append("article", 1)
    formdata.append("listen_rate", 1)
    const response = await fetch(`${back_base_url}/users/active/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formdata
    })
    const data = await response.json()
}

setTimeout('endtime()', 90000)//1분30초

