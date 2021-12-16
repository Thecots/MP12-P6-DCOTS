
document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    if(document.querySelector('form')[0].value.length >= 1){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("comment", document.querySelector('form')[0].value);
        urlencoded.append("idArticle", document.querySelector('#idArticle').value);

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch("/comentarios", requestOptions)
        .then(response => response.text())
        .then(result => {
            res = JSON.parse(result);
            console.log(res);
            if(res.ok === true){
                console.log(1);
                document.querySelector(".comentarios h3").innerText = parseInt(document.querySelector(".comentarios h3").innerText.split(" ")[0])+1+' comentarios';
                document.querySelector('.takeAppend').innerHTML = `
                <div class="commentDiv">
                    <span>
                        <img src="/assets/img/user.png">
                    </span>
                    <div>
                        <span>
                            <h2>${res.comment.author}</h2>
                            <p>${res.comment.data}</p>
                        </span>
                        <p>${res.comment.comment}</p>
                    </div>
                </div>
                ` +document.querySelector('.takeAppend').innerHTML;
                document.querySelector('form')[0].value = '';
            }
        })
        .catch(error => console.log('error', error));
    }else{
        console.error('error');
    }
})