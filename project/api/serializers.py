from .models import Activity,Molecule,Target
from rest_framework import serializers

# Create your views here.


class ActivitySerializer(serializers.HyperlinkedModelSerializer):
    target_name = serializers.CharField(source='target.name', read_only=True)
    target_organism = serializers.CharField(source='target.organism', read_only=True)
    molecule_name = serializers.CharField(source='molecule.name', read_only=True)
    molecule_structure = serializers.CharField(source='molecule.structure', read_only=True)
    class Meta:
        model = Activity
        fields = ['url', 'id', 'type','target_id','molecule_id','target_name','molecule_name','target_organism',
                  'molecule_structure']

class MoleculeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Molecule
        fields = ['url', 'id', 'name', 'structure', 'inchi_key']


class TargetSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Target
        fields = ['url', 'id', 'name', 'organism']