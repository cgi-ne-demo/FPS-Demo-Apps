using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace FamilyApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParentController : ControllerBase
    {
        private readonly FpsDemoContext _context;
        private readonly IJwtValidator _validationService;

        public ParentController(FpsDemoContext context, IJwtValidator validationService)
        {
            _context = context;
            _validationService = validationService;
        }

        // GET: api/Parent
        [HttpGet("forfamily/{id}")]
        public async Task<Results<Ok<List<Parent>>, UnauthorizedHttpResult>> GetParents(int id)
        {
            bool isAuthorized = await _validationService.IsValidToken(this.HttpContext.Request.Headers["Authorization"].ToString());
            if (!isAuthorized) return TypedResults.Unauthorized();

            var results = await _context.Parents.Where(p => p.FamilyId == id).ToListAsync();
            return TypedResults.Ok(results);
        }

        // GET: api/Parent/5
        [HttpGet("{id}")]
        public async Task<Results<Ok<Parent>, NotFound, UnauthorizedHttpResult>> GetParent(int id)
        {
            bool isAuthorized = await _validationService.IsValidToken(this.HttpContext.Request.Headers["Authorization"].ToString());
            if (!isAuthorized) return TypedResults.Unauthorized();

            var parent = await _context.Parents.FindAsync(id);

            if (parent == null)
            {
                return TypedResults.NotFound();
            }

            return TypedResults.Ok(parent);
        }

        // PUT: api/Parent/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<Results<BadRequest, NotFound, NoContent, UnauthorizedHttpResult>> PutParent(int id, Parent parent)
        {
            bool isAuthorized = await _validationService.IsValidToken(this.HttpContext.Request.Headers["Authorization"].ToString());
            if (!isAuthorized) return TypedResults.Unauthorized();

            if (id != parent.ParentId)
            {
                return TypedResults.BadRequest();
            }

            _context.Entry(parent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParentExists(id))
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

        // POST: api/Parent
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<Results<Created<Parent>, UnauthorizedHttpResult>> PostParent(Parent parent)
        {
            bool isAuthorized = await _validationService.IsValidToken(this.HttpContext.Request.Headers["Authorization"].ToString());
            if (!isAuthorized) return TypedResults.Unauthorized();

            _context.Parents.Add(parent);
            await _context.SaveChangesAsync();

            CreatedAtAction("GetParent", new { id = parent.ParentId }, parent);
            return TypedResults.Created($"/api/parent/{parent.ParentId}", parent);
        }

        // DELETE: api/Parent/5
        [HttpDelete("{id}")]
        public async Task<Results<NotFound, NoContent, UnauthorizedHttpResult>> DeleteParent(int id)
        {
            bool isAuthorized = await _validationService.IsValidToken(this.HttpContext.Request.Headers["Authorization"].ToString());
            if (!isAuthorized) return TypedResults.Unauthorized();

            var parent = await _context.Parents.FindAsync(id);
            if (parent == null)
            {
                return TypedResults.NotFound();
            }

            _context.Parents.Remove(parent);
            await _context.SaveChangesAsync();

            return TypedResults.NoContent();
        }

        private bool ParentExists(int id)
        {
            return _context.Parents.Any(e => e.ParentId == id);
        }
    }
}
