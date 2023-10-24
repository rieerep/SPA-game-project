# TicTacToe - Single page application
### (With ASP.NET MVC backend)
## About
This is a fullstack project with a single page application game written in React.js. 
The backend is an MVC Identity API application with REST architecture written in C# with ASP.NET Core that uses Entity Framework Core for database management.

## Functionality 
The user can register a new account and login. In logged in state a user can play a game of TicTacToe against the computer and statistics will be saved such as games played, wins, draws and losses. The user can check stats on its profile page for individual stats, and the highscore page to see all users scores overall and daily highscore.

## Tech
Editor: Visual Studio 2022<br>
Programming language: C#, JavaScript, HTML, CSS<br>
Frameworks: React.js, ASP.NET<br>
Tools: Entity Framework Core, Identity<br>

## How to run
The connection string has been contained in a class called CString.cs, this class has been ignored in the .gitignore file. You can create a new CString class and add the following line of code inside it: 
```
public class CString
{
    public static string connectionString = "[Your connection string here]"
}
```
When this is done, open your Package Manager Console and type in 
```
Update-Database
```

That is all. 
