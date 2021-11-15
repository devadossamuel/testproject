# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Activity(models.Model):
    id = models.IntegerField(primary_key=True)
    type = models.CharField(blank=True, null=True,max_length=200)
    units = models.CharField(blank=True, null=True,max_length=200)
    value = models.TextField(blank=True, null=True,max_length=200)  # This field type is a guess.
    relation = models.CharField(blank=True, null=True,max_length=200)
    target = models.ForeignKey('Target', models.DO_NOTHING, blank=True, null=True)
    molecule = models.ForeignKey('Molecule', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'activity'


class Molecule(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(blank=True, null=True,max_length=200)
    max_phase = models.IntegerField(blank=True, null=True)
    structure = models.CharField(blank=True, null=True,max_length=200)
    inchi_key = models.CharField(blank=True, null=True,max_length=200)

    class Meta:
        managed = False
        db_table = 'molecule'


class Target(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(blank=True, null=True,max_length=200)
    organism = models.CharField(blank=True, null=True,max_length=200)

    class Meta:
        managed = False
        db_table = 'target'
