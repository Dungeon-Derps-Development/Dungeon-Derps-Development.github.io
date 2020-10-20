function genIssueCards() {
    let titles = ['Our Discord']
    let links = ['https://discord.gg/rGmuYHc']
    let images = ['discord-512.webp']
    let i
    document.addEventListener('DOMContentLoaded', function (){
        for (i = 0; i < titles.length; i++) {
            document.getElementById("vertical-menu").innerHTML.concat(card(titles[i], links[i], images[i]))
        }
    })
}

function card(title='Example Title', link='exampleurl.com', image='exampleimg.png') {
    let h = "<a href=" + link + "><img src=" + image + ">" + title + "</a>"
    return h
}