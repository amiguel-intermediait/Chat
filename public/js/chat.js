const url = 'http://localhost:8080/api/auth/'

let usuario = null;
let socket  = null;

// Referencias HTML
const txtMessage = document.querySelector('#txtMessage');
const userUl = document.querySelector('#userUl');
const messageUl = document.querySelector('#messageUl');
const exitBtn   = document.querySelector('#exitBtn');



const validarJWT = async() => {
    const token = localStorage.getItem('token') || '';

    if ( token.length <= 10 ) {
        window.location = 'index.html';
        throw new Error('No token available');
    }

    const resp = await fetch( url, {
        headers: { 'x-token': token }
    });

    const { user: userDB, token: tokenDB } = await resp.json();
    localStorage.setItem('token', tokenDB );
    usuario = userDB;
    await conectarSocket();
    
}

const conectarSocket = async() => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () =>{
        console.log('Sockets online')
    });

    socket.on('disconnect', () =>{
        console.log('Sockets offline')
    });

    socket.on('onlineUsers', drawUser );

    socket.on('receiveMessages', drawMessage );


}

const drawUser = ( user = []) => {

    let usersHtml = '';
    user.forEach( ({ user_name, id }) => {

        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success"> ${ user_name } </h5>
                    <span class="fs-6 text-muted">${ id }</span>
                </p>
            </li>
        `;
    });

    userUl.innerHTML = usersHtml;

}


const drawMessage = ( messages = []) => {
    let messageHTML = '';
    messages.forEach( ({ user_name, text }) => {

        messageHTML += `
            <li>
                <p>
                    <span class="text-primary">${ user_name }: </span>
                    <span>${ text }</span>
                </p>
            </li>
        `;
    });

    messageUl.innerHTML = messageHTML;

}


txtMessage.addEventListener('keyup', ({ keyCode }) => {
    
    const message = txtMessage.value;

    if( keyCode !== 13 ){ return; }
    if( message.length === 0 ){ return; }

    socket.emit('sendMessage', { message });

    txtMessage.value = '';

})


exitBtn.addEventListener('click', ()=> {
    localStorage.removeItem('token');
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then( () => {
        console.log('User signed out.');
        window.location = 'index.html';
    });
});

    const main = async() => {
        // Validar JWT
        await validarJWT();
    }

    main();