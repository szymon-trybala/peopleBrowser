using System;
using System.Linq;
using System.Threading.Tasks;
using DataDisplayAPI.Data;
using DataDisplayAPI.DTOs;
using DataDisplayAPI.Helpers;
using DataDisplayAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DataDisplayAPI.Controllers
{
    // Roles are just strings matched with ClaimTypes.Role field in JWT token
    [Authorize(Roles = "Casual, Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly IPeopleRepository _repo;

        public PeopleController(IPeopleRepository repo)
        {
            _repo = repo;
        }

        /// <summary>
        /// Returns all Person objects in database, or paged, sorted and filtered Person objects based on parameters in query string. Can be used by users with Casual or Admin status
        /// </summary>
        /// <response code="200">Returns found items</response>
        /// <response code="401">If user is not logged in</response>
        /// <response code="404">If there are no items</response>
        /// <response code="500">If error occured</response>    
        [HttpGet]
        public async Task<IActionResult> GetAllPeople([FromQuery]PeopleParamsDto peopleParams)    // [FromQuery] allows to intercept parameters from query URL
        {
            try
            {
                var peoplePaged = await _repo.GetAllPeople(peopleParams);
                if (peoplePaged == null)
                    return (IActionResult) NotFound();

                // Adding new header with info about pagination to response
                Response.AddPagination(peoplePaged.CurrentPage, peoplePaged.PageSize, peoplePaged.TotalCount, peoplePaged.AllPages);    

                return Ok(peoplePaged.AsEnumerable());
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        /// <summary>
        /// Returns CSV file containing all Person objects in database, or paged, sorted and filtered Person objects based on parameters in query string. Can be used by users with Casual or Admin status
        /// </summary>
        /// <response code=".csv file">Returns found items as .csv file</response>
        /// <response code="401">If user is not logged in</response>
        /// <response code="404">If there are no items</response>
        /// <response code="500">If error occured</response>    
        [Produces("text/csv")]
        [HttpGet("csv")]
        public async Task<IActionResult> GetAllPeopleCsv([FromQuery]PeopleParamsDto peopleParams)
        {
            try {
                var peoplePaged = await _repo.GetAllPeople(peopleParams);
                if (peoplePaged == null)
                    return (IActionResult) NotFound();

                // Converting list of objects to string containing .csv file content
                var peoplePagedCsvString = CsvConverter.ToCsv(peoplePaged);
                // Converting string to array of bytes
                var peoplePagedCsv = System.Text.Encoding.UTF8.GetBytes(peoplePagedCsvString);
                string fileName = "people.csv";

                return File(peoplePagedCsv, "text/csv", fileName);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        /// <summary>
        /// Returns Person object with matching ID. Can be used by users with Casual or Admin status
        /// </summary>
        /// <response code="200">Returns found item</response>
        /// <response code="401">If user is not logged in</response>
        /// <response code="404">If item can't be found</response>
        /// <response code="500">If error occured</response>                  
        [HttpGet("{id}")] 
        public async Task<IActionResult> GetOnePerson(Guid id)
        {
            try
            {
                var person = await _repo.GetOnePerson(id);
                return person == null ? (IActionResult) NotFound() : Ok(person);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
        
        /// <summary>
        /// Creates new Person object based on parameters and puts it in database. Can be used only by users with Admin status
        /// </summary>
        /// <response code="200">Returns id of new Person</response>
        /// <response code="401">If user is not logged in</response>
        /// <response code="403">If user is not Admin</response>
        /// <response code="500">If error occured</response>  
        [Authorize(Roles = Roles.Admin)]
        [HttpPost]
        public async Task<IActionResult> CreatePerson(PersonToAddDto personToAdd)
        {
            try
            {
                var guid = await _repo.CreatePerson(personToAdd);
                return guid == Guid.Empty ? (IActionResult) StatusCode(500) : Ok(guid);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }   
        }
        
        /// <summary>
        /// Modifies existing Person object based on parameters. Can be used only by users with Admin status
        /// </summary>
        /// <response code="200">If item has been modified</response>
        /// <response code="401">If user is not logged in</response>
        /// <response code="403">If user is not Admin</response>
        /// <response code="404">If Person with provided id can't be found</response>
        /// <response code="500">If error occured</response>  
        [Authorize(Roles = Roles.Admin)]
        [HttpPut]
        public async Task<IActionResult> EditPerson(PersonToEditDto personToEdit)
        {
            if (personToEdit.PersonId == Guid.Empty)
                return NotFound();
            
            try
            {
                var edited = await _repo.EditPerson(personToEdit);
                return edited ? Ok() : StatusCode(500);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
        
        /// <summary>
        /// Deletes existing Person with provided id. Can be used only by users with Admin status
        /// </summary>
        /// <response code="200">If person was succesfully deleted</response>
        /// <response code="400">If id was not provided</response>
        /// <response code="401">If user is not logged in</response>
        /// <response code="403">If user is not Admin</response>
        /// <response code="404">If Person with provided id can't be found</response>
        /// <response code="500">If error occured</response>  
        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerson(Guid id)
        {
            if (id == Guid.Empty)
                return BadRequest();
            
            try
            {
                var wasDeleted = await _repo.DeletePerson(id);
                return wasDeleted ? Ok() : StatusCode(404);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }  
        }
    }
}