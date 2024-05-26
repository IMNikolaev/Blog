document.addEventListener('DOMContentLoaded', () => {
    console.log('Admin page loaded');

    const form = document.getElementById('post-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const anons = document.getElementById('anons').value;
        const fulltext = document.getElementById('fulltext').value;
        const views = document.getElementById('views').value;

        const post = {
            title: title,
            anons: anons,
            fulltext: fulltext,
            views: parseInt(views)
        };

        console.log('Post data:', post);

        fetch('http://localhost:8080/blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                document.getElementById('response-message').textContent = 'Пост успешно добавлен';
                form.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('response-message').textContent = 'Ошибка при добавлении поста';
            });
    });
});