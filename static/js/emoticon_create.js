async function emoticonCreate() {
    const access = localStorage.getItem("access");

    const emoticonTitle = document.getElementById('title').value
    const emoticonImage = document.getElementById('image').files

    if (emoticonImage.length == 0) {
        alert('이미지를 등록해주세요!')
    } else {
        const formData = new FormData();

        formData.append('title', emoticonTitle)
        for (let i = 0; i < emoticonImage.length; i++) {
            formData.append("images", emoticonImage[i]);
        }

        const response = await fetch(`${back_base_url}/comments/emoticon/`, {
            headers: {
                Authorization: `Bearer ${access}`,
            },
            method: "POST",
            body: formData,
        });
        const data = await response.json();

        if (response.status == 200) {
            alert('등록 완료!\n사용할 이모티콘에 등록해주세요')
            window.location.href = "../templates/emoticon_list.html";
        } else {
            alert("잘못 된 요청입니다.");
        }
    }
}
