# Generated by Django 2.2.1 on 2019-09-17 03:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_auto_20180428_1740'),
    ]

    operations = [
        migrations.AlterField(
            model_name='systemuser',
            name='username',
            field=models.CharField(blank=True, max_length=150, null=True, unique=True, verbose_name='username'),
        ),
    ]
