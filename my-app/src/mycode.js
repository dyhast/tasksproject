import './mycode.css';

function Mycode() {
 return (
 		<div className="mycode">
 		<form name = 'autorizeform' method = 'POST' action = 'http://localhost:3001/'>
			<input type='hidden' name = 'addr' value = 'SelectUser' />
 		Login:<input type="text" name = 'login'/> <br/>
 		Password:
<input type="password" name = 'pass'/> <br></br>
			<input type="submit" />
 		</form>
 		</div>
 	);
}
export default Mycode;