using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DataDisplayAPI.Data;
using DataDisplayAPI.DTOs;
using DataDisplayAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DataDisplayAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _config = config;
            _repo = repo;
        }

        /// <summary>
        /// Creates new user based on provided login and password, with encrypted password. Can be used by any user
        /// </summary>
        /// <response code="201">If user has been created </response>
        /// <response code="400">If user with provided login already exists</response>
        /// <response code="500">If error occured</response>
        [AllowAnonymous] 
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserToRegisterDto userToRegister)
        {
            userToRegister.Login = userToRegister.Login.ToLower();

            if (await _repo.UserExists(userToRegister.Login))
                return BadRequest("This user alreade exists!");

            var userToCreateBlueprint = new User { Login = userToRegister.Login, IsAdmin = false };
            var createdUser = await _repo.Register(userToCreateBlueprint, userToRegister.Password);

            return StatusCode(201);
        }

        /// <summary>
        /// Returns JWT token based on user found in database with matching login and password. Can be used by any user
        /// </summary>
        /// <response code="200">If login was succesfull, contains token</response>
        /// <response code="401">If user with provided login and password doesn't exist or password is wrong</response>
        /// <response code="500">If error occured</response> 
        [HttpPost("login")]
        [AllowAnonymous] 
        public async Task<IActionResult> Login(UserForLoginDto userForLogin)
        {
            // Getting user data
            var userFromRepo = await _repo.Login(userForLogin.Login.ToLower(), userForLogin.Password);
            if (userFromRepo == null)
                return Unauthorized();

            // Defining Role based on isAdmin field from database
            var userRole = userFromRepo.IsAdmin ? Roles.Admin : Roles.Casual;

            // Defining fields that will be stored in unencrypted part of token (id, login, role)
            var credentialsClaims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Login),
                new Claim(ClaimTypes.Role, userRole)
            };

            // Providing informations about signing token - getting server master password and creating hash based on it
            var credentialsKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            var credentials = new SigningCredentials(credentialsKey, SecurityAlgorithms.HmacSha512Signature);

            // Creating final configuration object for token
            var tokenConfiguration = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(credentialsClaims),
                Expires = DateTime.Now.AddHours(2.0),
                SigningCredentials = credentials
            };

            // Creating and sending final token
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenConfiguration);
            return Ok(new {
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}