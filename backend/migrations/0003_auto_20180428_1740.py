# Generated by Django 2.0.4 on 2018-04-28 17:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20180418_1309'),
    ]

    operations = [
        migrations.AlterField(
            model_name='systemuser',
            name='email',
            field=models.EmailField(max_length=254, unique=True, verbose_name='email address'),
        ),
        migrations.AlterField(
            model_name='systemuser',
            name='password',
            field=models.CharField(blank=True, max_length=128, null=True, verbose_name='password'),
        ),
        migrations.AlterField(
            model_name='systemuser',
            name='username',
            field=models.CharField(blank=True, max_length=150, verbose_name='username'),
        ),
    ]
