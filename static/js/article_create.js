// window.onload = () => {
//     console.log("로딩");
// }

// 장르 가져오기
async function getGenreList() {
    const response = await fetch('http://127.0.0.1:8080/articles/genre/');
    const data = await response.json();

    return data;
}

//장르 선택 옵션
async function createGenreOptions() {
    const categories = await getGenreList();
    const selectElement = document.getElementById("genre");

    for (let i = 0; i < categories.length; i++) {
        const optionElement = document.createElement("option");
        optionElement.value = categories[i].id;
        optionElement.textContent = categories[i].name;
        selectElement.appendChild(optionElement);
    }
}

createGenreOptions();

//등록
async function handleProductCreate() {
    console.log("등록");

    const access = localStorage.getItem("access");

    const music = document.getElementById("music").value;
    console.log(music)
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const image = document.getElementById("image").name;
    console.log(image)
    const genre = Array.from(
        document.getElementById("genre").selectedOptions
    ).map((option) => option.value);

    const formData = new FormData();
    formData.append("music_id", music);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("images", image);
    genre.forEach((genre_id) => formData.append("genre", genre_id));
    
    console.log(formData.getAll);

    const response = await fetch("http://127.0.0.1:8080/articles/", {
        headers: {
            Authorization: `Bearer ${access}`,
        },
        method: "POST",
        body: formData,
    });
    const data = await response.json();
    console.log(data);

    if (response.status == 200) {
        if (confirm("등록 완료!\n계속 등록 하시겠습니까?")) {
            return false;
        } else {
            window.location.href = `../`;
        }
    } else if (response.status == 400) {
        alert("빈칸이 있거나 음악 검색 후 선택은 필수 입니다.");
    } else {
        alert(response.status)
    }
}

// 자식창 열기
function musicSearch() {
    window.open(`/templates/music_search.html`, "name", "width=800, height=600, top=50, left=50")
}

// // 자식창
// let openWin = window.open("Child.html");
// openWin.document.getElementById("cInput").value = "전달하고자 하는 값";


