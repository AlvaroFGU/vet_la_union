# Generated by Django 5.2.4 on 2025-07-25 19:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion_clinica', '0002_alter_acciontratamiento_table_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mascota',
            name='fotografia',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='fotografia',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
