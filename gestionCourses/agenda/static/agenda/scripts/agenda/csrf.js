// Fonction pour obtenir un cookie par nom
function getCookie(name) {
    console.log('Recherche du cookie:', name);

    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                console.log('Cookie trouvé:', cookieValue);
                break;
            }
        }
    }
    return cookieValue;
}
