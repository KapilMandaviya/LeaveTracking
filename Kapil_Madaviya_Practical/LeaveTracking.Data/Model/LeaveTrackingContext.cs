using System;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace LeaveTracking.Data.Model
{
    public partial class LeaveTrackingContext : DbContext
    {
        public LeaveTrackingContext()
        {
        }

        public LeaveTrackingContext(DbContextOptions<LeaveTrackingContext> options)
            : base(options)
        {
        }

        public virtual DbSet<LeaveStatus> LeaveStatuses { get; set; }
        public virtual DbSet<UserDetail> UserDetails { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=sql.bsite.net\\MSSQL2016;Database=shyam65_LeaveDatabase;MultipleActiveResultSets=true;User Id=shyam65_LeaveDatabase;Password=Qwert@123;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<LeaveStatus>(entity =>
            {
                entity.HasKey(e => e.LeaveId);

                entity.ToTable("LeaveStatus");

                entity.Property(e => e.LeaveId).HasColumnName("leaveId");

                entity.Property(e => e.DateOfReq)
                    .HasColumnType("date")
                    .HasColumnName("dateOfReq");

                entity.Property(e => e.EndDate)
                    .HasColumnType("date")
                    .HasColumnName("endDate");

                entity.Property(e => e.LeaveReason)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("leaveReason");
                
                entity.Property(e => e.LeaveType)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("leaveType");

                entity.Property(e => e.StartDate)
                    .HasColumnType("date")
                    .HasColumnName("startDate");

                entity.Property(e => e.Status)
                .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("status"); ;
                entity.Property(e => e.UserId).HasColumnName("userId");

                //    entity.HasOne(d => d.User)
                //        .WithMany(p => p.LeaveStatuses)
                //        .HasForeignKey(d => d.UserId)
                //        .OnDelete(DeleteBehavior.ClientSetNull)
                //        .HasConstraintName("FK_LeaveStatus_UserDetail");
            });

            modelBuilder.Entity<UserDetail>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("UserDetail");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("address");

                entity.Property(e => e.DateOfJoin)
                    .HasColumnType("date")
                    .HasColumnName("dateOfJoin");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.ExtraDetail)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("extraDetail");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("firstName");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("lastName");

                entity.Property(e => e.LeaveBalance)
                    .HasColumnType("numeric(18, 0)")
                    .HasColumnName("leaveBalance");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("password");

                entity.Property(e => e.PhoneNo)
                    .HasColumnType("numeric(18, 0)")
                    .HasColumnName("phoneNo");

                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("role");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
