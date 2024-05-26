document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    fetch('http://localhost:8080/blog')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            console.log('Received response:', response);
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data);
            displayPosts(data);
        })
        .catch(error => console.error('Error fetching the blog posts:', error));
});

function displayPosts(posts) {
    const container = document.getElementById('blog-container');
    console.log('Container element:', container);

    if (!posts || posts.length === 0) {
        console.log('No posts found');
        const noPostsMessage = document.createElement('p');
        noPostsMessage.textContent = 'No posts available';
        container.appendChild(noPostsMessage);
        return;
    }

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('blog-post');

        const title = document.createElement('h2');
        title.textContent = post.title;

        const anons = document.createElement('p');
        anons.textContent = post.anons;
        anons.classList.add('anons');

        const views = document.createElement('p');
        views.textContent = `Views: ${post.views}`;
        views.classList.add('views');

        const button = document.createElement('button');
        button.textContent = 'Подробнее';
        button.addEventListener('click', () => {
            if (button.textContent === 'Подробнее') {
                if (post.fulltext) {
                    anons.textContent = post.fulltext;
                } else {
                    anons.textContent = 'Полный текст отсутствует';
                }
                button.textContent = 'Свернуть';
            } else {
                anons.textContent = post.anons;
                button.textContent = 'Подробнее';
            }
        });

        postDiv.appendChild(title);
        postDiv.appendChild(anons);
        postDiv.appendChild(views);
        postDiv.appendChild(button);

        container.appendChild(postDiv);
    });
}
