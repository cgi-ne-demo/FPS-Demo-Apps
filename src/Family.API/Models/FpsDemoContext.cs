namespace FamilyApi.Models;

public partial class FpsDemoContext : DbContext
{
    public FpsDemoContext()
    {
    }

    public FpsDemoContext(DbContextOptions<FpsDemoContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Child> Children { get; set; }

    public virtual DbSet<Family> Families { get; set; }

    public virtual DbSet<Parent> Parents { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Child>(entity =>
        {
            entity.HasKey(e => e.ChildId).HasName("child_pk");

            entity.ToTable("child", "demo");

            entity.Property(e => e.ChildId)
                .UseIdentityAlwaysColumn()
                .HasColumnName("child_id");
            entity.Property(e => e.Dob)
                .HasColumnType("character varying")
                .HasColumnName("dob");
            entity.Property(e => e.FamilyId).HasColumnName("family_id");
            entity.Property(e => e.FirstName)
                .HasColumnType("character varying")
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasColumnType("character varying")
                .HasColumnName("last_name");

            entity.HasOne(d => d.Family).WithMany(p => p.Children)
                .HasForeignKey(d => d.FamilyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("child_family_fk");
        });

        modelBuilder.Entity<Family>(entity =>
        {
            entity.HasKey(e => e.FamilyId).HasName("family_pkey");

            entity.ToTable("family", "demo");

            entity.Property(e => e.FamilyId)
                .UseIdentityAlwaysColumn()
                .HasColumnName("family_id");
            entity.Property(e => e.Address)
                .HasColumnType("character varying")
                .HasColumnName("address");
            entity.Property(e => e.City)
                .HasColumnType("character varying")
                .HasColumnName("city");
            entity.Property(e => e.FamilyName)
                .HasColumnType("character varying")
                .HasColumnName("family_name");
            entity.Property(e => e.State)
                .HasColumnType("character varying")
                .HasColumnName("state");
            entity.Property(e => e.Telephone)
                .HasColumnType("character varying")
                .HasColumnName("telephone");
            entity.Property(e => e.Zip)
                .HasColumnType("character varying")
                .HasColumnName("zip");
        });

        modelBuilder.Entity<Parent>(entity =>
        {
            entity.HasKey(e => e.ParentId).HasName("parent_pk");

            entity.ToTable("parent", "demo");

            entity.Property(e => e.ParentId)
                .UseIdentityAlwaysColumn()
                .HasColumnName("parent_id");
            entity.Property(e => e.Dob)
                .HasColumnType("character varying")
                .HasColumnName("dob");
            entity.Property(e => e.FamilyId).HasColumnName("family_id");
            entity.Property(e => e.FirstName)
                .HasColumnType("character varying")
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasColumnType("character varying")
                .HasColumnName("last_name");

            entity.HasOne(d => d.Family).WithMany(p => p.Parents)
                .HasForeignKey(d => d.FamilyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("parent_family_fk");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
