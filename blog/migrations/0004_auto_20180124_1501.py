# Generated by Django 2.0.1 on 2018-01-24 07:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_auto_20180124_1114'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='source',
            field=models.TextField(blank='true'),
        ),
        migrations.AlterField(
            model_name='blog',
            name='thumb',
            field=models.ImageField(blank='true', default='default.png', upload_to=''),
        ),
    ]