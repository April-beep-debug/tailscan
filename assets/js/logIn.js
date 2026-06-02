class Form{
    constructor(idUser, idPassword, idButton){
        this.idUser = document.querySelector(idUser);
        this.idPassword = document.querySelector(idPassword);
        this.idButton = document.querySelector(idButton);
    }
    validateLogin(){
        let user = 'admin';
        let password = '1234';
        this.idButton.addEventListener('click', () => {
            if(this.idUser.value === user && this.idPassword.value === password){
                alert('Bienvenido ' + this.idUser.value);
                window.location.href = "../components/home.html";
            }
            else{
                alert('Error en contraseña o usuario');
            }
        });
    }
}
validateLogin = new Form('#user', '#password', '#btn');
validateLogin.validateLogin();