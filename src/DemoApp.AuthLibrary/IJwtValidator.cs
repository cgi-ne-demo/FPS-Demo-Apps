using System.IdentityModel.Tokens.Jwt;

namespace DemoApp.AuthLibrary;

public interface IJwtValidator
{
    Task<bool> IsValidToken(string authToken);
    Task<JwtSecurityToken?> ValidateToken(string token, CancellationToken ct = default(CancellationToken));
}
