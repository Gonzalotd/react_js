const { from, of } = require('rxjs');
const { switchMap, map, catchError } = require('rxjs/operators');
const fetch = require('node-fetch');

function fetchData(url) {
    return from(fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }));
}


function getUsers() {
    const url = 'https://jsonplaceholder.typicode.com/users';
    return fetchData(url).pipe(
        map(users => users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username
        }))),
        catchError(error => {
            console.error('Error fetching users:', error.message);
            return of([]);
        })
    );
}

function getUserPosts(userId) {
    const url = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;
    return fetchData(url).pipe(
        map(posts => posts.map(post => ({
            id: post.id,
            title: post.title,
            body: post.body,
            userId: post.userId
        }))),
        catchError(error => {
            console.error(`Error fetching posts for user ${userId}:`, error.message);
            return of([]);
        })
    );
}

function getPostComments(postId) {
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
    return fetchData(url).pipe(
        map(comments => comments.map(comment => ({
            id: comment.id,
            name: comment.name,
            email: comment.email,
            body: comment.body,
            postId: comment.postId
        }))),
        catchError(error => {
            console.error(`Error fetching comments for post ${postId}:`, error.message);
            return of([]);
        })
    );
}

console.log('=== INICIANDO PETICIONES A JSONPLACEHOLDER ===\n');

getUsers().pipe(
    switchMap(users => {
        if (users.length === 0) {
            throw new Error('No users found');
        }
        
        const firstUser = users[0];
        console.log('=== USUARIO SELECCIONADO ===');
        console.log(`ID: ${firstUser.id}`);
        console.log(`Nombre: ${firstUser.name}`);
        console.log(`Email: ${firstUser.email}`);
        console.log(`Username: ${firstUser.username}`);
        console.log('');
        
        return getUserPosts(firstUser.id).pipe(
            switchMap(posts => {
                if (posts.length === 0) {
                    throw new Error('No posts found for user');
                }
                
                const firstPost = posts[0];
                console.log('=== PUBLICACIÓN SELECCIONADA ===');
                console.log(`ID: ${firstPost.id}`);
                console.log(`Título: ${firstPost.title}`);
                console.log(`Contenido: ${firstPost.body.substring(0, 50)}...`);
                console.log('');
                
                return getPostComments(firstPost.id).pipe(
                    map(comments => ({
                        user: firstUser,
                        post: firstPost,
                        comments: comments
                    }))
                );
            })
        );
    }),
    catchError(error => {
        console.error('Error in operation chain:', error.message);
        return of(null);
    })
).subscribe({
    next: result => {
        if (result) {
            console.log('=== COMENTARIOS DE LA PUBLICACIÓN ===');
            console.log(`Total de comentarios: ${result.comments.length}`);
            console.log('');
            
            result.comments.forEach((comment, index) => {
                console.log(`Comentario ${index + 1}:`);
                console.log(`  De: ${comment.name} (${comment.email})`);
                console.log(`  Contenido: ${comment.body.substring(0, 70)}...`);
                console.log('');
            });
            
            console.log('=== RESUMEN FINAL ===');
            console.log(`Usuario: ${result.user.name}`);
            console.log(`Publicación: ${result.post.title}`);
            console.log(`Comentarios obtenidos: ${result.comments.length}`);
        }
    },
    error: error => {
        console.error('Error in subscription:', error.message);
    },
    complete: () => {
        console.log('=== OPERACIÓN COMPLETADA ===');
        console.log('Todas las peticiones correctamente finalizadas');
    }
});