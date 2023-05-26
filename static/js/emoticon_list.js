window.onload = async function () {
    const access = localStorage.getItem("access");

    const response = await fetch(`${back_base_url}/comments/emoticon/`, {
        headers: {
            Authorization: `Bearer ${access}`,
        },
        method: "GET",
    });
    
    if (response.status == 200) {
        response_json = await response.json();

        const emoticons = document.getElementById('emoticons')
        
        for (let i = 1; i < response_json.length; i++) {
            const emoticon = document.createElement('li')
            emoticons.appendChild(emoticon)
            
            const emoticonDetail = document.createElement('a')
            emoticonDetail.innerText = response_json[i].title
            emoticonDetail.href = `${front_base_url}/templates/emoticon_detail.html?emoticon_id=${response_json[i].id}`
            emoticonDetail.value = response_json[i].id
            emoticon.appendChild(emoticonDetail)
        }

        // response_json.forEach(element => {
        //     const emoticon = document.createElement('li')
        //     emoticons.appendChild(emoticon)
            
        //     const emoticonDetail = document.createElement('a')
        //     emoticonDetail.innerText = element.title
        //     emoticonDetail.href = `${front_base_url}/templates/emoticon_detail.html?emoticon_id=${element.id}`
        //     emoticonDetail.value = element.id
        //     emoticon.appendChild(emoticonDetail)
        // });
    } else {
        alert(response.status);
    }
}
