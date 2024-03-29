"""empty message

Revision ID: 3c064974e146
Revises: 
Create Date: 2021-10-02 02:17:45.264915

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3c064974e146'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('employer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('company_name', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('company_name')
    )
    op.create_table('profile',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('last_name', sa.String(length=120), nullable=False),
    sa.Column('username', sa.String(length=120), nullable=False),
    sa.Column('phone_number', sa.String(length=35), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('working_for', sa.String(length=80), nullable=True),
    sa.Column('employer', sa.String(length=100), nullable=True),
    sa.ForeignKeyConstraint(['employer'], ['employer.company_name'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('phone_number'),
    sa.UniqueConstraint('username')
    )
    op.create_table('employee',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('role', sa.String(length=120), nullable=False),
    sa.Column('hourly_rate', sa.Float(), nullable=False),
    sa.Column('profile_id', sa.Integer(), nullable=True),
    sa.Column('employer_id', sa.String(length=100), nullable=True),
    sa.ForeignKeyConstraint(['employer_id'], ['employer.company_name'], ),
    sa.ForeignKeyConstraint(['profile_id'], ['profile.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('messages_author',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('body', sa.Text(), nullable=False),
    sa.Column('author_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['author_id'], ['profile.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('messages_recipient',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('body', sa.Text(), nullable=False),
    sa.Column('recipient_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['recipient_id'], ['profile.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('shift',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('profile_id', sa.Integer(), nullable=True),
    sa.Column('role_id', sa.Integer(), nullable=True),
    sa.Column('employer_id', sa.String(length=100), nullable=True),
    sa.Column('starting_time', sa.String(length=100), nullable=False),
    sa.Column('ending_time', sa.String(length=100), nullable=False),
    sa.Column('clock_in', sa.DateTime(timezone=True), nullable=True),
    sa.Column('clock_out', sa.DateTime(timezone=True), nullable=True),
    sa.Column('earned', sa.String(length=100), nullable=True),
    sa.ForeignKeyConstraint(['employer_id'], ['employer.company_name'], ),
    sa.ForeignKeyConstraint(['profile_id'], ['profile.id'], ),
    sa.ForeignKeyConstraint(['role_id'], ['employee.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('request',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('employer_id', sa.Integer(), nullable=False),
    sa.Column('employee_id', sa.Integer(), nullable=False),
    sa.Column('shift_id', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['employee_id'], ['employee.id'], ),
    sa.ForeignKeyConstraint(['employer_id'], ['employer.id'], ),
    sa.ForeignKeyConstraint(['shift_id'], ['shift.id'], ),
    sa.PrimaryKeyConstraint('id', 'employer_id', 'employee_id', 'shift_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('request')
    op.drop_table('shift')
    op.drop_table('messages_recipient')
    op.drop_table('messages_author')
    op.drop_table('employee')
    op.drop_table('profile')
    op.drop_table('employer')
    # ### end Alembic commands ###
