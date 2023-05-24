const urlParams = new URLSearchParams(window.location.search);
const emoticonId = urlParams.get("emoticon_id");

async function getEmoticon(emoticonId) {
    const response = await fetch(`http://127.0.0.1:8080/products/${emoticonId}/`);

    if (response.status == 200) {
        response_json = await response.json();
        return response_json;
    } else {
        alert(response.status);
    }
}

window.onload = async function () {

}
