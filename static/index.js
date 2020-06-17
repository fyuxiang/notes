document.writeln('now ,is\'s beginning!');
document.writeln('do action');
$.get('/ws/user',{name: 23}, (e) => {
    document.writeln(e);
})
$.post('/ws/postUser',{name: 23, id: 123}, (e) => {
    console.log(e);
})
$.ajax({
    method: 'put',
    url: '/ws/user/1',
    data: {name: 23, id: 123},
    success (e){
        console.log(e)
    }
})