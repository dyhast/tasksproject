import './mycode.css';

function UserAdd() {
    return (
        <div className="UserAdd">
            <form name = 'autorizeform' method = 'GET' action = 'http://localhost:3001/CreateUserPage'>
                <input type="submit" value='Зарегистрироваться'/>
            </form>
        </div>
    );
}

export default UserAdd;