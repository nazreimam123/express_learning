export default function login() {
  return `
    <form action = "/submit" method = "post">
      <input type="text" placeholder = "Enter name"/>
      <br></br>
     <input type="password" placeholder="Enter password"/>
           <br></br>

           <a href='/'> Back to Home</a>

      <button>login</button>
    </form>
    `;
}
