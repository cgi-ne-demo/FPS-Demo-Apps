using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace FamilyApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FamilyController : ControllerBase
    {
        private readonly FpsDemoContext _context;
        private readonly IJwtValidator _validationService;

        public FamilyController(FpsDemoContext context, IJwtValidator validationService)
        {
            _context = context;
            _validationService = validationService;
        }

        // GET: api/Family
        [HttpGet]
        public async Task<Results<Ok<List<Family>>, UnauthorizedHttpResult>> GetFamilies()
        {
            bool isAuthorized = await _validationService.IsValidToken(this.HttpContext.Request.Headers["Authorization"].ToString());
            if (!isAuthorized) return TypedResults.Unauthorized();

            var results = await _context.Families.ToListAsync();
            return TypedResults.Ok(results);
        }

        // GET: api/Family/5
        [HttpGet("{id}")]
        public async Task<Results<Ok<Family>, NotFound, UnauthorizedHttpResult>> GetFamily(int id)
        {
            bool isAuthorized = await _validationService.IsValidToken(this.HttpContext.Request.Headers["Authorization"].ToString());
            if (!isAuthorized) return TypedResults.Unauthorized();

            var family = await _context.Families.FindAsync(id);

            if (family == null)
            {
                return TypedResults.NotFound();
            }

            return TypedResults.Ok(family);
        }

        [HttpGet("{id}/all")]
        public async Task<Results<Ok<Family>, NotFound, UnauthorizedHttpResult>> GetFamilyComplete(int id)
        {
            bool isAuthorized = await _validationService.IsValidToken(this.HttpContext.Request.Headers["Authorization"].ToString());
            if (!isAuthorized) return TypedResults.Unauthorized();

            var family = await _context.Families.Include(f => f.Children).Include(f => f.Parents).FirstOrDefaultAsync(f => f.FamilyId == id);

            if (family == null)
            {
                return TypedResults.NotFound();
            }

            return TypedResults.Ok(family);
        }

        // PUT: api/Family/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<Results<BadRequest, NotFound, NoContent, UnauthorizedHttpResult>> PutFamily(int id, Family family)
        {
            bool isAuthorized = await _validationService.IsValidToken(this.HttpContext.Request.Headers["Authorization"].ToString());
            if (!isAuthorized) return TypedResults.Unauthorized();

            if (id != family.FamilyId)
            {
                return TypedResults.BadRequest();
            }

            _context.Entry(family).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FamilyExists(id))
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

        // POST: api/Family
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<Results<Created<Family>, UnauthorizedHttpResult>> PostFamily(Family family)
        {
            bool isAuthorized = await _validationService.IsValidToken(this.HttpContext.Request.Headers["Authorization"].ToString());
            if (!isAuthorized) return TypedResults.Unauthorized();

            _context.Families.Add(family);
            await _context.SaveChangesAsync();

            CreatedAtAction("GetFamily", new { id = family.FamilyId }, family);
            return TypedResults.Created($"/api/family/{family.FamilyId}", family);
        }

        // DELETE: api/Family/5
        [HttpDelete("{id}")]
        public async Task<Results<NotFound, NoContent, UnauthorizedHttpResult>> DeleteFamily(int id)
        {
            bool isAuthorized = await _validationService.IsValidToken(this.HttpContext.Request.Headers["Authorization"].ToString());
            if (!isAuthorized) return TypedResults.Unauthorized();

            var family = await _context.Families.FindAsync(id);
            if (family == null)
            {
                return TypedResults.NotFound();
            }

            _context.Children.RemoveRange(_context.Children.Where(c => c.FamilyId == id));
            _context.Parents.RemoveRange(_context.Parents.Where(c => c.FamilyId == id));
            _context.Families.Remove(family);
            await _context.SaveChangesAsync();

            return TypedResults.NoContent();
        }

        private bool FamilyExists(int id)
        {
            return _context.Families.Any(e => e.FamilyId == id);
        }
    }
}
