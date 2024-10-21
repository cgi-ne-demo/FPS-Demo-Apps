using FamilyApi.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace FamilyApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChildController : ControllerBase
    {
        private readonly FpsDemoContext _context;
        private readonly IJwtValidator _validationService;

        public ChildController(FpsDemoContext context, IJwtValidator validationService)
        {
            _context = context;
            _validationService = validationService;
        }

        // GET: api/Child
        [HttpGet("forfamily/{id}")]
        public async Task<Results<Ok<List<Child>>, UnauthorizedHttpResult>> GetChildren(int id)
        {
            bool isAuthorized = await _validationService.IsValidToken(this.HttpContext.Request.Headers["Authorization"].ToString());
            if (!isAuthorized) return TypedResults.Unauthorized();

            var results = await _context.Children.Where(p => p.FamilyId == id).ToListAsync();
            return TypedResults.Ok(results);
        }

        // GET: api/Child/5
        [HttpGet("{id}")]
        public async Task<Results<Ok<Child>, NotFound, UnauthorizedHttpResult>> GetChild(int id)
        {
            bool isAuthorized = await _validationService.IsValidToken(this.HttpContext.Request.Headers["Authorization"].ToString());
            if (!isAuthorized) return TypedResults.Unauthorized();

            var child = await _context.Children.FindAsync(id);

            if (child == null)
            {
                return TypedResults.NotFound();
            }

            return TypedResults.Ok(child);
        }

        // PUT: api/Child/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<Results<NoContent, NotFound, BadRequest, UnauthorizedHttpResult>> PutChild(int id, Child child)
        {
            bool isAuthorized = await _validationService.IsValidToken(this.HttpContext.Request.Headers["Authorization"].ToString());
            if (!isAuthorized) return TypedResults.Unauthorized();

            if (id != child.ChildId)
            {
                return TypedResults.BadRequest();
            }

            _context.Entry(child).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChildExists(id))
                {
                    return TypedResults.NotFound();
                }
                else
                {
                    throw;
                }
            }

            return TypedResults.NoContent();
        }

        // POST: api/Child
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<Results<Created<Child>, UnauthorizedHttpResult>> PostChild(Child child)
        {
            bool isAuthorized = await _validationService.IsValidToken(this.HttpContext.Request.Headers["Authorization"].ToString());
            if (!isAuthorized) return TypedResults.Unauthorized();

            _context.Children.Add(child);
            await _context.SaveChangesAsync();

            CreatedAtAction("GetChild", new { id = child.ChildId }, child);
            return TypedResults.Created($"/api/child/{child.ChildId}", child);
        }

        // DELETE: api/Child/5
        [HttpDelete("{id}")]
        public async Task<Results<NoContent, NotFound, UnauthorizedHttpResult>> DeleteChild(int id)
        {
            bool isAuthorized = await _validationService.IsValidToken(this.HttpContext.Request.Headers["Authorization"].ToString());
            if (!isAuthorized) return TypedResults.Unauthorized();

            var child = await _context.Children.FindAsync(id);
            if (child == null)
            {
                return TypedResults.NotFound();
            }

            _context.Children.Remove(child);
            await _context.SaveChangesAsync();

            return TypedResults.NoContent();
        }

        private bool ChildExists(int id)
        {
            return _context.Children.Any(e => e.ChildId == id);
        }
    }
}
