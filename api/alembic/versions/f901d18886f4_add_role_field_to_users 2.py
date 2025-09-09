"""Add role field to users

Revision ID: f901d18886f4
Revises: 57aeddaaaca5
Create Date: 2025-08-15 11:57:50.825633

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision = 'f901d18886f4'
down_revision = '57aeddaaaca5'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Check if enum exists, create if not
    op.execute("""
        DO $$ BEGIN
            CREATE TYPE userrole AS ENUM ('USER', 'ADMIN');
        EXCEPTION
            WHEN duplicate_object THEN null;
        END $$;
    """)
    
    # Add column as nullable first
    op.add_column('user', sa.Column('role', sa.Enum('USER', 'ADMIN', name='userrole'), nullable=True))
    
    # Update existing users to have USER role
    op.execute("UPDATE \"user\" SET role = 'USER' WHERE role IS NULL")
    
    # Now make it not nullable
    op.alter_column('user', 'role', nullable=False)


def downgrade() -> None:
    # Drop the column and enum type
    op.drop_column('user', 'role')
    op.execute("DROP TYPE userrole") 