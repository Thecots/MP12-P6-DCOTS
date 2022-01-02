var myHeaders: Headers = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var requestOptions:
    {
        method: any,
        headers: any,
        redirect: any
    } =
{
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
};

fetch("/getHomeArticles", requestOptions)
    .then(response => response.text())
    .then(result => {
        let res: any = JSON.parse(result);
        console.log(res);
        if (res.ok === true) {
            if (JSON.parse(res.json).length != 0) {
                $('#pagination-container').pagination({
                    dataSource: JSON.parse(res.json),
                    pageSize: 8,
                    callback: function (data: any, pagination: any) {
                        var html = simpleTemplating(data);
                        $('#data-container').html(html);
                    }
                })
            } else {
                let section1 = document.querySelector("section") as HTMLInputElement
                section1.innerHTML = `<div class="noArticles"><h1>No hay articulos</h1></div>`;
            }
        }
    })
    .catch(error => console.log('error', error));


function simpleTemplating(data: any) {
    var html = '';
    $.each(data, function (index, n) {
        html += `
        <div class="post">
            <a href="home/${n.id}">
                <article>
                    <div class="left">
                        <h2>${n.title}</h2>
                        <h3>${n.author}</h3>
                        <p>${n.comments} comentarios</p>
                    </div>
                    <div class="right">
                        <span>
                            <p>${n.date}</p>
                        </span>
                        <span>
                            <img src="/assets/img/view.png">
                            <p>${n.views}</p>
                        </span>
                    </div>
                </article>
            </a>
        </div> 
        `;
    });
    return html;
}

