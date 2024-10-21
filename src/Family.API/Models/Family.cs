namespace FamilyApi.Models;

public partial class Family
{
    public int FamilyId { get; set; }

    public string FamilyName { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string City { get; set; } = null!;

    public string State { get; set; } = null!;

    public string Zip { get; set; } = null!;

    public string Telephone { get; set; } = null!;

    public virtual ICollection<Child> Children { get; set; } = new List<Child>();

    public virtual ICollection<Parent> Parents { get; set; } = new List<Parent>();
}
