namespace FamilyApi.Models;

public partial class Child
{
    public int ChildId { get; set; }

    public int FamilyId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Dob { get; set; } = null!;

    public virtual Family? Family { get; set; } = null!;
}
