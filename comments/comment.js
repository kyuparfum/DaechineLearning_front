// 게시글 id
const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get("article_id");

// access토큰
// const access = localStorage.getItem("access");


// 유저 아이디 임시
const userId = 1
// 유저 아이디 임시

// 이모티콘 보이기/숨기기
function emoticonToggle() {
    const emoticonPopup = document.getElementById('emoticon_popup')
    console.log(emoticonPopup.style.display)
    if (emoticonPopup.style.display == 'none') {
        emoticonPopup.setAttribute('style', 'position: relative; z-index: 1; margin-top: -17px; display: block;')
    } else if (emoticonPopup.style.display == 'block') {
        emoticonPopup.setAttribute('style', 'position: relative; z-index: 1; margin-top: -17px; display: none;')
    }
}

// 댓글 불러오기
async function getComment(articleId) {
    const response = await fetch(`http://127.0.0.1:8080/comments/${articleId}/comment/`);

    if (response.status == 200) {
        response_json = await response.json();
        return response_json;
    } else {
        alert(response.status);
    }
}

// 유저가 가진 이모티콘들 가져오기
async function getUserEmoticon(userId) {
    const response = await fetch(`http://127.0.0.1:8080/comments/emoticon/${userId}`);

    if (response.status == 200) {
        response_json = await response.json();
        return response_json;
    } else {
        alert(response.status);
    }
}

// 댓글 등록
async function commentCreate(article_id) {
    const commentContent = document.getElementById("comment_content").value;
    if (commentContent == "") {
        alert("내용을 입력해주세요!")
    } else {
        const formData = new FormData();
        formData.append("comment", commentContent);
        formData.append("music", `${article_id}`);
        formData.append("writer", `${userId}`);

        const response = await fetch(`http://127.0.0.1:8080/comments/${articleId}/comment/`, {
            // headers: {
            //     Authorization: `Bearer ${access}`,
            // },
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        console.log(data);

        if (response.status == 200) {
            alert("등록 완료!")
            window.location.reload()
        } else {
            alert("잘못 된 요청입니다.");
        }
    }
}

// 댓글 수정 폼
function commentUpdate(comment_id) {
    const comment = document.getElementById(`comment${comment_id}`)
    let comment_save = document.getElementById(`comment${comment_id}`).innerHTML
    const commentDiv = comment.childNodes[1]
    // const commentEmoticon = comment.childNodes[1].firstChild
    const commentP = comment.childNodes[1].lastChild
    const commentValue = commentP.innerText

    const updateCommentInput = document.createElement('input')
    updateCommentInput.setAttribute('type', 'text')
    updateCommentInput.setAttribute('class', 'form-control')
    updateCommentInput.setAttribute('id', `update_input${comment_id}`)
    updateCommentInput.value = commentValue
    comment.childNodes[1].appendChild(updateCommentInput)
    commentP.style.display = 'none'

    const updateButton = comment.childNodes[2].firstChild
    updateButton.setAttribute('onclick', `commentUpdateConfirm(${comment_id})`)



    const cancelButton = comment.childNodes[2].lastChild
    cancelButton.innerText = '취소'
    cancelButton.setAttribute('onclick', ``)
    cancelButton.addEventListener('click', function () {
        comment.innerHTML = comment_save
    });
}

// 수정 확인
async function commentUpdateConfirm(comment_id) {
    const commentUpdateContent = document.getElementById(`update_input${comment_id}`).value;
    if (commentUpdateContent == "") {
        alert("내용을 입력해주세요!")
    } else {
        const formData = new FormData();
        formData.append("comment", commentUpdateContent);
        formData.append("music", `${articleId}`);
        formData.append("writer", `${userId}`);

        const response = await fetch(`http://127.0.0.1:8080/comments/${articleId}/comment/${comment_id}/`, {
            // headers: {
            //     Authorization: `Bearer ${access}`,
            // },
            method: "PUT",
            body: formData,
        });
        const data = await response.json();
        console.log(data);

        if (response.status == 200) {
            alert("수정 완료!")
            window.location.reload()
        } else {
            alert("잘못 된 요청입니다.");
        }
    }
}

// 댓글 삭제
async function commentDelete(comment_id) {
    console.log(comment_id)
    if (confirm("삭제하시겠습니까?")) {
        const response = await fetch(
            `http://127.0.0.1:8080/comments/${articleId}/comment/${comment_id}/`,
            {
                // headers: {
                //     Authorization: `Bearer ${access}`,
                // },
                method: "DELETE",
            }
        );
        if (response.status == 204) {
            alert("삭제되었습니다.");
            window.location.reload()
        } else {
            alert("권한이 없습니다!");
        }
    } else {
        // 취소 버튼을 눌렀을 경우
        return false;
    }
}

window.onload = async function () {
    const response_comment = await getComment(articleId);

    const response_useremoticon = await getUserEmoticon(userId);
    console.log(response_useremoticon);

    const commentCreateButton = document.getElementById("comment_create")
    commentCreateButton.setAttribute('onclick', `commentCreate(${articleId})`)
    // const commentEmoticonButton = document.getElementById("comment_emoticon")
    // commentEmoticonButton.setAttribute('onclick',`ddddddd(${articleId})`)

    const commentContent = document.getElementById("comment");

    response_comment.forEach(element => {
        const cardDiv = document.createElement("div")
        cardDiv.setAttribute('class', 'card')
        cardDiv.setAttribute('style', 'width: 100%; flex-direction: row;')
        cardDiv.setAttribute('id', 'comment' + `${element.id}`)
        cardDiv.setAttribute('value', element.id)
        commentContent.appendChild(cardDiv)

        const nicknameDiv = document.createElement("div")
        nicknameDiv.setAttribute('style', 'width: 15%;')
        nicknameDiv.innerText = element.writer
        cardDiv.appendChild(nicknameDiv)

        const commentDiv = document.createElement("div")
        commentDiv.setAttribute('class', 'card-body')
        commentDiv.setAttribute('style', 'width: 85%;')
        //이미지 넣어야됨
        const commentP = document.createElement("p")
        commentP.innerText = element.comment
        commentDiv.appendChild(commentP)
        cardDiv.appendChild(commentDiv)

        const buttonDiv = document.createElement("div")
        cardDiv.appendChild(buttonDiv)

        const updateButton = document.createElement("button")
        updateButton.setAttribute('onclick', `commentUpdate(${element.id})`)
        updateButton.setAttribute('class', 'mt-3')
        updateButton.innerText = '수정'
        buttonDiv.appendChild(updateButton)

        const deleteButton = document.createElement("button")
        deleteButton.setAttribute('onclick', `commentDelete(${element.id})`)
        deleteButton.setAttribute('class', 'mt-3')
        deleteButton.innerText = '삭제'
        buttonDiv.appendChild(deleteButton)

    });
};


