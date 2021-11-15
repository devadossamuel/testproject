from django.shortcuts import render
from rest_framework import viewsets

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.generics import ListAPIView
from .serializers import ActivitySerializer,MoleculeSerializer,TargetSerializer
from .models import Activity, Molecule, Target


# create a viewset
class MoleculeViewSet(viewsets.ModelViewSet):
    # define queryset
    queryset = Molecule.objects.all()
    # specify serializer to be used
    serializer_class = MoleculeSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    # define queryset
    queryset = Activity.objects.all()

    # specify serializer to be used
    serializer_class = ActivitySerializer

class TargetViewSet(viewsets.ModelViewSet):
    # define queryset
    queryset = Target.objects.all()

    # specify serializer to be used
    serializer_class = TargetSerializer


class ActivityDetail(ListAPIView):
    serializer_class = ActivitySerializer

    permission_classes = (permissions.AllowAny,)
    http_method_names = ['get', 'head']

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `moleculeid` query parameter in the URL.
        """
        queryset = Activity.objects.all()
        moleculeid = self.kwargs['moleculeid']
        if moleculeid is not None:
            queryset = queryset.filter(molecule_id=moleculeid)
        return queryset
